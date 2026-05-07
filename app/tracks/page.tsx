import { prisma } from "@/lib/prisma";
import TracksPage from "./TrackPage";
import { Category, Difficulty } from "@/components/tracks/types";

export default async function page() {
	const tracks = await prisma.track.findMany();

	const typedTracks = tracks.map((t) => ({
		...t,
		difficulty: t.difficulty as Difficulty,
		category: t.category as Category,
	}));

	return (
		<div>
			<TracksPage tracks={typedTracks} />
		</div>
	);
}
