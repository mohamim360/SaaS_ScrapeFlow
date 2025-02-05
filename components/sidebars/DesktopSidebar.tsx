"use client"

import Logo from "../Logo"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { usePathname } from "next/navigation"
import { routes } from "@/lib/data"

function DesktopSidebar() {
	const pathName = usePathname()
	const activeRoute = routes.find((route) => route.href.length > 0 && pathName.includes(route.href)) || routes[0]
	return (
		<div className="hidden relative md:block min-w-[280px] max-w-[280px] w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
			<div className=" flex items-center justify-center gap-2 border-b-[1px]  p-4 border-separate">
				<Logo />
			</div>
			<div className="p-2">TODO CREDITS</div>
			<div className="flex flex-col p-2">
				{routes.map((route) => (
					<Link
						key={route.href} href={route.href} className={buttonVariants({
							variant: route.href === activeRoute.href ? "sidebarItemActive" : "sidebarItem",
						})}>
						<route.icon size={20} />
						{route.label}
					</Link>
				))}
			</div>
		</div>
	)
}
export default DesktopSidebar