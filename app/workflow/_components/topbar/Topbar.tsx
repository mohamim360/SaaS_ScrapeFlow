"use client"

import TooltipWrapper from "@/components/TooltipWrapper"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import SaveBtn from "./SaveBtn"

interface TopbarProps {
	title: string
	subtitle?: string
	workflowId: string
}

function Topbar({ title, subtitle, workflowId }: TopbarProps) {
	const Router = require("next/navigation").useRouter()
	return (
		<header className="flex border-p-2 p-2 border-separate justify-between w-full sticky top-0 z-10 bg-background">
			<div className="flex gap-1 flex-1">
				<TooltipWrapper content="back">
					<Button variant={"ghost"} size={"icon"} onClick={() => Router.back()}>
						<ChevronLeftIcon size={20} />
					</Button>
				</TooltipWrapper>
				<div>

					<p className="font-bold text-ellipsis truncate">
						{title}
					</p>

					{subtitle && <p className="text-xs text-muted-foreground truncate text-ellipsis">{subtitle}</p>}

				</div>
			</div>

			<div className="flex gap-1 justify-end">
				<SaveBtn workflowId={workflowId} />
			</div>
		</header>
	)
}
export default Topbar