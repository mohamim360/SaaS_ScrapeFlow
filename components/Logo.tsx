import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";

function Logo({ fontSize = "text-2xl", iconSize = 20 }: { fontSize?: string, iconSize?: number }) {
	return (
		<Link href="/" className={cn("flex items-center gap-2 text-2xl font-extrabold", fontSize)}>
			<div className="rounded-xl bg-gradient-to-r from-zinc-500 to-zinc-600 p-2">
				<SquareDashedMousePointer size={iconSize} className="stroke-white" />
			</div>
			<div>
				<span className="bg-gradient-to-r from-zinc-500 to-zinc-600 bg-clip-text text-transparent">
					Flow
				</span>
				<span className="text-stone-700 dark:text-stone-300">
					Scrape
				</span>
			</div>
		</Link>
	)
}
export default Logo