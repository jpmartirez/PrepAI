export interface TranscriptLine {
	id: string;
	role: "ai" | "user";
	text: string;
	questionIndex: number;
	timestamp: number;
	isInterim?: boolean;
}

export type SessionStatus =
	| "idle"
	| "loading"
	| "asking"
	| "answering"
	| "processing"
	| "ended";

export interface SessionState {
	status: SessionStatus;
	questions: string[];
	currentQIndex: number;
	transcript: TranscriptLine[];
	timeLeft: number;
	isMuted: boolean;
	interimText: string;
	avgScore: number;
}

export type SessionAction =
	| { type: "START_LOADING" }
	| { type: "QUESTION_READY"; question: string; timePerQuestion: number }
	| { type: "USER_STARTED_SPEAKING" }
	| { type: "INTERIM_TRANSCRIPT"; text: string }
	| { type: "FINAL_TRANSCRIPT"; text: string; questionIndex: number }
	| { type: "CLEAR_INTERIM" }
	| { type: "NEXT_QUESTION_LOADING" }
	| { type: "NEXT_QUESTION_READY"; question: string; timePerQuestion: number }
	| { type: "TICK" }
	| { type: "TIMER_EXPIRED" }
	| { type: "TOGGLE_MUTE" }
	| { type: "END_SESSION" };

export interface QuestionRequestPayload {
	trackId: string;
	trackName: string;
	category: string;
	questionIndex: number;
	totalQuestions: number;
	conversationHistory: { role: "ai" | "user"; text: string }[];
	lastAnswer: string;

	askedQuestions: string[];
}

export interface QuestionApiResponse {
	question: string;
	error?: string;
}
