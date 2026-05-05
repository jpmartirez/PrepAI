// ── Logo ─────────────────────────────────────────────────────────────────────

import Link from "next/link";

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2.5 shrink-0">
			{/* Emerald dot */}
			<span className="logo-dot" aria-hidden="true" />
			{/* Wordmark */}
			<span className="logo-text">InterviewAI</span>
		</Link>
	);
}
