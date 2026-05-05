// ── Data ──────────────────────────────────────────────────────────────────────

import { FAQ, Plan, Testimonial } from "./types";

export const PLANS: Plan[] = [
	{
		id: "free",
		name: "Starter",
		description: "For individuals just getting started with mock interviews.",
		monthlyPrice: 0,
		annualPrice: 0,
		cta: "Get started free",
		ctaHref: "/sign-up",
		features: [
			{ text: "3 mock interviews per month", included: true },
			{ text: "2 interview tracks", included: true },
			{ text: "Basic AI feedback", included: true },
			{ text: "Real-time transcription", included: true },
			{ text: "Session history (7 days)", included: true },
			{ text: "Advanced scoring & analytics", included: false },
			{ text: "Unlimited interview tracks", included: false },
			{ text: "Detailed performance breakdown", included: false },
			{ text: "Custom question sets", included: false },
			{ text: "Priority AI model", included: false },
		],
	},
	{
		id: "pro",
		name: "Pro",
		badge: "Most Popular",
		description: "For serious job seekers who want to land their dream role.",
		monthlyPrice: 19,
		annualPrice: 15,
		cta: "Start Pro",
		ctaHref: "/sign-up?plan=pro",
		popular: true,
		features: [
			{ text: "Unlimited mock interviews", included: true, highlight: true },
			{ text: "All 12 interview tracks", included: true, highlight: true },
			{
				text: "Advanced AI feedback & scoring",
				included: true,
				highlight: true,
			},
			{ text: "Real-time transcription", included: true },
			{ text: "Full session history", included: true },
			{ text: "Detailed performance breakdown", included: true },
			{ text: "Communication analytics", included: true },
			{ text: "Annotated transcripts", included: true },
			{ text: "Custom question sets", included: false },
			{ text: "Priority AI model", included: false },
		],
	},
	{
		id: "elite",
		name: "Elite",
		badge: "Best Value",
		description: "For professionals targeting FAANG and top-tier companies.",
		monthlyPrice: 39,
		annualPrice: 29,
		cta: "Go Elite",
		ctaHref: "/sign-up?plan=elite",
		features: [
			{ text: "Everything in Pro", included: true, highlight: true },
			{ text: "Priority GPT-4o AI model", included: true, highlight: true },
			{ text: "Custom question sets", included: true, highlight: true },
			{
				text: "Company-specific prep (FAANG+)",
				included: true,
				highlight: true,
			},
			{ text: "Personalized improvement roadmap", included: true },
			{ text: "Weekly progress reports", included: true },
			{ text: "Resume gap analysis", included: true },
			{ text: "Slack community access", included: true },
			{ text: "1-on-1 human mock (1/month)", included: true },
			{ text: "Priority support", included: true },
		],
	},
];

export const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			"Landed a senior engineer role at Stripe after 3 weeks of daily practice. The annotated transcripts were a game changer.",
		name: "Marcus T.",
		role: "Senior SWE @ Stripe",
		initials: "MT",
		color: "#6366F1",
	},
	{
		quote:
			"I used to freeze on behavioral questions. After 20+ sessions, I finally had answers that felt natural and structured.",
		name: "Priya K.",
		role: "SWE Intern @ Google",
		initials: "PK",
		color: "#F59E0B",
	},
	{
		quote:
			"The communication scoring caught filler words I never noticed. My confidence in real interviews shot up instantly.",
		name: "Daniel R.",
		role: "Backend Engineer @ Notion",
		initials: "DR",
		color: "#10B981",
	},
];

export const FAQS: FAQ[] = [
	{
		question: "Can I cancel my subscription anytime?",
		answer:
			"Yes. Cancel anytime from your account settings — no penalties, no questions asked. You keep access until the end of your billing period.",
	},
	{
		question: "Is there a free trial for Pro or Elite?",
		answer:
			"The Starter plan is permanently free and gives you a taste of the experience. Pro and Elite plans don't require a credit card to start — we offer a 7-day free trial.",
	},
	{
		question: "What are 'interview tracks'?",
		answer:
			"Tracks are curated interview programs for specific roles — Frontend, Backend, System Design, Behavioral, iOS, Data Science, and more. Each track has its own question bank and tailored evaluation criteria.",
	},
	{
		question: "How does the AI feedback work?",
		answer:
			"After each answer, the AI evaluates your response across technical accuracy, communication clarity, pacing, and confidence. Elite users get GPT-4o for more nuanced, context-aware feedback.",
	},
	{
		question: "Do you offer team or company plans?",
		answer:
			"Yes! We have custom plans for bootcamps, universities, and recruiting teams. Reach out at team@interviewai.app.",
	},
];
