"use client"

import { Menu, MenuIcon } from "lucide-react"
import { Button, buttonVariants } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { routes } from "@/lib/data"
import Logo from "../Logo"
import Link from "next/link"

function MobileSidebar() {
	const [isOpen, setOpen] = useState(false)
	const pathName = usePathname()
	const activeRoute = routes.find((route) => route.href.length > 0 && pathName.includes(route.href)) || routes[0]
	return (
		<div className="block border-separate bg-background md:hidden">
			<nav className="container flex items-center justify-between px-8">
				<Sheet open={isOpen} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon">
							<MenuIcon/>
						</Button>
					</SheetTrigger>
					<SheetContent className="w-[400px] sm:w-[540px] space-y-4" side={"left"}>
						<Logo/>
						<div className="flex flex-col gap-1">
						{routes.map((route) => (
					<Link
						key={route.href} href={route.href} className={buttonVariants({
							variant: route.href === activeRoute.href ? "sidebarItemActive" : "sidebarItem",
						})}
						onClick={() => setOpen((prev) => !prev)}
						>
						<route.icon size={20} />
						{route.label}
					</Link>
				))}
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</div>
	)
}
export default MobileSidebar