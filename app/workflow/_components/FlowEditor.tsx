"use client"
import { Workflow } from "@prisma/client"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
function FlowEditor({ workflow }: { workflow: Workflow }) {
	const [node, setNode, onNodeChange] = useNodesState([])
	const [edge, setEdge, onEdgeChange] = useEdgesState([])
	return (
		<div className="w-full h-full">
			<ReactFlow
				nodes={node}
				edges={edge}
				onNodesChange={onNodeChange}
				onEdgesChange={onEdgeChange}
			>
				<Controls position="top-left" />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1.2} />
			</ReactFlow>
		</div>
	)
}
export default FlowEditor