import { useState } from "react";
import { FAQ } from "./types";

export default function FAQItem({ faq }: { faq: FAQ }) {
	const [open, setOpen] = useState(false);
	return (
		<div
			className="rounded-xl overflow-hidden transition-all duration-200"
			style={{
				background: "var(--bg-secondary)",
				border: "1px solid var(--border-subtle)",
			}}
		>
			<button
				onClick={() => setOpen((v) => !v)}
				className="w-full flex items-center justify-between px-6 py-4 text-left"
				aria-expanded={open}
			>
				<span
					className="text-sm font-medium pr-4"
					style={{
						color: "var(--text-primary)",
						fontFamily: "var(--font-geist), Geist, sans-serif",
					}}
				>
					{faq.question}
				</span>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="var(--text-muted)"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="shrink-0 transition-transform duration-200"
					style={{ transform: open ? "rotate(180deg)" : "none" }}
					aria-hidden="true"
				>
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</button>
			{open && (
				<div className="px-6 pb-5">
					<p
						className="text-sm leading-relaxed"
						style={{
							color: "var(--text-muted)",
							fontFamily:
								"var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
						}}
					>
						{faq.answer}
					</p>
				</div>
			)}
		</div>
	);
}
