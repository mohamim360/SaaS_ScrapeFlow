"use client"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import { Button } from "@/components/ui/button"

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{triggerText ?? "Create Workflow"}</Button>
			</DialogTrigger>
		</Dialog>
	)
}
export default CreateWorkflowDialog