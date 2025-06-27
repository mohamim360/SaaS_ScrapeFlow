"use client"

import { Workflow } from "@prisma/client"
import { ReactFlowProvider } from "@xyflow/react"
import FlowEditor from "./FlowEditor"
import Topbar from "./topbar/Topbar"
function Editor({ workflow }: { workflow: Workflow }) {
	console.log("Rendering Editor with workflow:", workflow);
	return (
		<ReactFlowProvider>
			<div className="w-full h-full flex flex-col overflow-hidden">
				<Topbar title="Workflow editor" subtitle={workflow.name} workflowId={workflow.id}/>
				<section className="flex h-full overflow-hidden">
					<FlowEditor
						workflow={workflow} />
				</section>
			</div>
		</ReactFlowProvider>

	)
}
export default Editor