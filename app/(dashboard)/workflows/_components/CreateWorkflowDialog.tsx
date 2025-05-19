"use client"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Layers2Icon, Loader2 } from "lucide-react"
import CustomDialogHeader from "@/components/CustomDialogHeader"
import { FormProvider, useForm } from "react-hook-form"
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workFlow"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { createWorkflow } from "@/actions/workflows/createWorkflow"

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
	const [open, setOpen] = useState(false)

	const form = useForm<createWorkflowSchemaType>({
		resolver: zodResolver
			(createWorkflowSchema),
		defaultValues: {}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: createWorkflow,
		onSuccess: () => {
			toast.success("Workflow created successfully", { id: "create-workflow" })
		},
		onError: () => {
			toast.error("Failed to create workflow", { id: "create-workflow" })
		},
		onSettled: () => {
			console.log("Mutation completed");
		}
	})

	const onSubmit = useCallback((values: createWorkflowSchemaType) => {
		values.name = values.name.trim();
		toast.loading("Creating workflow...", { id: "create-workflow" })
		mutate(values)
	}, [mutate])
	return (
		<Dialog open={open} onOpenChange={(open) => {
			form.reset();
			setOpen(open)
		}}>
			<DialogTrigger asChild>
				<Button>{triggerText ?? "Create Workflow"}</Button>
			</DialogTrigger>
			<DialogContent className="px-0">
				<CustomDialogHeader
					icon={Layers2Icon}
					title="Create Workflow"
					subTitle="Start building your workflow" />
				<div className="p-6">
					<FormProvider {...form}>
						<form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex gap-1 items-center">
											Name
											{form.formState.errors.name ? (
												<p className="text-xs text-muted-foreground">({form.formState.errors.name.message})</p>
											): (<p>(required)</p>)}
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>
											Choose a description and unique name for your workflow
										</FormDescription>
									</FormItem>
								)}
							/>
							{/* description */}
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex gap-1 items-center">
											Description
											<p className="text-xs text-muted-foreground">(optional)</p>
										</FormLabel>
										<FormControl>
											<Textarea className="resize-none" {...field} />
										</FormControl>
										<FormDescription>
											Provide a brief description for your workflow
										</FormDescription>
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full" disabled={isPending}>
								{!isPending && "Proceed"}
								{isPending && <Loader2 className="animate-spin" />}
							</Button>
						</form>
					</FormProvider>
				</div>
			</DialogContent>
		</Dialog>
	)
}
export default CreateWorkflowDialog