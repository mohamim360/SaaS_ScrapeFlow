import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Editor from "../../_components/Editor";

async function page({ params }: { params: { workflowId: string } }) {
	const { workflowId } = params;
	const { userId } = auth();
	if (!userId) {
		return <div>Unauthorized</div>
	}
	const workflow = await prisma.workflow.findUnique({
		where: {
			id: workflowId,
			userId,
		},
	});
	if (!workflow) {
		return <div>Workflow not found</div>
	}
	// return (
	// 	<pre className="w-full h-full bg-slate-900 text-slate-50 p-4">
	// 		{JSON.stringify(workflow, null, 4)}
	// 	</pre>
	// )

	return(
		<Editor workflow={workflow} />
	)
}
export default page