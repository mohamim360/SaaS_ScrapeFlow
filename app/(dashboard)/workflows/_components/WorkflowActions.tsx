"use client"

import TooltipWrapper from "@/components/TooltipWrapper"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import DeleteWorkflowDialog from "./DeleteWorkflowDialog"

function WorkflowActions({workflowName} : {workflowName: string}) {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	console.log(setShowDeleteDialog);
	return (
		<>
			<DeleteWorkflowDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} 
			workflowName={workflowName}/>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"outline"} size={"sm"}>
						<TooltipWrapper content={"More Actions"}>
							<div className="flex items-center justify-center w-full h-full">
								<MoreHorizontalIcon size={18} />
							</div>
						</TooltipWrapper>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive flex items-center gap-2"
						onSelect={() => { setShowDeleteDialog((prev) => !prev) }}
					>
						<TrashIcon size={16} />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
export default WorkflowActions