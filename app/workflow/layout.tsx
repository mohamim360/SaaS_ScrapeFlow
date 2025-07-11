import Logo from "@/components/Logo"
import { ModeToggle } from "@/components/ThemeModelToggle"
import { Separator } from "@/components/ui/separator"

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="flex flex-col h-screen w-full">
			{children}
			<Separator />
			<footer
				className="flex items-center justify-between p-2">
				<Logo
					iconSize={16}
					fontSize="text-xl" />
				<ModeToggle />
			</footer>
		</div>
	)
}
export default layout