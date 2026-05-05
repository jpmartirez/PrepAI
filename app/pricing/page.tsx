"use client";

import { useState } from "react";
import Link from "next/link";
import { BillingCycle } from "@/components/pricing/types";
import BillingToggle from "@/components/pricing/BillingToggle";
import { FAQS, PLANS, TESTIMONIALS } from "@/components/pricing/constants";
import PlanCard from "@/components/pricing/PlanCard";
import TestimonialCard from "@/components/pricing/TestimonialCard";
import FAQItem from "@/components/pricing/FAQItem";

export default function PricingPage() {
	const [cycle, setCycle] = useState<BillingCycle>("annual");

	return (
		<main className="animate-scale-in">
			<div className="wrapper">
				{/* ── Hero ── */}
				<section className="text-center pt-4 pb-14">
					<div className="hero-badge mx-auto mb-5 w-fit">
						<span
							className="w-1.5 h-1.5 rounded-full"
							style={{
								background: "var(--emerald)",
								animation: "pulse 2s infinite",
							}}
							aria-hidden="true"
						/>
						Simple, transparent pricing
					</div>

					<h1 className="hero-title mb-4 max-w-2xl mx-auto">
						Invest in your <em>career</em>,<br />
						not your prep tool.
					</h1>
					<p className="hero-subtitle max-w-lg mx-auto mb-8">
						One platform. Real AI feedback. Every interview track you need to
						land the role you want.
					</p>

					<BillingToggle cycle={cycle} onChange={setCycle} />
				</section>

				{/* ── Plans Grid ── */}
				<section
					className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
					aria-label="Pricing plans"
				>
					{PLANS.map((plan) => (
						<PlanCard key={plan.id} plan={plan} cycle={cycle} />
					))}
				</section>

				{/* ── Comparison note ── */}
				<section className="text-center mb-20">
					<p className="text-sm mb-4" style={{ color: "var(--text-faint)" }}>
						All plans include · SSL encryption · GDPR compliant · Cancel anytime
					</p>
					<div className="flex flex-wrap justify-center gap-6">
						{[
							{ icon: "🔒", label: "Bank-level security" },
							{ icon: "🚫", label: "No hidden fees" },
							{ icon: "⚡", label: "Instant activation" },
							{ icon: "💳", label: "No credit card for free tier" },
						].map(({ icon, label }) => (
							<span
								key={label}
								className="flex items-center gap-2 text-sm"
								style={{ color: "var(--text-muted)" }}
							>
								<span>{icon}</span>
								{label}
							</span>
						))}
					</div>
				</section>

				{/* ── Testimonials ── */}
				<section className="mb-20">
					<div className="text-center mb-10">
						<p className="label-sm mb-3" style={{ color: "var(--text-faint)" }}>
							What our users say
						</p>
						<h2 className="heading-lg max-w-xl mx-auto">
							Trusted by engineers at top companies
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{TESTIMONIALS.map((t) => (
							<TestimonialCard key={t.name} t={t} />
						))}
					</div>
				</section>

				{/* ── FAQ ── */}
				<section className="max-w-2xl mx-auto mb-20">
					<div className="text-center mb-10">
						<h2 className="heading-lg mb-3">Frequently asked questions</h2>
						<p className="body-md" style={{ color: "var(--text-muted)" }}>
							Still have questions?{" "}
							<a
								href=""
								className="underline"
								style={{ color: "var(--emerald)" }}
							>
								Email us
							</a>
						</p>
					</div>
					<div className="flex flex-col gap-3">
						{FAQS.map((faq) => (
							<FAQItem key={faq.question} faq={faq} />
						))}
					</div>
				</section>

				{/* ── Bottom CTA Banner ── */}
				<section
					className="rounded-2xl p-10 md:p-14 text-center mb-8 relative overflow-hidden"
					style={{
						background: "linear-gradient(145deg, #1a2f28, #111827)",
						border: "1px solid var(--border-em)",
					}}
				>
					{/* Decorative glow */}
					<div
						aria-hidden="true"
						className="absolute inset-0 pointer-events-none"
						style={{
							background:
								"radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12), transparent 70%)",
						}}
					/>
					<p className="label-sm mb-4" style={{ color: "var(--emerald)" }}>
						Ready to get started?
					</p>
					<h2 className="heading-xl mb-4 relative z-10">
						Your dream role is one
						<br className="hidden sm:block" /> practice session away.
					</h2>
					<p
						className="body-md mb-8 max-w-md mx-auto relative z-10"
						style={{ color: "var(--text-muted)" }}
					>
						Join 50,000+ engineers who leveled up their interview skills with
						InterviewAI.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
						<Link href="/sign-up" className="btn-primary px-8 py-3.5 text-base">
							Start for free
							<svg
								width="16"
								height="16"
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
						<Link
							href="/tracks"
							className="btn-secondary px-8 py-3.5 text-base"
						>
							Browse interview tracks
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
