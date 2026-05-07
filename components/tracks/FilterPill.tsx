export default function FilterPill({
	label,
	active,
	onClick,
}: {
	label: string;
	active: boolean;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap"
			style={
				active
					? { background: "var(--emerald)", color: "#fff" }
					: {
							background: "var(--bg-secondary)",
							color: "var(--text-muted)",
							border: "1px solid var(--border-subtle)",
						}
			}
			aria-pressed={active}
		>
			{label}
		</button>
	);
}
