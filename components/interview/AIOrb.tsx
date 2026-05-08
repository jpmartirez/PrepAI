import { WaveBars } from "./WaveBars";

export default function AIOrb({ active }: { active: boolean }) {
	return (
		<div
			className="ai-orb-container mx-auto"
			style={{ width: 160, height: 160, position: "relative" }}
		>
			{/* Outer glow */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					borderRadius: "50%",
					background:
						"radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.05) 60%, transparent 80%)",
					animation: active ? "breathe 3s ease-in-out infinite" : "none",
				}}
			/>
			{/* Pulse rings */}
			{["-16px", "-30px", "-46px"].map((inset, i) => (
				<div
					key={i}
					style={{
						position: "absolute",
						inset,
						borderRadius: "50%",
						border: "1px solid rgba(16,185,129,0.15)",
						animation: active ? `ringpulse 3s ${i * 0.5}s infinite` : "none",
					}}
				/>
			))}
			{/* Core orb */}
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%,-50%)",
					width: 120,
					height: 120,
					borderRadius: "50%",
					background: "var(--bg-tertiary)",
					border: "2px solid var(--border-em)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					overflow: "hidden",
				}}
			>
				<WaveBars active={active} />
			</div>
		</div>
	);
}
