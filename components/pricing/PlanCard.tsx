import Link from "next/link";
import CheckIcon from "./CheckIcon";
import CrossIcon from "./CrossIcon";
import { BillingCycle, Plan } from "./types";

export default function PlanCard({
	plan,
	cycle,
}: {
	plan: Plan;
	cycle: BillingCycle;
}) {
	const price = cycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
	const isFree = price === 0;

	return (
		<div
			className="relative flex flex-col rounded-2xl p-7 transition-all duration-300"
			style={{
				background: plan.popular
					? "linear-gradient(145deg, #1a2f28, #1a2333)"
					: "var(--bg-secondary)",
				border: plan.popular
					? "1px solid var(--border-em)"
					: "1px solid var(--border-subtle)",
				boxShadow: plan.popular ? "var(--shadow-card)" : "var(--shadow-sm)",
			}}
		>
			{/* Popular badge */}
			{plan.badge && (
				<div
					className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
					style={
						plan.popular
							? { background: "var(--emerald)", color: "#fff" }
							: {
									background: "var(--bg-tertiary)",
									border: "1px solid var(--border-subtle)",
									color: "var(--text-muted)",
								}
					}
				>
					{plan.badge}
				</div>
			)}

			{/* Header */}
			<div className="mb-6">
				<h3
					className="text-lg font-semibold mb-1"
					style={{
						fontFamily: "var(--font-geist), Geist, sans-serif",
						color: "var(--text-primary)",
					}}
				>
					{plan.name}
				</h3>
				<p
					className="text-sm"
					style={{
						color: "var(--text-muted)",
						fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
					}}
				>
					{plan.description}
				</p>
			</div>

			{/* Price */}
			<div className="mb-7 flex items-end gap-1.5">
				<span
					className="font-bold leading-none"
					style={{
						fontFamily: "var(--font-geist), Geist, sans-serif",
						color: "var(--text-primary)",
						fontSize: isFree ? "36px" : "48px",
					}}
				>
					{isFree ? "Free" : `$${price}`}
				</span>
				{!isFree && (
					<span
						className="text-sm mb-1.5"
						style={{ color: "var(--text-faint)" }}
					>
						/ mo{cycle === "annual" && <>, billed annually</>}
					</span>
				)}
			</div>

			{/* CTA */}
			<Link
				href={plan.ctaHref}
				className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-7"
				style={
					plan.popular
						? {
								background: "var(--emerald)",
								color: "#fff",
								fontFamily:
									"var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
							}
						: {
								background: "transparent",
								color: "var(--text-primary)",
								border: "1px solid var(--border-medium)",
								fontFamily:
									"var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
							}
				}
				onMouseEnter={(e) => {
					if (plan.popular) {
						e.currentTarget.style.background = "var(--emerald-hover)";
						e.currentTarget.style.boxShadow = "var(--shadow-emerald)";
					} else {
						e.currentTarget.style.borderColor = "var(--border-strong)";
						e.currentTarget.style.background = "var(--bg-tertiary)";
					}
				}}
				onMouseLeave={(e) => {
					if (plan.popular) {
						e.currentTarget.style.background = "var(--emerald)";
						e.currentTarget.style.boxShadow = "none";
					} else {
						e.currentTarget.style.borderColor = "var(--border-medium)";
						e.currentTarget.style.background = "transparent";
					}
				}}
			>
				{plan.cta}
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<line x1="5" y1="12" x2="19" y2="12" />
					<polyline points="12 5 19 12 12 19" />
				</svg>
			</Link>

			{/* Divider */}
			<div
				className="w-full h-px mb-6"
				style={{ background: "var(--border-subtle)" }}
			/>

			{/* Features */}
			<ul className="flex flex-col gap-3">
				{plan.features.map((f, i) => (
					<li key={i} className="flex items-start gap-3">
						<span className="mt-0.5 shrink-0">
							{f.included ? (
								<CheckIcon
									color={f.highlight ? "var(--emerald)" : "var(--text-muted)"}
								/>
							) : (
								<CrossIcon />
							)}
						</span>
						<span
							className="text-sm"
							style={{
								color: f.included
									? f.highlight
										? "var(--text-primary)"
										: "var(--text-secondary)"
									: "var(--text-faint)",
								fontFamily:
									"var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
								fontWeight: f.highlight ? 500 : 400,
							}}
						>
							{f.text}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
