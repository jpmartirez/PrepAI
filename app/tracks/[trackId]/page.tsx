import { prisma } from "@/lib/prisma";
import { InterviewRoomContent } from "./InterviewRoomContent";

export default async function Page({
	params,
}: {
	params: Promise<{ trackId: string }>;
}) {
	const { trackId } = await params;

	const track = await prisma.track.findUnique({
		where: { id: trackId },
	});

	if (!track) {
		return null;
	}

	return <InterviewRoomContent track={track} />;
}
