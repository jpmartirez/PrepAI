// app/api/interview/question/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: process.env.GROQ_API_KEY,
	baseURL: "https://api.groq.com/openai/v1",
});

const FALLBACK_QUESTIONS = [
	"Tell me about a challenging project you worked on recently.",
	"How do you approach debugging a complex issue?",
	"Describe a time you improved application performance.",
	"What is a technical decision you regret and what did you learn from it?",
	"How do you structure scalable frontend applications?",
];

function randomFallbackQuestion() {
	return FALLBACK_QUESTIONS[
		Math.floor(Math.random() * FALLBACK_QUESTIONS.length)
	];
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const {
			trackName,
			category,
			questionIndex,
			totalQuestions,
			lastAnswer,
			askedQuestions,
		} = body;

		const prompt = `
You are a senior technical interviewer conducting a realistic mock interview.

Interview Track:
${trackName} (${category})

Current Question:
${questionIndex + 1} of ${totalQuestions}

Previous Candidate Answer:
${lastAnswer || "No previous answer yet."}

Previously Asked Questions:
${
	askedQuestions?.length
		? askedQuestions.map((q: string) => `- ${q}`).join("\n")
		: "None"
}

Rules:
- Ask ONLY ONE interview question
- NEVER repeat previous questions
- Increase difficulty gradually
- Focus on a new concept each time
- Keep questions concise and professional
- No numbering
- No markdown
- No explanations
`;

		try {
			const response = await client.responses.create({
				model: "openai/gpt-oss-20b",
				input: prompt,
			});
			console.log(response.output_text);

			const question = response.output_text?.trim() || randomFallbackQuestion();

			return NextResponse.json({
				question,
			});
		} catch (err) {
			console.error("AI generation failed:", err);

			return NextResponse.json({
				question: randomFallbackQuestion(),
			});
		}
	} catch (error) {
		console.error("API Error:", error);

		return NextResponse.json(
			{
				error: "Failed to generate question",
			},
			{
				status: 500,
			},
		);
	}
}
