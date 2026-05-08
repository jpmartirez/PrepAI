import { formatTime } from "./FormatTime";

export function CircularTimer({
	timeLeft,
	total,
}: {
	timeLeft: number;
	total: number;
}) {
	const radius = 38;
	const circumference = 2 * Math.PI * radius; // 238.76
	const fraction = Math.max(0, timeLeft / total);
	const dashOffset = circumference * (1 - fraction);
	const isUrgent = timeLeft <= 30;

	return (
		<div style={{ position: "relative", width: 88, height: 88, flexShrink: 0 }}>
			<svg
				width="88"
				height="88"
				viewBox="0 0 88 88"
				style={{ transform: "rotate(-90deg)" }}
			>
				{/* Track */}
				<circle
					cx="44"
					cy="44"
					r={radius}
					fill="none"
					stroke="var(--bg-tertiary)"
					strokeWidth="5"
				/>
				{/* Progress */}
				<circle
					cx="44"
					cy="44"
					r={radius}
					fill="none"
					stroke={isUrgent ? "var(--danger)" : "var(--emerald)"}
					strokeWidth="5"
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={dashOffset}
					style={{
						transition: "stroke-dashoffset 1s linear, stroke 0.4s",
						filter: isUrgent
							? "drop-shadow(0 0 4px rgba(239,68,68,0.6))"
							: "drop-shadow(0 0 4px rgba(16,185,129,0.6))",
					}}
				/>
			</svg>
			{/* Inner label */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<span
					style={{
						fontFamily: "var(--font-geist), Geist, sans-serif",
						fontSize: 20,
						fontWeight: 700,
						lineHeight: 1,
						color: isUrgent ? "var(--danger)" : "var(--text-primary)",
						transition: "color 0.4s",
					}}
				>
					{formatTime(timeLeft)}
				</span>
				<span
					style={{
						fontSize: 9,
						textTransform: "uppercase",
						letterSpacing: "0.08em",
						color: "var(--text-faint)",
						marginTop: 2,
					}}
				>
					left
				</span>
			</div>
		</div>
	);
}
