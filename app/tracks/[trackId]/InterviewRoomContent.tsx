"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Imports from your new module structure
import { useInterviewSession } from "@/components/interview/hooks/useInterviewSession";
import { ConfirmEndModal } from "@/components/interview/ConfirmEndModal";
import { IdleScreen } from "@/components/interview/IdleScreen";
import { LoadingScreen } from "@/components/interview/LoadingScreen";
import { ActiveInterviewRoom } from "@/components/interview/ActiveInterviewRoom";
import { EndedScreen } from "@/components/interview/EndedScreen";
import Track from "@/components/tracks/types";

export function InterviewRoomContent({ track }: { track: Track }) {
	const router = useRouter();

	const [showConfirmEnd, setShowConfirmEnd] = useState(false);

	// Redirect unknown tracks
	useEffect(() => {
		if (!track) router.replace("/tracks");
	}, [track, router]);

	const {
		state,
		speechSupported,
		startSession,
		submitAndNext,
		endSession,
		toggleMute,
	} = useInterviewSession({ track: track as Track });

	if (!track) return null;

	const { status, currentQIndex } = state;
	const isActiveOrProcessing =
		status === "asking" || status === "answering" || status === "processing";
	const progressPct =
		track.questions > 0 ? (currentQIndex / track.questions) * 100 : 0;

	return (
		<>
			{showConfirmEnd && (
				<ConfirmEndModal
					onConfirm={() => {
						setShowConfirmEnd(false);
						endSession();
					}}
					onCancel={() => setShowConfirmEnd(false)}
				/>
			)}

			<style>{`
                @keyframes progpulse { 0%,100%{width:40%} 50%{width:80%} }
            `}</style>

			<main
				className=""
			>
				<div className="wrapper" style={{ paddingBottom: 40 }}>
					{/* Header Details */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: 20,
						}}
					>
						<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
							<Link
								href="/tracks"
								style={{
									width: 36,
									height: 36,
									borderRadius: 10,
									flexShrink: 0,
									background: "var(--bg-secondary)",
									border: "1px solid var(--border-subtle)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
								aria-label="Back to tracks"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="var(--text-muted)"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="19" y1="12" x2="5" y2="12" />
									<polyline points="12 19 5 12 12 5" />
								</svg>
							</Link>
							<div>
								<p
									style={{
										fontSize: 10,
										textTransform: "uppercase",
										letterSpacing: "0.12em",
										color: "var(--text-faint)",
										marginBottom: 2,
									}}
								>
									{track.category}
								</p>
								<h1
									style={{
										fontFamily: "var(--font-geist), Geist, sans-serif",
										fontSize: 15,
										fontWeight: 600,
										color: "var(--text-primary)",
									}}
								>
									{track.name}
								</h1>
							</div>
						</div>

						{/* Right Context Controls */}
						<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
							{isActiveOrProcessing && (
								<button
									onClick={() => setShowConfirmEnd(true)}
									className="btn-secondary"
									style={{ padding: "7px 16px", fontSize: 13 }}
								>
									End &amp; Submit
								</button>
							)}
						</div>
					</div>

					{/* Progress Bar */}
					{isActiveOrProcessing && (
						<div
							style={{
								height: 3,
								background: "var(--bg-tertiary)",
								borderRadius: 2,
								overflow: "hidden",
								marginBottom: 20,
							}}
						>
							<div
								style={{
									height: "100%",
									borderRadius: 2,
									background: "var(--emerald)",
									width: `${progressPct}%`,
									transition: "width 0.6s ease",
								}}
							/>
						</div>
					)}

					{/* Content Router */}
					{status === "idle" && (
						<IdleScreen
							track={track}
							onStart={startSession}
							speechSupported={speechSupported}
						/>
					)}
					{status === "loading" && <LoadingScreen />}
					{status === "processing" && (
						<LoadingScreen label="Analysing your answer…" />
					)}
					{isActiveOrProcessing && status !== "processing" && (
						<ActiveInterviewRoom
							track={track}
							state={state}
							onNext={() => {
								if (state.status === "asking" || state.status === "answering") {
									submitAndNext();
								}
							}}
							onEnd={() => setShowConfirmEnd(true)}
							onToggleMute={toggleMute}
						/>
					)}
					{status === "ended" && <EndedScreen />}
				</div>
			</main>
		</>
	);
}
