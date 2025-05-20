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

function FlowEditor({ workflow }: { workflow: Workflow }) {
	const [node, setNode, onNodeChange] = useNodesState([createFlowNode(TaskType.LAUNCH_BROWSER)])
	const [edge, setEdge, onEdgeChange] = useEdgesState([])
	return (
		<div className="w-full h-full">
			<ReactFlow
				nodes={node}
				edges={edge}
				onNodesChange={onNodeChange}
				onEdgesChange={onEdgeChange}
				nodeTypes={nodeTypes}
			>
				<Controls position="top-left" />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1.2} />
			</ReactFlow>
		</div>
	)
}
export default FlowEditor