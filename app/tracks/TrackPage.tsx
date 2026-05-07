"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CATEGORIES, DIFFICULTIES } from "@/components/tracks/constants";
import Track, { Category, Difficulty } from "@/components/tracks/types";
import SearchBar from "@/components/tracks/SearchBar";
import FilterPill from "@/components/tracks/FilterPill";
import TrackCard from "@/components/tracks/TrackCard";

export default function TracksPage({ tracks }: { tracks: Track[] }) {
	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState<Category | string>(
		"All",
	);
	const [activeDifficulty, setActiveDifficulty] = useState<
		Difficulty | "All" | string
	>("All");

	const filtered = useMemo(() => {
		return tracks.filter((t) => {
			const matchesCategory =
				activeCategory === "All" || t.category === activeCategory;
			const matchesDifficulty =
				activeDifficulty === "All" || t.difficulty === activeDifficulty;
			const q = search.toLowerCase();
			const matchesSearch =
				!q ||
				t.name.toLowerCase().includes(q) ||
				t.description.toLowerCase().includes(q) ||
				t.tags.some((tag) => tag.toLowerCase().includes(q));
			return matchesCategory && matchesDifficulty && matchesSearch;
		});
	}, [search, activeCategory, activeDifficulty, tracks]);

	const freeCount = tracks.filter((t) => !t.isPro).length;
	const proCount = tracks.filter((t) => t.isPro).length;

	return (
		<main className="">
			<div className="wrapper">
				{/* ── Hero ── */}
				<section className="text-center pt-4 pb-12">
					<div className="hero-badge mx-auto mb-5 w-fit animate-breathe">
						<span
							className="w-1.5 h-1.5 rounded-full"
							style={{
								background: "var(--emerald)",
								animation: "pulse 2s infinite",
							}}
							aria-hidden="true"
						/>
						{tracks.length} interview tracks available
					</div>
					<h1 className="hero-title mb-4 max-w-2xl mx-auto">
						Choose your <em>track.</em>
						<br />
						Start practicing today.
					</h1>
					<p className="hero-subtitle max-w-lg mx-auto">
						From entry-level internships to senior system design — every track
						simulates real interview conditions with tailored AI feedback.
					</p>

					{/* Quick stats */}
					<div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
						{[
							{ val: `${freeCount} Free`, label: "tracks included" },
							{ val: `${proCount} Pro`, label: "tracks unlocked" },
							{ val: "50k+", label: "sessions completed" },
						].map(({ val, label }) => (
							<div key={label} className="text-center">
								<div
									className="text-lg font-bold"
									style={{
										fontFamily: "var(--font-geist), Geist, sans-serif",
										color: "var(--text-primary)",
									}}
								>
									{val}
								</div>
								<div className="text-xs" style={{ color: "var(--text-faint)" }}>
									{label}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* ── Filter Bar ── */}
				<section className="mb-8" aria-label="Filter tracks">
					{/* Top row: search + difficulty */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
						<SearchBar value={search} onChange={setSearch} />

						{/* Difficulty filter */}
						<div className="flex items-center gap-2 flex-wrap">
							<span className="text-xs" style={{ color: "var(--text-faint)" }}>
								Difficulty:
							</span>
							{DIFFICULTIES.map((d) => (
								<FilterPill
									key={d}
									label={d}
									active={activeDifficulty === d}
									onClick={() => setActiveDifficulty(d)}
								/>
							))}
						</div>
					</div>

					{/* Category pills */}
					<div className="flex items-center gap-2 flex-wrap">
						{CATEGORIES.map((cat) => (
							<FilterPill
								key={cat}
								label={cat}
								active={activeCategory === cat}
								onClick={() => setActiveCategory(cat)}
							/>
						))}
					</div>
				</section>

				{/* ── Results count ── */}
				<div className="flex items-center justify-between mb-6">
					<p className="text-sm" style={{ color: "var(--text-faint)" }}>
						{filtered.length === tracks.length
							? `Showing all ${tracks.length} tracks`
							: `${filtered.length} track${filtered.length !== 1 ? "s" : ""} found`}
					</p>
					{(search ||
						activeCategory !== "All" ||
						activeDifficulty !== "All") && (
						<button
							onClick={() => {
								setSearch("");
								setActiveCategory("All");
								setActiveDifficulty("All");
							}}
							className="text-xs flex items-center gap-1.5 transition-colors"
							style={{ color: "var(--emerald)" }}
						>
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
							Clear filters
						</button>
					)}
				</div>

				{/* ── Grid ── */}
				{filtered.length > 0 ? (
					<section
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20"
						aria-label="Interview tracks"
					>
						{filtered.map((track) => (
							<TrackCard key={track.id} track={track} />
						))}
					</section>
				) : (
					<div className="text-center py-24 mb-20">
						<div
							className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
							style={{
								background: "var(--bg-secondary)",
								border: "1px solid var(--border-subtle)",
							}}
						>
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--text-faint)"
								strokeWidth="1.8"
								aria-hidden="true"
							>
								<circle cx="11" cy="11" r="8" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
						</div>
						<h3 className="heading-sm mb-2">No tracks found</h3>
						<p className="body-sm" style={{ color: "var(--text-muted)" }}>
							Try a different search term or clear your filters.
						</p>
						<button
							onClick={() => {
								setSearch("");
								setActiveCategory("All");
								setActiveDifficulty("All");
							}}
							className="btn-secondary mt-5 mx-auto"
						>
							Clear all filters
						</button>
					</div>
				)}

				{/* ── Pro upsell banner ── */}
				<section
					className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-8 relative overflow-hidden"
					style={{
						background: "linear-gradient(145deg, #1a2f28, #111827)",
						border: "1px solid var(--border-em)",
					}}
				>
					<div
						aria-hidden="true"
						className="absolute inset-0 pointer-events-none"
						style={{
							background:
								"radial-gradient(ellipse at 0% 50%, rgba(16,185,129,0.1), transparent 60%)",
						}}
					/>

					<div className="relative z-10">
						<div className="hero-badge mb-4 w-fit">
							<span
								style={{
									background: "rgba(139,92,246,0.15)",
									border: "1px solid rgba(139,92,246,0.3)",
									color: "#A78BFA",
								}}
								className="badge text-xs"
							>
								Pro Plan
							</span>
						</div>
						<h2 className="heading-md mb-2">
							Unlock {proCount} more advanced tracks
						</h2>
						<p
							className="body-sm max-w-md"
							style={{ color: "var(--text-muted)" }}
						>
							System Design, Full Stack, Security, ML, DevOps and more. Get
							unlimited sessions with advanced AI scoring from $15/mo.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10">
						<Link
							href="/pricing"
							className="btn-primary px-7 py-3 text-sm whitespace-nowrap"
						>
							View pricing
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<line x1="5" y1="12" x2="19" y2="12" />
								<polyline points="12 5 19 12 12 19" />
							</svg>
						</Link>
						<Link
							href="/sign-up"
							className="btn-secondary px-7 py-3 text-sm whitespace-nowrap"
						>
							Start free
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
