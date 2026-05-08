import Track from "../tracks/types";
import AIOrb from "./AIOrb";
import { CircularTimer } from "./CircularTimer";
import { computeTimePerQuestion } from "./hooks/parseDuration";
import { LiveTranscript } from "./LiveTranscript";
import { SessionState } from "./types/interview";
import { WaveBars } from "./WaveBars";

export function ActiveInterviewRoom({
	track,
	state,
	onNext,
	onEnd,
	onToggleMute,
}: {
	track: Track;
	state: SessionState;
	onNext: () => void;
	onEnd: () => void;
	onToggleMute: () => void;
}) {
	const {
		currentQIndex,
		questions,
		transcript,
		timeLeft,
		isMuted,
		interimText,
		avgScore,
		status,
	} = state;
	const currentQuestion = questions[currentQIndex] ?? "…";
	const answeredCount = currentQIndex;
	const remainingCount = track.questions - currentQIndex - 1;
	const isProcessing = status === "processing";
	const isSpeaking = !isMuted && status === "answering";

	const timePerQuestion = computeTimePerQuestion(
		track.duration,
		track.questions,
	);

	return (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
			{/* ── LEFT: AI Interviewer panel ────────────────────────────────── */}
			<div
				style={{
					background: "var(--bg-secondary)",
					border: "1px solid var(--border-subtle)",
					borderRadius: 20,
					padding: 32,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 24,
				}}
			>
				{/* AI Orb */}
				<AIOrb active={isProcessing} />

				{/* Identity */}
				<div style={{ textAlign: "center" }}>
					<p
						style={{
							fontFamily: "var(--font-geist), Geist, sans-serif",
							fontSize: 16,
							fontWeight: 600,
							color: "var(--text-primary)",
							marginBottom: 3,
						}}
					>
						Aria — AI Interviewer
					</p>
					<p
						style={{
							fontSize: 12,
							color: isProcessing ? "var(--emerald)" : "var(--text-faint)",
						}}
					>
						{isProcessing
							? "Preparing next question…"
							: "Listening to your response"}
					</p>
				</div>

				{/* Question box */}
				<div
					style={{
						width: "100%",
						background: "var(--bg-card)",
						borderRadius: 12,
						padding: "20px 22px",
					}}
				>
					<div
						style={{
							fontSize: 10,
							textTransform: "uppercase",
							letterSpacing: "0.12em",
							color: "var(--text-faint)",
							marginBottom: 10,
							display: "flex",
							alignItems: "center",
							gap: 6,
						}}
					>
						<span
							style={{
								width: 6,
								height: 6,
								borderRadius: "50%",
								background: "var(--emerald)",
								flexShrink: 0,
							}}
						/>
						Question {currentQIndex + 1} of {track.questions}
					</div>

					{isProcessing ? (
						/* Thinking dots */
						<div
							style={{
								display: "flex",
								gap: 7,
								alignItems: "center",
								padding: "4px 0",
							}}
						>
							{[0, 0.2, 0.4].map((d) => (
								<span
									key={d}
									style={{
										width: 8,
										height: 8,
										borderRadius: "50%",
										background: "var(--emerald)",
										animation: `pulse 1.2s ${d}s infinite`,
									}}
								/>
							))}
						</div>
					) : (
						<p
							style={{
								fontFamily: "var(--font-geist), Geist, sans-serif",
								fontSize: 15,
								fontWeight: 600,
								color: "#111827",
								lineHeight: 1.55,
							}}
						>
							{currentQuestion}
						</p>
					)}
				</div>

				{/* Stats row */}
				<div style={{ display: "flex", gap: 8, width: "100%" }}>
					{[
						{ val: answeredCount, label: "Answered", accent: false },
						{ val: remainingCount, label: "Remaining", accent: false },
						{ val: `${avgScore || "—"}%`, label: "Avg Score", accent: true },
					].map(({ val, label, accent }) => (
						<div
							key={label}
							style={{
								flex: 1,
								background: "var(--bg-tertiary)",
								border: "1px solid var(--border-subtle)",
								borderRadius: 8,
								padding: 12,
								textAlign: "center",
							}}
						>
							<div
								style={{
									fontFamily: "var(--font-geist), Geist, sans-serif",
									fontSize: 20,
									fontWeight: 700,
									color: accent ? "var(--emerald)" : "var(--text-primary)",
								}}
							>
								{val}
							</div>
							<div
								style={{
									fontSize: 11,
									color: "var(--text-faint)",
									marginTop: 2,
								}}
							>
								{label}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* ── RIGHT: User panel ─────────────────────────────────────────── */}
			<div
				style={{
					background: "var(--bg-secondary)",
					border: "1px solid var(--border-subtle)",
					borderRadius: 20,
					padding: 28,
					display: "flex",
					flexDirection: "column",
					gap: 20,
				}}
			>
				{/* Timer + question info */}
				<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
					<CircularTimer timeLeft={timeLeft} total={timePerQuestion} />
					<div style={{ flex: 1 }}>
						<p
							style={{
								fontSize: 11,
								color: "var(--text-muted)",
								marginBottom: 3,
							}}
						>
							Question {currentQIndex + 1} of {track.questions}
						</p>
						<p
							style={{
								fontFamily: "var(--font-geist), Geist, sans-serif",
								fontSize: 14,
								fontWeight: 600,
								color: "var(--text-primary)",
							}}
						>
							{track.name}
						</p>
						{/* Time progress bar */}
						<div
							style={{
								marginTop: 8,
								height: 4,
								background: "var(--bg-tertiary)",
								borderRadius: 2,
								overflow: "hidden",
							}}
						>
							<div
								style={{
									height: "100%",
									borderRadius: 2,
									background:
										timeLeft <= 30 ? "var(--danger)" : "var(--emerald)",
									width: `${(timeLeft / timePerQuestion) * 100}%`,
									transition: "width 1s linear, background 0.4s",
								}}
							/>
						</div>
					</div>
				</div>

				{/* Live transcript */}
				<LiveTranscript
					transcript={transcript}
					interimText={interimText}
					currentQIndex={currentQIndex}
				/>

				{/* Mic level indicator */}
				<div
					style={{
						background: "var(--bg-tertiary)",
						borderRadius: 10,
						padding: "14px 16px",
						display: "flex",
						alignItems: "center",
						gap: 12,
					}}
				>
					<WaveBars active={isSpeaking} count={3} />
					<div style={{ flex: 1 }}>
						<div
							style={{
								fontSize: 11,
								color: "var(--text-faint)",
								marginBottom: 3,
							}}
						>
							{isMuted ? "Microphone muted" : "Microphone active"}
						</div>
						<div
							style={{
								height: 4,
								background: "var(--bg-primary)",
								borderRadius: 2,
								overflow: "hidden",
							}}
						>
							<div
								style={{
									height: "100%",
									borderRadius: 2,
									background: "var(--emerald)",
									animation: isSpeaking
										? "progpulse 1.5s ease-in-out infinite"
										: "none",
									width: isSpeaking ? "65%" : "0%",
									transition: "width 0.3s",
								}}
							/>
						</div>
					</div>
					<span
						style={{
							fontSize: 12,
							color: isMuted ? "var(--danger)" : "var(--emerald)",
						}}
					>
						{isMuted ? "Muted" : "Clear"}
					</span>
				</div>

				{/* Controls */}
				<div style={{ display: "flex", gap: 12 }}>
					{/* Next / Finish button */}
					<button
						onClick={onNext}
						disabled={isProcessing}
						className="btn-primary"
						style={{
							flex: 1,
							padding: "13px 0",
							fontSize: 14,
							justifyContent: "center",
							opacity: isProcessing ? 0.6 : 1,
						}}
					>
						{isProcessing ? (
							"Loading…"
						) : currentQIndex >= track.questions - 1 ? (
							<>
								Finish Interview
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<polyline points="20 6 9 17 4 12" />
								</svg>
							</>
						) : (
							<>
								Next Question
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="5" y1="12" x2="19" y2="12" />
									<polyline points="12 5 19 12 12 19" />
								</svg>
							</>
						)}
					</button>

					{/* Mute toggle */}
					<button
						onClick={onToggleMute}
						aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
						aria-pressed={isMuted}
						style={{
							width: 48,
							height: 48,
							borderRadius: 10,
							flexShrink: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							transition: "all 0.2s",
							background: isMuted
								? "rgba(239,68,68,0.10)"
								: "var(--bg-tertiary)",
							border: isMuted
								? "1px solid rgba(239,68,68,0.30)"
								: "1px solid var(--border-subtle)",
						}}
					>
						{isMuted ? (
							/* Muted icon */
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#F87171"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="1" y1="1" x2="23" y2="23" />
								<path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
								<path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
								<line x1="12" y1="19" x2="12" y2="23" />
								<line x1="8" y1="23" x2="16" y2="23" />
							</svg>
						) : (
							/* Active mic icon */
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--text-muted)"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
								<path d="M19 10v2a7 7 0 0 1-14 0v-2" />
								<line x1="12" y1="19" x2="12" y2="23" />
								<line x1="8" y1="23" x2="16" y2="23" />
							</svg>
						)}
					</button>

					{/* End session */}
					<button
						onClick={onEnd}
						aria-label="End interview session"
						title="End session"
						style={{
							width: 48,
							height: 48,
							borderRadius: 10,
							flexShrink: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							transition: "all 0.2s",
							background: "var(--bg-tertiary)",
							border: "1px solid var(--border-subtle)",
						}}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="var(--text-muted)"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect x="3" y="3" width="18" height="18" rx="2" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
