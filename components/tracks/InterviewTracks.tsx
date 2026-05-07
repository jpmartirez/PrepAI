"use client";

import Link from "next/link";
import TrackCard from "./TrackCard";
import Track from "./types";

export default function InterviewTracks({ tracks }: { tracks: Track[] }) {
	return (
		<section className="secondary-wrapper animate-fade-in-up">
			<div className="flex items-center gap-2 mb-6">
				<p className="label-sm text-brand">Choose Your Interview Track</p>

				<Link
					href="/tracks"
					className="ml-auto text-xs text-muted-ai hover:text-white transition-colors"
				>
					View All Tracks
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
				{tracks
					.filter((t) => t.isPro)
					.slice(0, 4)
					.map((track) => (
						<TrackCard key={track.id} track={track} />
					))}
			</div>
		</section>
	);
}
