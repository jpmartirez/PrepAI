import React from "react";
import InterviewTracks from "./tracks/InterviewTracks";

const Homepage = () => {
	return (
		<main className="wrapper flex flex-col items-center justify-center gap-5 ">
			{/* Badge */}
			<div className="badge badge-emerald flex items-center gap-2 animate-breathe">
				<span className="logo-dot" aria-hidden="true" />
				<p className="label-sm">AI-Powered Mock Interviews</p>
			</div>

			{/* Header */}
			<h1 className="hero-title animate-scale-in">
				Master Your Next <br /> Interview with{" "}
				<span className="text-brand animate-blink">AI.</span>
			</h1>

			{/* Sub-header */}
			<p className="hero-subtitle animate-scale-in">
				Practice real-world scenarios for your dream tech role.
			</p>

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
