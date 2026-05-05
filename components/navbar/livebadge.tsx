// ── Live Interview Indicator ──────────────────────────────────────────────────

export default function LiveBadge() {
	return (
		<div
			className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
			style={{
				backgroundColor: "rgba(239,68,68,0.10)",
				border: "1px solid rgba(239,68,68,0.25)",
				color: "#F87171",
			}}
		>
			<span
				className="w-1.5 h-1.5 rounded-full bg-red-400"
				style={{ animation: "pulse 1s infinite" }}
				aria-hidden="true"
			/>
			Live
		</div>
	);
}
