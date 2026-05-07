import { FAQS, PLANS, TESTIMONIALS } from "@/components/pricing/constants";
import { prisma } from "@/lib/prisma";

async function main() {
	for (const plan of PLANS) {
		await prisma.plan.create({
			data: {
				id: plan.id,
				name: plan.name,
				description: plan.description,
				monthlyPrice: plan.monthlyPrice,
				annualPrice: plan.annualPrice,

				badge: plan.badge,
				popular: plan.popular ?? false,

				cta: plan.cta,
				ctaHref: plan.ctaHref,

				features: {
					create: plan.features.map((feature) => ({
						text: feature.text,
						included: feature.included,
						highlight: feature.highlight ?? false,
					})),
				},
			},
		});
	}
}

async function addTestimonials() {
	for (const testimonial of TESTIMONIALS) {
		await prisma.testimonial.create({
			data: {
				quote: testimonial.quote,
				name: testimonial.name,
				role: testimonial.role,
				initials: testimonial.initials,
				color: testimonial.color,
			},
		});
	}
}

async function addFAQs() {
	for (const faq of FAQS) {
		await prisma.fAQ.create({
			data: {
				question: faq.question,
				answer: faq.answer,
			},
		});
	}
}

addFAQs()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
