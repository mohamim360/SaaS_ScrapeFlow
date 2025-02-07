"use client"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Layers2Icon } from "lucide-react"
import CustomDialogHeader from "@/components/CustomDialogHeader"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { createWorkflowSchema } from "@/schema/workFlow"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
	const [open, setOpen] = useState(false)

	const form = useForm<z.infer<typeof createWorkflowSchema>>({
		resolver: zodResolver
		(createWorkflowSchema),
		defaultValues: {}
	})

	return (
		<Dialog open={open} onOpenChange={setOpen}>
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
							<form className="space-y-8 w-full">
								<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex gap-1 items-center">
											Name
											<p className="text-xs text-muted-foreground">(required)</p>
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

								<Button type="submit" className="w-full">Proceed</Button>
							</form>
						</FormProvider>
					</div>
			</DialogContent>
		</Dialog>
	)
}
export default CreateWorkflowDialog