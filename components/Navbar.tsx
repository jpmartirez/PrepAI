"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Hamburger from "./navbar/hamburger";
import Logo from "./navbar/logo";
import { NavbarProps } from "./navbar/types";
import { NAV_ITEMS } from "./navbar/constants";
import LiveBadge from "./navbar/livebadge";

// ── Desktop Nav Links ─────────────────────────────────────────────────────────

function DesktopLinks({ pathname }: { pathname: string }) {
	return (
		<nav
			className="hidden md:flex items-center gap-1"
			aria-label="Main navigation"
		>
			{NAV_ITEMS.map(({ label, href }) => {
				const active =
					pathname === href || (href !== "/" && pathname.startsWith(href));
				return (
					<Link
						key={href}
						href={href}
						className={[
							"nav-link-base px-3 py-1.5 rounded-lg",
							active ? "nav-link-active" : "hover:bg-white/5",
						].join(" ")}
					>
						{label}
					</Link>
				);
			})}
		</nav>
	);
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────

function MobileMenu({
	open,
	pathname,
	onClose,
}: {
	open: boolean;
	pathname: string;
	onClose: () => void;
}) {
	if (!open) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-40 md:hidden"
				onClick={onClose}
				aria-hidden="true"
			/>
			<div
				className="fixed top-(--navbar-height) left-0 right-0 z-50 md:hidden"
				style={{
					backgroundColor: "rgba(17,24,39,0.97)",
					backdropFilter: "blur(16px)",
					borderBottom: "1px solid var(--border-subtle)",
				}}
			>
				<nav className="wrapper py-3 flex flex-col gap-1">
					{NAV_ITEMS.map(({ label, href }) => {
						const active =
							pathname === href || (href !== "/" && pathname.startsWith(href));
						return (
							<Link
								key={href}
								href={href}
								onClick={onClose}
								className={[
									"px-4 py-3 rounded-xl text-sm font-medium transition-colors",
									active
										? "text-emerald) bg-(--emerald-glow-soft)"
										: "text-(--text-muted) hover:text-(--text-primary) hover:bg-white/5",
								].join(" ")}
							>
								{label}
							</Link>
						);
					})}
				</nav>
			</div>
		</>
	);
}

// ── Main Navbar ───────────────────────────────────────────────────────────────

export default function Navbar({
	isLiveSession = true,
}: NavbarProps & { isLiveSession?: boolean }) {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<>
			<header className="nav-wrapper" role="banner">
				<div className="nav-inner">
					{/* ── Left: Logo ── */}
					<Logo />

					{/* ── Center: Desktop nav ── */}
					<DesktopLinks pathname={pathname} />

					{/* ── Right: Actions ── */}
					<div className="flex items-center gap-3">
						{/* Live session badge */}
						{isLiveSession && <LiveBadge />}

						{/* PUT CLERK USER SIGNIN BUTTON */}

						{/* Mobile hamburger */}
						<Hamburger
							open={mobileOpen}
							onClick={() => setMobileOpen((v) => !v)}
						/>
					</div>
				</div>
			</header>

			{/* Mobile slide-down menu */}
			<MobileMenu
				open={mobileOpen}
				pathname={pathname}
				onClose={() => setMobileOpen(false)}
			/>
		</>
	);
}
