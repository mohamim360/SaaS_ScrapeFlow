"use client"
import { createFlowNode } from "@/lib/workflow/createFlowNode"
import { TaskType } from "@/types/TaskType"
import { Workflow } from "@prisma/client"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import NodeComponent from "./nodes/NodeComponent"
import { useEffect } from "react"
import { toast } from "sonner"

const nodeTypes = {
	FlowScrapeNode: NodeComponent,
}
const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }
function FlowEditor({ workflow }: { workflow: Workflow }) {
	const [nodes, setNodes, onNodesChange] = useNodesState([])
	const [edges, setEdges, onEdgesChange] = useEdgesState([])
	const { setViewport } = useReactFlow()

	useEffect(() => {
		try {
			const flow = JSON.parse(workflow.definition)
			if (!flow) return;
			setNodes(flow.nodes || [])
			setEdges(flow.edges || [])
			if (!flow.viewport) return;
			const { x = 0, y = 0, zoom = 1 } = flow.viewport
			setViewport({ x, y, zoom })
		} catch (error) {
			toast.error("Failed to parse workflow definition. Please check the JSON format.")
		}
	}, [workflow.definition, setNodes, setEdges, setViewport])

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
			>
				<Controls position="top-left" fitViewOptions={fitViewOptions} />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1.2} />
			</ReactFlow>
		</div>
	)
}
export default FlowEditor