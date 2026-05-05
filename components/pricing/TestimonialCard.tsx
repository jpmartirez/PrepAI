import { Testimonial } from "./types";

export default function TestimonialCard({ t }: { t: Testimonial }) {
	return (
		<div
			className="rounded-xl p-6 flex flex-col gap-4"
			style={{
				background: "var(--bg-secondary)",
				border: "1px solid var(--border-subtle)",
			}}
		>
			{/* Stars */}
			<div className="flex gap-1">
				{Array.from({ length: 5 }).map((_, i) => (
					<svg
						key={i}
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="var(--emerald)"
						aria-hidden="true"
					>
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
					</svg>
				))}
			</div>
			<p
				className="text-sm leading-relaxed"
				style={{
					color: "var(--text-secondary)",
					fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
				}}
			>
				{t.quote}
			</p>
			<div className="flex items-center gap-3 mt-auto">
				<div
					className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
					style={{ background: t.color }}
				>
					{t.initials}
				</div>
				<div>
					<p
						className="text-sm font-semibold"
						style={{
							color: "var(--text-primary)",
							fontFamily: "var(--font-geist), Geist, sans-serif",
						}}
					>
						{t.name}
					</p>
					<p className="text-xs" style={{ color: "var(--text-faint)" }}>
						{t.role}
					</p>
				</div>
			</div>
		</div>
	);
}
