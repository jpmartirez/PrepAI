export default function SearchBar({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<div
			className="flex items-center gap-3 px-4 py-3 rounded-xl w-full sm:w-80"
			style={{
				background: "var(--bg-secondary)",
				border: "1px solid var(--border-subtle)",
			}}
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="var(--text-faint)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				type="search"
				placeholder="Search tracks…"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="bg-transparent flex-1 text-sm outline-none placeholder:text-(--text-faint)"
				style={{
					color: "var(--text-primary)",
					fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
				}}
				aria-label="Search interview tracks"
			/>
			{value && (
				<button onClick={() => onChange("")} aria-label="Clear search">
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="var(--text-faint)"
						strokeWidth="2"
						aria-hidden="true"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			)}
		</div>
	);
}
