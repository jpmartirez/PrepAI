// ── Types ─────────────────────────────────────────────────────────────────────

export type BillingCycle = "monthly" | "annual";

export interface PlanFeature {
	text: string;
	included: boolean;
	highlight?: boolean;
}

export interface Plan {
	id: string;
	name: string;
	badge: string | null;
	description: string | null;
	monthlyPrice: number;
	annualPrice: number;
	cta: string;
	ctaHref: string;
	popular: boolean;
	features: PlanFeature[];
}

export interface Testimonial {
	quote: string;
	name: string;
	role: string;
	initials: string;
	color: string;
}

export interface FAQ {
	question: string;
	answer: string;
}
