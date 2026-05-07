import Link from "next/link";
import Track from "./types";
import { DIFFICULTY_COLORS } from "./constants";
import { ICONS } from "@/lib/icons";
import { Code2 } from "lucide-react";

export default function TrackCard({ track }: { track: Track }) {
	const diff = DIFFICULTY_COLORS[track.difficulty];

	const Icon = ICONS[track.icon] || Code2;

	return (
		<Link
			href={track.isPro ? "/pricing" : `/tracks/${track.id}`}
			className="interview-card group flex flex-col h-full"
		>
			{/* Badges row */}
			<div className="flex items-center gap-2 mb-4 flex-wrap">
				{track.popular && (
					<span className="badge badge-emerald text-[10px]">Popular</span>
				)}
				{track.isNew && (
					<span className="badge badge-info text-[10px]">New</span>
				)}
				{track.isPro && (
					<span
						className="badge text-[10px]"
						style={{
							background: "rgba(139,92,246,0.12)",
							border: "1px solid rgba(139,92,246,0.25)",
							color: "#A78BFA",
						}}
					>
						Pro
					</span>
				)}
			</div>

			{/* Icon */}
			<div className="card-icon-wrap mb-4" style={{ color: "var(--emerald)" }}>
				<Icon />
			</div>

			{/* Category label */}
			<p className="label-sm mb-1.5" style={{ color: "var(--text-faint)" }}>
				{track.category}
			</p>

			{/* Name */}
			<h3
				className="text-base font-semibold mb-2 leading-snug"
				style={{
					fontFamily: "var(--font-geist), Geist, sans-serif",
					color: "var(--text-primary)",
				}}
			>
				{track.name}
			</h3>

			{/* Description */}
			<p
				className="text-sm mb-4 leading-relaxed flex-1"
				style={{
					color: "var(--text-muted)",
					fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
					fontWeight: 300,
				}}
			>
				{track.description}
			</p>

			{/* Tags */}
			<div className="flex flex-wrap gap-1.5 mb-5">
				{track.tags.slice(0, 3).map((tag) => (
					<span key={tag} className="meta-chip">
						{tag}
					</span>
				))}
			</div>

			{/* Meta row */}
			<div
				className="flex items-center justify-between pt-4"
				style={{ borderTop: "1px solid var(--border-subtle)" }}
			>
				<div
					className="flex items-center gap-3 text-xs"
					style={{ color: "var(--text-faint)" }}
				>
					<span className="flex items-center gap-1">
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="10" />
							<polyline points="12 6 12 12 16 14" />
						</svg>
						{track.duration}
					</span>
					<span className="flex items-center gap-1">
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
							<polyline points="14 2 14 8 20 8" />
						</svg>
						{track.questions}Q
					</span>
					<span>{(track.completions / 1000).toFixed(1)}k done</span>
				</div>
				<span
					className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
					style={{ background: diff.bg, color: diff.color }}
				>
					{track.difficulty}
				</span>
			</div>

			{/* CTA */}
			<div
				className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
				style={{
					background: "var(--emerald)",
					color: "#fff",
					fontFamily: "var(--font-ibm-plex-sans), IBM Plex Sans, sans-serif",
				}}
			>
				{track.isPro ? (
					<>
						<svg
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
							<path d="M7 11V7a5 5 0 0 1 10 0v4" />
						</svg>
						Unlock with Pro
					</>
				) : (
					<>
						<svg
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<polygon points="5 3 19 12 5 21 5 3" />
						</svg>
						Start Interview
					</>
				)}
			</div>
		</Link>
	);
}
