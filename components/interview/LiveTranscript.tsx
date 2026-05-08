import { useEffect, useRef } from "react";
import { TranscriptLine } from "./types/interview";

export function LiveTranscript({
	transcript,
	interimText,
	currentQIndex,
}: {
	transcript: TranscriptLine[];
	interimText: string;
	currentQIndex: number;
}) {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [transcript.length, interimText]);

	// Only show user lines for the current question
	const currentLines = transcript.filter(
		(l) => l.role === "user" && l.questionIndex === currentQIndex,
	);

	return (
		<div
			style={{
				background: "var(--bg-primary)",
				border: "1px solid var(--border-subtle)",
				borderRadius: "var(--radius)",
				padding: "16px 18px",
				minHeight: 180,
				maxHeight: 220,
				overflowY: "auto",
				fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
				fontSize: 14,
				color: "var(--text-muted)",
				lineHeight: 1.7,
			}}
		>
			{/* Header row */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					fontSize: 10,
					textTransform: "uppercase",
					letterSpacing: "0.12em",
					color: "var(--text-faint)",
					marginBottom: 12,
				}}
			>
				<span>Live Transcript</span>
				<span
					style={{
						display: "flex",
						alignItems: "center",
						gap: 5,
						padding: "2px 8px",
						borderRadius: 4,
						background: "var(--emerald-glow)",
						border: "1px solid var(--border-em)",
						color: "var(--emerald)",
					}}
				>
					<span
						style={{
							width: 5,
							height: 5,
							borderRadius: "50%",
							background: "var(--emerald)",
							animation: "pulse 1s infinite",
						}}
					/>
					Live
				</span>
			</div>

			{/* Content */}
			{currentLines.length === 0 && !interimText ? (
				<p
					style={{
						color: "var(--text-faint)",
						textAlign: "center",
						marginTop: 24,
						fontSize: 13,
					}}
				>
					Start speaking — your words will appear here in real time.
				</p>
			) : (
				<>
					{currentLines.map((line) => (
						<span key={line.id} style={{ color: "var(--text-primary)" }}>
							{line.text}{" "}
						</span>
					))}
					{interimText && (
						<span style={{ color: "var(--text-muted)" }}>
							{interimText}
							<span
								style={{
									display: "inline-block",
									width: 2,
									height: 14,
									background: "var(--emerald)",
									verticalAlign: "middle",
									marginLeft: 2,
									animation: "blink 1s infinite",
								}}
							/>
						</span>
					)}
				</>
			)}

			<div ref={bottomRef} />
		</div>
	);
}
