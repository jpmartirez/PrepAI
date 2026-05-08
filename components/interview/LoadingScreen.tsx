export function LoadingScreen({
	label = "Preparing your session…",
}: {
	label?: string;
}) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: "100px 24px",
			}}
		>
			<div
				style={{
					width: 56,
					height: 56,
					borderRadius: "50%",
					marginBottom: 20,
					background: "var(--emerald-glow)",
					border: "1px solid var(--border-em)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					animation: "breathe 1.5s ease-in-out infinite",
				}}
			>
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="var(--emerald)"
					strokeWidth="2.2"
					strokeLinecap="round"
				>
					<path strokeDasharray="60" strokeDashoffset="20">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 12 12"
							to="360 12 12"
							dur="0.9s"
							repeatCount="indefinite"
						/>
						M12 2a10 10 0 1 0 10 10
					</path>
					<circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
					<path d="M12 2a10 10 0 0 1 10 10">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 12 12"
							to="360 12 12"
							dur="0.9s"
							repeatCount="indefinite"
						/>
					</path>
				</svg>
			</div>
			<p
				style={{
					fontFamily: "var(--font-geist), Geist, sans-serif",
					fontSize: 18,
					fontWeight: 600,
					color: "var(--text-primary)",
					marginBottom: 6,
				}}
			>
				{label}
			</p>
			<p
				style={{
					fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
					fontSize: 14,
					color: "var(--text-muted)",
				}}
			>
				Generating your question with AI…
			</p>
		</div>
	);
}
