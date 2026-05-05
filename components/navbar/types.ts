// ── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
	label: string;
	href: string;
}

export interface NavbarUser {
	firstName?: string | null;
	lastName?: string | null;
	imageUrl?: string | null;
	emailAddresses?: { emailAddress: string }[];
}

export interface NavbarProps {
	user?: NavbarUser | null;
	onSignOut?: () => void;
	isLiveSession?: boolean;
}