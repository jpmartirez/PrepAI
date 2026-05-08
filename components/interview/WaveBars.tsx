export function WaveBars({
	active,
	color = "var(--emerald)",
	count = 7,
}: {
	active: boolean;
	color?: string;
	count?: number;
}) {
	const heights = [8, 20, 28, 32, 28, 20, 12];
	const delays = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9];
	return (
		<div
			className="flex items-center justify-center gap-0.75"
			style={{ height: 36 }}
		>
			{Array.from({ length: count }).map((_, i) => (
				<span
					key={i}
					className="rounded-sm block"
					style={{
						width: 3,
						height: heights[i] ?? 20,
						background: color,
						animation: active
							? `waveani 1.2s ease-in-out ${delays[i] ?? 0}s infinite`
							: "none",
						transform: active ? "none" : "scaleY(0.35)",
						opacity: active ? 1 : 0.25,
						transition: "transform 0.3s, opacity 0.3s",
					}}
				/>
			))}
		</div>
	);
}
