import { prisma } from "@/lib/prisma";
import PricingClient from "./PricingClient";
import { Plan } from "@/components/pricing/types";

export default async function PricingPage() {
	const plans = await prisma.plan.findMany({
		include: { features: true },
	});

	const formattedPlans: Plan[] = plans.map((plan) => ({
		id: plan.id,
		name: plan.name,
		description: plan.description,
		monthlyPrice: plan.monthlyPrice,
		annualPrice: plan.annualPrice,
		badge: plan.badge,
		popular: plan.popular,
		cta: plan.cta,
		ctaHref: plan.ctaHref,
		features: plan.features.map((f) => ({
			text: f.text,
			included: f.included,
			highlight: f.highlight,
		})),
	}));

	const faqs = await prisma.fAQ.findMany({
		where: { published: true },
		orderBy: { sortOrder: "asc" },
	});

	const testimonials = await prisma.testimonial.findMany();

	return (
		<PricingClient
			plans={formattedPlans}
			faqs={faqs}
			testimonials={testimonials}
		/>
	);
}
