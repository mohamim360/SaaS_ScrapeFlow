"use client"
import { createFlowNode } from "@/lib/workflow/createFlowNode"
import { TaskType } from "@/types/task"
import { Workflow } from "@prisma/client"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import NodeComponent from "./nodes/NodeComponent"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"
import { AppNode } from "@/types/appNode"

const nodeTypes = {
	FlowScrapeNode: NodeComponent,
}
const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }
function FlowEditor({ workflow }: { workflow: Workflow }) {
	const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
	const [edges, setEdges, onEdgesChange] = useEdgesState([])
	const { setViewport, screenToFlowPosition } = useReactFlow()

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

	const onDragOver = useCallback( (event: React.DragEvent) => {
		event.preventDefault()
		event.dataTransfer.dropEffect = "move"
	},[])

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault()
			const taskType = event.dataTransfer.getData("application/reactflow")
			if(typeof taskType == undefined || !taskType) return; 

			const position = screenToFlowPosition({ 
				x: event.clientX, 
				y: event.clientY 
			})

			const newNode = createFlowNode(taskType as TaskType, position)
			setNodes((nds) => nds.concat(newNode))
		},
		[setNodes, screenToFlowPosition]
	)

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
				onDragOver={onDragOver}
				onDrop={onDrop}
			>
				<Controls position="top-left" fitViewOptions={fitViewOptions} />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1.2} />
			</ReactFlow>
		</div>
	)
}
export default FlowEditor