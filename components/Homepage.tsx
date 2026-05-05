import React from "react";
import InterviewTracks from "./tracks/InterviewTracks";

const Homepage = () => {
	return (
		<main className="wrapper flex flex-col items-center justify-center gap-5 ">
			<section className="text-center pt-4 animate-scale-in">
				<div className="hero-badge mx-auto mb-5 w-fit">
					<span
						className="w-1.5 h-1.5 rounded-full"
						style={{
							background: "var(--emerald)",
							animation: "pulse 2s infinite",
						}}
						aria-hidden="true"
					/>
					AI-Powered Mock Interviews
				</div>

				<h1 className="hero-title mb-4 max-w-2xl mx-auto">
					Master Your Next <br /> Interview with{" "}
					<em className="animate-blink">AI.</em>
				</h1>
				<p className="hero-subtitle max-w-lg mx-auto mb-8">
					Practice real-world scenarios for your dream tech role.
				</p>
			</section>

			{/* Statistics */}
			<div className="stat-row animate-scale-in">
				<div className="stat-item">
					<div className="stat-val">50k+</div>
					<div className="stat-label">Interviews Completed</div>
				</div>

				<div className="stat-item">
					<div className="stat-val">94%</div>
					<div className="stat-label">User Satisfaction</div>
				</div>

				<div className="stat-item">
					<div className="stat-val">12</div>
					<div className="stat-label">Interview Tracks</div>
				</div>
			</div>

			<InterviewTracks />
		</main>
	);
};

export default Homepage;
