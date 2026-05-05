import { BillingCycle } from "./types";

export default function BillingToggle({
	cycle,
	onChange,
}: {
	cycle: BillingCycle;
	onChange: (c: BillingCycle) => void;
}) {
	return (
		<div className="flex items-center gap-3">
			<span
				className="text-sm font-medium"
				style={{
					color:
						cycle === "monthly" ? "var(--text-primary)" : "var(--text-faint)",
				}}
			>
				Monthly
			</span>

			<button
				role="switch"
				aria-checked={cycle === "annual"}
				onClick={() => onChange(cycle === "monthly" ? "annual" : "monthly")}
				className="relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald)"
				style={{
					backgroundColor:
						cycle === "annual" ? "var(--emerald)" : "var(--bg-tertiary)",
					border: "1px solid var(--border-subtle)",
				}}
			>
				<span
					className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200"
					style={{
						transform:
							cycle === "annual" ? "translateX(24px)" : "translateX(0)",
					}}
				/>
			</button>

			<span
				className="text-sm font-medium flex items-center gap-2"
				style={{
					color:
						cycle === "annual" ? "var(--text-primary)" : "var(--text-faint)",
				}}
			>
				Annual
				<span
					className="text-xs px-2 py-0.5 rounded-full font-semibold"
					style={{
						background: "var(--emerald-glow)",
						color: "var(--emerald)",
						border: "1px solid var(--border-em)",
					}}
				>
					Save 25%
				</span>
			</span>
		</div>
	);
}
