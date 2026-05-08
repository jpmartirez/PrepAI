/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useEffect, useRef } from "react";

// (Keep your window type augmentations and interface declarations here)
declare global {
	interface Window {
		SpeechRecognition: any;
		webkitSpeechRecognition: any;
	}
}

interface UseSpeechRecognitionOptions {
	onInterim: (text: string) => void;
	onFinal: (text: string) => void;
	onError?: (error: string) => void;
	onStart?: () => void;
}

export function useSpeechRecognition({
	onInterim,
	onFinal,
	onError,
	onStart,
}: UseSpeechRecognitionOptions) {
	const recRef = useRef<any>(null);
	const activeRef = useRef(false);

	const onInterimRef = useRef(onInterim);
	const onFinalRef = useRef(onFinal);
	const onErrorRef = useRef(onError);
	const onStartRef = useRef(onStart);

	useEffect(() => {
		onInterimRef.current = onInterim;
	}, [onInterim]);
	useEffect(() => {
		onFinalRef.current = onFinal;
	}, [onFinal]);
	useEffect(() => {
		onErrorRef.current = onError;
	}, [onError]);
	useEffect(() => {
		onStartRef.current = onStart;
	}, [onStart]);

	const isSupported =
		typeof window !== "undefined" &&
		("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

	const createRecognition = useCallback(() => {
		if (!isSupported) return null;
		const SpeechRecognitionCtor =
			window.SpeechRecognition ?? window.webkitSpeechRecognition;
		const rec = new SpeechRecognitionCtor();
		rec.continuous = true;
		rec.interimResults = true;
		rec.lang = "en-US";
		rec.maxAlternatives = 1;
		return rec;
	}, [isSupported]);

	const start = useCallback(() => {
		if (activeRef.current) return;
		const rec = createRecognition();
		if (!rec) return;

		rec.onstart = () => {
			activeRef.current = true;
			onStartRef.current?.();
		};
		rec.onresult = (e: any) => {
			let interim = "";
			for (let i = e.resultIndex; i < e.results.length; i++) {
				const result = e.results[i];
				const text = result[0].transcript;
				if (result.isFinal) onFinalRef.current(text.trim());
				else interim += text;
			}
			if (interim) onInterimRef.current(interim);
		};
		rec.onerror = (e: any) => {
			if (e.error !== "no-speech" && e.error !== "aborted")
				onErrorRef.current?.(e.error);
		};
		rec.onend = () => {
			activeRef.current = false;
			if (recRef.current === rec) {
				try {
					rec.start();
				} catch {
					/* ignore */
				}
			}
		};

		recRef.current = rec;
		try {
			rec.start();
		} catch {
			/* ignore */
		}
	}, [createRecognition]);

	const stop = useCallback(() => {
		if (recRef.current) {
			recRef.current.onend = null;
			recRef.current.abort();
			recRef.current = null;
			activeRef.current = false;
		}
	}, []);

	useEffect(() => () => stop(), [stop]);

	return { start, stop, isSupported };
}
