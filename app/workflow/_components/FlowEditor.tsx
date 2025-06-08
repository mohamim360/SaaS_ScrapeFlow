"use client"
import { createFlowNode } from "@/lib/workflow/createFlowNode"
import { TaskType } from "@/types/TaskType"
import { Workflow } from "@prisma/client"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import NodeComponent from "./nodes/NodeComponent"

const nodeTypes = {
	FlowScrapeNode: NodeComponent,
}
const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }
function FlowEditor({ workflow }: { workflow: Workflow }) {
	const [nodes, setNode, onNodesChange] = useNodesState([createFlowNode(TaskType.LAUNCH_BROWSER)])
	const [edges, setEdge, onEdgesChange] = useEdgesState([])
	return (
		<div className="w-full h-full">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				snapToGrid={true}
				snapGrid={snapGrid}
				fitViewOptions={fitViewOptions}
				fitView
			>
				<Controls position="top-left" fitViewOptions={fitViewOptions} />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1.2} />
			</ReactFlow>
		</div>
	)
}
export default FlowEditor