// ── Hamburger Icon ────────────────────────────────────────────────────────────

export default function Hamburger({
	open,
	onClick,
}: {
	open: boolean;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			aria-label={open ? "Close menu" : "Open menu"}
			aria-expanded={open}
			className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
		>
			<span
				className="block h-0.5 w-5 rounded-full transition-all duration-300 origin-center"
				style={{
					backgroundColor: "var(--text-primary)",
					transform: open ? "rotate(45deg) translate(3px, 3px)" : "none",
				}}
			/>
			<span
				className="block h-0.5 w-5 rounded-full transition-all duration-300"
				style={{
					backgroundColor: "var(--text-primary)",
					opacity: open ? 0 : 1,
					transform: open ? "scaleX(0)" : "none",
				}}
			/>
			<span
				className="block h-0.5 w-5 rounded-full transition-all duration-300 origin-center"
				style={{
					backgroundColor: "var(--text-primary)",
					transform: open ? "rotate(-45deg) translate(3px, -3px)" : "none",
				}}
			/>
		</button>
	);
}
