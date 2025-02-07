"use client"

import { cn } from "@/lib/utils"
import { DialogTitle } from "@radix-ui/react-dialog"
import { LucideIcon } from "lucide-react"

interface Props {
	icon?: LucideIcon
	title?: string
	subTitle?: string

	iconClassName?: string
	titleClassName?: string
	subTitleClassName?: string

}
function CustomDialogHeader(props: Props) {
	return (
		<DialogTitle asChild>
			<div className="flex flex-col items-center gap-2 mb-2">
				{props.icon && <props.icon className={cn("stroke-primary", props.iconClassName)} />}
				{props.title && <p className={cn("text-xl text-primary", props.titleClassName)}>{props.title}</p>}
				{props.subTitle && <p className={cn("text-muted-foreground text-sm", props.subTitleClassName)}>{props.subTitle}</p>}
			</div>
		</DialogTitle>
	)
}
export default CustomDialogHeader