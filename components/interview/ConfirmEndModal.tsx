export function ConfirmEndModal({
	onConfirm,
	onCancel,
}: {
	onConfirm: () => void;
	onCancel: () => void;
}) {
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 100,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "rgba(0,0,0,0.65)",
				backdropFilter: "blur(6px)",
			}}
			role="dialog"
			aria-modal="true"
		>
			<div
				style={{
					background: "var(--bg-secondary)",
					border: "1px solid var(--border-subtle)",
					borderRadius: 20,
					padding: "40px 36px",
					maxWidth: 400,
					width: "90%",
					textAlign: "center",
					boxShadow: "var(--shadow-lg)",
				}}
			>
				<div
					style={{
						width: 48,
						height: 48,
						borderRadius: 12,
						margin: "0 auto 16px",
						background: "rgba(239,68,68,0.12)",
						border: "1px solid rgba(239,68,68,0.25)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#F87171"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
						<line x1="12" y1="9" x2="12" y2="13" />
						<line x1="12" y1="17" x2="12.01" y2="17" />
					</svg>
				</div>
				<h3
					style={{
						fontFamily: "var(--font-geist), Geist, sans-serif",
						fontSize: 18,
						fontWeight: 600,
						color: "var(--text-primary)",
						marginBottom: 8,
					}}
				>
					End this session?
				</h3>
				<p
					style={{
						fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
						fontSize: 14,
						color: "var(--text-muted)",
						marginBottom: 28,
						lineHeight: 1.6,
					}}
				>
					Your answers so far will be scored. You wont be able to continue this
					session.
				</p>
				<div style={{ display: "flex", gap: 12 }}>
					<button
						onClick={onCancel}
						className="btn-secondary"
						style={{ flex: 1, padding: "10px 0" }}
					>
						Keep going
					</button>
					<button
						onClick={onConfirm}
						style={{
							flex: 1,
							padding: "10px 0",
							borderRadius: 10,
							background: "var(--danger)",
							color: "#fff",
							border: "none",
							fontFamily:
								"var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
							fontSize: 14,
							fontWeight: 500,
							cursor: "pointer",
						}}
					>
						End session
					</button>
				</div>
			</div>
		</div>
	);
}
