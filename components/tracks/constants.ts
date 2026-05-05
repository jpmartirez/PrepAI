import { Code2, Database, GraduationCap, MessageSquare } from "lucide-react";
import { InterviewTrack } from "./types";

export const interviewTracks: InterviewTrack[] = [
	{
		id: 1,
		title: "Frontend Dev",
		tag: "Engineering",
		description:
			"React, TypeScript, CSS, performance optimization, and system design for UI-heavy roles.",
		duration: "40 min",
		technologies: ["React", "TypeScript"],
		icon: Code2,
	},
	{
		id: 2,
		title: "Backend Dev",
		tag: "Engineering",
		description:
			"APIs, databases, microservices, distributed systems, and algorithmic deep-dives.",
		duration: "45 min",
		technologies: ["Node.js", "SQL"],
		icon: Database,
	},
	{
		id: 3,
		title: "Internships",
		tag: "Entry Level",
		description:
			"Tailored for CS students. Core fundamentals, OOP, and project walkthroughs.",
		duration: "30 min",
		technologies: ["DSA", "OOP"],
		icon: GraduationCap,
	},
	{
		id: 4,
		title: "Behavioral",
		tag: "Soft Skills",
		description:
			"STAR method practice for leadership, collaboration, conflict resolution, and growth stories.",
		duration: "35 min",
		technologies: ["STAR", "Leadership"],
		icon: MessageSquare,
	},
];
