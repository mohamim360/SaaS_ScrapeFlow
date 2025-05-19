"use client"

import { Workflow } from "@prisma/client"
import { ReactFlowProvider } from "@xyflow/react"
import FlowEditor from "./FlowEditor"
function Editor({ workflow }: { workflow: Workflow }) {
	return (
		<ReactFlowProvider>
			<div className="w-full h-full flex flex-col overflow-hidden">
				<section className="flex h-full overflow-hidden">
					<FlowEditor
						workflow={workflow} />
				</section>
			</div>
		</ReactFlowProvider>

	)
}
export default Editor