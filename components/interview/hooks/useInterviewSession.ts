// hooks/useInterviewSession.ts

"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { useRouter } from "next/navigation";

import {
	SessionStatus,
	QuestionRequestPayload,
	QuestionApiResponse,
} from "../types/interview";

import { sessionReducer, initialState } from "../reducers/sessionReducer";
import { useSpeechRecognition } from "./useSpeechRecognition";

import Track from "@/components/tracks/types";
import { computeTimePerQuestion } from "./parseDuration";

interface UseInterviewSessionOptions {
	track: Track;
	apiRoute?: string;
}

export function useInterviewSession({
	track,
	apiRoute = "/api/interview/question",
}: UseInterviewSessionOptions) {
	const router = useRouter();

	const timePerQuestion = computeTimePerQuestion(
		track.duration,
		track.questions,
	);

	const [state, dispatch] = useReducer(
		sessionReducer,
		initialState(timePerQuestion),
	);

	const answerBufferRef = useRef("");
	const stateRef = useRef(state);

	useEffect(() => {
		stateRef.current = state;
	}, [state]);

	// -----------------------------
	// FETCH QUESTION
	// -----------------------------
	const fetchQuestion = useCallback(
		async (
			questionIndex: number,
			lastAnswer: string,
			askedQuestions: string[],
		) => {
			try {
				const payload: QuestionRequestPayload = {
					trackId: track.id,
					trackName: track.name,
					category: track.category,
					questionIndex,
					totalQuestions: track.questions,
					lastAnswer,
					askedQuestions,
					conversationHistory: stateRef.current.transcript.map((line) => ({
						role: line.role,
						text: line.text,
					})),
				};

				const res = await fetch(apiRoute, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				});

				if (!res.ok) {
					throw new Error(`API ${res.status}`);
				}

				const data = (await res.json()) as QuestionApiResponse;

				return data.question || "Tell me about a project you're proud of.";
			} catch (err) {
				console.error("fetchQuestion error:", err);

				return "Tell me about a challenging project you worked on recently.";
			}
		},
		[track, apiRoute],
	);

	// -----------------------------
	// SPEECH HANDLERS
	// -----------------------------
	const handleInterim = useCallback((text: string) => {
		dispatch({
			type: "INTERIM_TRANSCRIPT",
			text,
		});
	}, []);

	const handleFinal = useCallback((text: string) => {
		if (!text.trim()) return;

		answerBufferRef.current += (answerBufferRef.current ? " " : "") + text;

		dispatch({
			type: "FINAL_TRANSCRIPT",
			text,
			questionIndex: stateRef.current.currentQIndex,
		});

		if (stateRef.current.status === "asking") {
			dispatch({
				type: "USER_STARTED_SPEAKING",
			});
		}
	}, []);

	const handleSpeechStart = useCallback(() => {
		if (stateRef.current.status === "asking") {
			dispatch({
				type: "USER_STARTED_SPEAKING",
			});
		}
	}, []);

	const {
		start: startSpeech,
		stop: stopSpeech,
		isSupported: speechSupported,
	} = useSpeechRecognition({
		onInterim: handleInterim,
		onFinal: handleFinal,
		onStart: handleSpeechStart,
	});

	// -----------------------------
	// ADVANCE QUESTION
	// -----------------------------
	const advanceQuestion = useCallback(async () => {
		const current = stateRef.current;

		const nextIndex = current.currentQIndex + 1;

		stopSpeech();

		const answer = answerBufferRef.current.trim();

		answerBufferRef.current = "";

		if (nextIndex >= track.questions) {
			dispatch({ type: "END_SESSION" });

			setTimeout(() => {
				router.push(`/tracks/${track.id}/results`);
			}, 1200);

			return;
		}

		dispatch({
			type: "NEXT_QUESTION_LOADING",
		});

		const askedQuestions = current.questions;

		const nextQuestion = await fetchQuestion(nextIndex, answer, askedQuestions);

		dispatch({
			type: "NEXT_QUESTION_READY",
			question: nextQuestion,
			timePerQuestion,
		});

		if (!stateRef.current.isMuted) {
			startSpeech();
		}
	}, [track, router, stopSpeech, startSpeech, fetchQuestion, timePerQuestion]);

	// -----------------------------
	// TIMER
	// -----------------------------
	useEffect(() => {
		const activeStatuses: SessionStatus[] = ["asking", "answering"];

		if (!activeStatuses.includes(state.status) || state.timeLeft <= 0) {
			return;
		}

		const interval = setInterval(() => {
			dispatch({ type: "TICK" });
		}, 1000);

		return () => clearInterval(interval);
	}, [state.status, state.timeLeft]);

	useEffect(() => {
		if (
			state.timeLeft === 0 &&
			(state.status === "asking" || state.status === "answering")
		) {
			dispatch({ type: "TIMER_EXPIRED" });

			advanceQuestion();
		}
	}, [state.timeLeft, state.status, advanceQuestion]);

	// -----------------------------
	// MUTE HANDLING
	// -----------------------------
	useEffect(() => {
		const active = state.status === "asking" || state.status === "answering";

		if (!active) return;

		if (state.isMuted) {
			stopSpeech();

			dispatch({
				type: "CLEAR_INTERIM",
			});
		} else {
			startSpeech();
		}
	}, [state.isMuted, state.status, startSpeech, stopSpeech]);

	// -----------------------------
	// START SESSION
	// -----------------------------
	const startSession = useCallback(async () => {
		dispatch({
			type: "START_LOADING",
		});

		answerBufferRef.current = "";

		const firstQuestion = await fetchQuestion(0, "", []);

		dispatch({
			type: "QUESTION_READY",
			question: firstQuestion,
			timePerQuestion,
		});

		startSpeech();
	}, [fetchQuestion, timePerQuestion, startSpeech]);

	// -----------------------------
	// NEXT BUTTON
	// -----------------------------
	const submitAndNext = useCallback(() => {
		const { status } = stateRef.current;

		if (status !== "asking" && status !== "answering") return;

		stopSpeech();

		dispatch({
			type: "NEXT_QUESTION_LOADING",
		});

		advanceQuestion();
	}, [stopSpeech, advanceQuestion]);

	// -----------------------------
	// END SESSION
	// -----------------------------
	const endSession = useCallback(() => {
		stopSpeech();

		dispatch({
			type: "END_SESSION",
		});

		setTimeout(() => {
			router.push(`/tracks/${track.id}/results`);
		}, 1200);
	}, [stopSpeech, router, track.id]);

	const toggleMute = useCallback(() => {
		dispatch({
			type: "TOGGLE_MUTE",
		});
	}, []);

	return {
		state,
		speechSupported,
		startSession,
		submitAndNext,
		endSession,
		toggleMute,
	};
}
