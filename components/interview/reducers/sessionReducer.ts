import {
	SessionState,
	SessionAction,
	TranscriptLine,
} from "../types/interview";

export function uid(): string {
	return Math.random().toString(36).slice(2, 9);
}

export function initialState(timePerQuestion: number): SessionState {
	return {
		status: "idle",
		questions: [],
		currentQIndex: 0,
		transcript: [],
		timeLeft: timePerQuestion,
		isMuted: false,
		interimText: "",
		avgScore: 0,
	};
}

export function sessionReducer(
	state: SessionState,
	action: SessionAction,
): SessionState {
	switch (action.type) {
		case "START_LOADING":
			return { ...state, status: "loading" };
		case "QUESTION_READY": {
			const aiEntry: TranscriptLine = {
				id: uid(),
				role: "ai",
				text: action.question,
				questionIndex: 0,
				timestamp: Date.now(),
			};
			return {
				...state,
				status: "asking",
				questions: [action.question],
				currentQIndex: 0,
				transcript: [aiEntry],
				timeLeft: action.timePerQuestion,
			};
		}
		case "USER_STARTED_SPEAKING":
			if (state.status !== "asking") return state;
			return { ...state, status: "answering" };
		case "INTERIM_TRANSCRIPT":
			return { ...state, interimText: action.text };
		case "FINAL_TRANSCRIPT": {
			const withoutInterim = state.transcript.filter((l) => !l.isInterim);
			const userLine: TranscriptLine = {
				id: uid(),
				role: "user",
				text: action.text,
				questionIndex: action.questionIndex,
				timestamp: Date.now(),
			};
			return {
				...state,
				interimText: "",
				transcript: [...withoutInterim, userLine],
			};
		}
		case "CLEAR_INTERIM":
			return { ...state, interimText: "" };
		case "NEXT_QUESTION_LOADING":
			return { ...state, status: "processing", interimText: "" };
		case "NEXT_QUESTION_READY": {
			const nextIndex = state.currentQIndex + 1;
			const aiEntry: TranscriptLine = {
				id: uid(),
				role: "ai",
				text: action.question,
				questionIndex: nextIndex,
				timestamp: Date.now(),
			};
			return {
				...state,
				status: "asking",
				questions: [...state.questions, action.question],
				currentQIndex: nextIndex,
				transcript: [...state.transcript, aiEntry],
				timeLeft: action.timePerQuestion,
				avgScore: Math.min(
					100,
					state.avgScore + Math.floor(Math.random() * 8) + 4,
				),
			};
		}
		case "TICK":
			if (state.timeLeft <= 1) return { ...state, timeLeft: 0 };
			return { ...state, timeLeft: state.timeLeft - 1 };
		case "TIMER_EXPIRED":
			return { ...state, status: "processing", timeLeft: 0, interimText: "" };
		case "TOGGLE_MUTE":
			return { ...state, isMuted: !state.isMuted };
		case "END_SESSION":
			return { ...state, status: "ended", interimText: "" };
		default:
			return state;
	}
}
