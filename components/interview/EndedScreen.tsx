export function EndedScreen() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: "100px 24px",
				textAlign: "center",
			}}
		>
			<div
				style={{
					width: 64,
					height: 64,
					borderRadius: "50%",
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
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="20 6 9 17 4 12" />
				</svg>
			</div>
			<h2
				style={{
					fontFamily: "var(--font-geist), Geist, sans-serif",
					fontSize: 28,
					fontWeight: 700,
					color: "var(--text-primary)",
					marginBottom: 8,
				}}
			>
				Session complete!
			</h2>
			<p
				style={{
					fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
					fontSize: 15,
					color: "var(--text-muted)",
					marginBottom: 20,
				}}
			>
				Analysing your responses and building your results…
			</p>
			<span
				style={{
					display: "flex",
					alignItems: "center",
					gap: 8,
					fontSize: 13,
					color: "var(--emerald)",
				}}
			>
				<span
					style={{
						width: 7,
						height: 7,
						borderRadius: "50%",
						background: "var(--emerald)",
						animation: "pulse 1s infinite",
					}}
				/>
				Redirecting to results…
			</span>
		</div>
	);
}
