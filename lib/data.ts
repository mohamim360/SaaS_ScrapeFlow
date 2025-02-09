import { CoinsIcon, HomeIcon, LayoutIcon, ShieldIcon } from "lucide-react"
export const routes = [
	{
		href: "/",
		label: "Home",
		icon: HomeIcon,
	},
	{
		href: "/workflows",
		label: "Workflows",
		icon: LayoutIcon,
	},
	{
		href: "/credentials",
		label: "Credentials",
		icon: ShieldIcon,
	},
	{
		href: "/billing",
		label: "Billing",
		icon: CoinsIcon,
	}
]