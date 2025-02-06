import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Suspense } from "react"

function page() {
	return (
		<div className="flex-1 flex flex-col h-full">
			<div className="flex justify-between">
				<div className="flex flex-col">
					<h1 className="text-3xl font-bold">Workflows</h1>
					<p className="text-muted-foreground">Manage your workflows</p>
				</div>
			</div>

			<div className="h-full py-6">
				<Suspense fallback={<UserWorkflowSkeleton />}>
					<UserWorkflows />
				</Suspense>
			</div>
		</div>
	)
}

function UserWorkflowSkeleton() {
	return (
		<div className="space-y-2">
			{[1, 2, 3, 4].map((i) => (
				<Skeleton key={i} className="h-32 w-full" />
			))}
		</div>
	)
}

async function UserWorkflows() {
	const workflows = await GetWorkflowsForUser()
	if (!workflows) {
		return (
			<Alert variant={"destructive"}>
				<AlertCircle className="w-4 h-4"/>
				<AlertTitle>Failed to fetch workflows</AlertTitle>
				<AlertDescription>There was an error fetching your workflows. Please try again later.</AlertDescription>
			</Alert>
		)
	}
	return (
		<div>

		</div>
	)
}

export default page

