"use client"

import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { useReactFlow } from "@xyflow/react"
import { CheckIcon } from "lucide-react"
import { toast } from "sonner"

function SaveBtn({ workflowId }: { workflowId: string }) {
	const { toObject } = useReactFlow()

	const saveMutation = useMutation({
		mutationFn: UpdateWorkflow,
		onSuccess: () => {
			toast.success("Workflow saved successfully", { id: "save-workflow" })
		},
		onError: (error) => {
			toast.error(error.message ?? "Something went wrong while saving the workflow", { id: "save-workflow" })
		},
	})
	return (
		<Button
			variant={"outline"}
			className="flex items-center gap-2"
			onClick={() => {
				const workflowDefination = JSON.stringify(toObject())
				toast.loading("Saving workflow...", { id: "save-workflow" })
				saveMutation.mutate({
					id: workflowId,
					definition: workflowDefination,
				})
			}}
		>
			<CheckIcon size={16} className="stroke-blue-500" />
			Save
		</Button>
	)
}
export default SaveBtn