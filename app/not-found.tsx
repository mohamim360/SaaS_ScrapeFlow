import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"


function NotFoundPage() {
	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<div className="text-center">
				<h1 className=" text-6xl font-bold text-primary mb-4">404</h1>
				<p className="text-xl text-muted-foreground ">Page Not Found</p>
				<div className="flex items-center gap-2 mt-4">
					<Link href={"/"} className="flex items-center gap-2 text-accent-foreground">
					<ArrowLeftIcon size={20} className="stroke-current text-accent-foreground" />
					Back to Dashboard
					</Link>
				</div>
			</div>
		</div>
	)
}
export default NotFoundPage