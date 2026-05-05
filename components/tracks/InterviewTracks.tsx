"use client";

import { Play } from "lucide-react";
import { interviewTracks } from "./constants";
import Link from "next/link";

export default function InterviewTracks() {
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
				{interviewTracks.map((track) => {
					const Icon = track.icon;

					return (
						<div key={track.id} className="interview-card group">
							{/* Glow Effect */}
							<div
								className="
									absolute inset-0 opacity-0
									group-hover:opacity-100
									transition-opacity duration-300
									bg-linear-to-br
									from-emerald-500/5
									via-transparent
									to-transparent
									pointer-events-none
								"
							/>

							{/* Icon */}
							<div className="card-icon-wrap transition-all duration-300 group-hover:scale-110">
								<Icon size={24} strokeWidth={1.8} className="text-brand" />
							</div>

							{/* Tag */}
							<div className="badge badge-neutral mb-4">{track.tag}</div>

							{/* Title */}
							<h3
								className="
									heading-sm text-white
									transition-colors duration-300
									group-hover:text-brand
								"
							>
								{track.title}
							</h3>

							{/* Description */}
							<p className="body-sm text-muted-ai mt-3">{track.description}</p>

							{/* Meta Chips */}
							<div className="mt-5 flex flex-wrap gap-2">
								{track.technologies.map((tech) => (
									<span key={tech} className="meta-chip">
										{tech}
									</span>
								))}

								<span className="badge badge-emerald">{track.duration}</span>
							</div>

							{/* Button */}
							<button
								className="
									btn-primary
									mt-6
									relative z-10
								"
							>
								<Play size={14} fill="currentColor" />
								Start Interview
							</button>
						</div>
					);
				})}
			</div>
		</section>
	);
}
