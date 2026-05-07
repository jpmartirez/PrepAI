export type Category =
	| "All"
	| "Engineering"
	| "Behavioral"
	| "System Design"
	| "Entry Level"
	| "Specialized";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export default interface Track {
	id: string;
	name: string;
	category: string;
	difficulty: Difficulty;
	description: string;
	duration: string;
	questions: number;
	tags: string[];
	icon: string;
	isPro?: boolean;
	isNew?: boolean;
	popular?: boolean;
	completions: number;
}
