export function parseDurationToMinutes(duration: string): number {
	if (!duration) return 0;

	// normalize string
	const cleaned = duration.toLowerCase().trim();

	// match patterns like:
	// "40 mns", "40 mins", "40 min", "40 minutes"
	const match = cleaned.match(/(\d+)/);

	if (!match) return 0;

	return parseInt(match[1], 10);
}

export function computeTimePerQuestion(
	duration: string, // 👈 now string from Supabase
	totalQuestions: number,
) {
	const minutes = parseDurationToMinutes(duration);
	const totalSeconds = minutes * 60;

	if (!totalQuestions) return 60;

	return Math.floor(totalSeconds / totalQuestions);
}
