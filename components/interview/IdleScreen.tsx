import Track from "../tracks/types";
import { formatTime } from "./FormatTime";
import { computeTimePerQuestion } from "./hooks/parseDuration";

export function IdleScreen({
	track,
	onStart,
	speechSupported,
}: {
	track: Track;
	onStart: () => void;
	speechSupported: boolean;
}) {
	const timePerQuestion = computeTimePerQuestion(
		track.duration,
		track.questions,
	);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
			}}
		>
			<div
				style={{
					width: 64,
					height: 64,
					borderRadius: 16,
					marginBottom: 24,
					background: "var(--emerald-glow)",
					border: "1px solid var(--border-em)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<svg
					width="28"
					height="28"
					viewBox="0 0 24 24"
					fill="none"
					stroke="var(--emerald)"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polygon points="5 3 19 12 5 21 5 3" />
				</svg>
			</div>

			<h2
				style={{
					fontFamily: "var(--font-geist), Geist, sans-serif",
					fontSize: 28,
					fontWeight: 700,
					letterSpacing: "-0.03em",
					color: "var(--text-primary)",
					marginBottom: 10,
				}}
			>
				Ready to begin?
			</h2>
			<p
				style={{
					fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
					fontSize: 16,
					color: "var(--text-muted)",
					maxWidth: 420,
					marginBottom: 10,
					lineHeight: 1.6,
					fontWeight: 300,
				}}
			>
				{track.description}
			</p>

			{/* Meta */}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: 20,
					marginBottom: 32,
					fontSize: 13,
					color: "var(--text-faint)",
				}}
			>
				{[
					{ icon: "📋", label: `${track.questions} questions` },
					{
						icon: "⏱",
						label: `${formatTime(timePerQuestion)} per question`,
					},
					{ icon: "🎙", label: "Microphone required" },
				].map(({ icon, label }) => (
					<span key={label}>
						{icon} {label}
					</span>
				))}
			</div>

			{/* Browser warning */}
			{!speechSupported && (
				<div
					style={{
						background: "rgba(245,158,11,0.10)",
						border: "1px solid rgba(245,158,11,0.25)",
						borderRadius: 12,
						padding: "12px 18px",
						marginBottom: 24,
						maxWidth: 420,
						fontSize: 13,
						color: "var(--warning)",
						lineHeight: 1.5,
						textAlign: "left",
					}}
				>
					Your browser doesnt support speech recognition. Use Chrome or Edge for
					the best experience.
				</div>
			)}

			<button
				onClick={onStart}
				className="btn-primary"
				style={{ padding: "14px 40px", fontSize: 16 }}
			>
				Start Interview
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polygon points="5 3 19 12 5 21 5 3" />
				</svg>
			</button>
		</div>
	);
}
