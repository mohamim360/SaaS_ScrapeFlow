"use client"
import { CreateFlowNode } from "@/lib/workflow/createFlowNode"
import { TaskType } from "@/types/task"
import { Workflow } from "@prisma/client"
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import NodeComponent from "./nodes/NodeComponent"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"
import { AppNode } from "@/types/appNode"
import DeleteableEdge from "./edges/DeleteableEdge"
import { taskRegistry } from "@/lib/workflow/task/registry"

const nodeTypes = {
	FlowScrapeNode: NodeComponent,
}

const edgeTypes = {
	default: DeleteableEdge,
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }

function FlowEditor({ workflow }: { workflow: Workflow }) {

	const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
	const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow()

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

	const onDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault()
		event.dataTransfer.dropEffect = "move"
	}, [])

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault()
			const taskType = event.dataTransfer.getData("application/reactflow")
			if (typeof taskType == undefined || !taskType) return;

			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY
			})

			const newNode = CreateFlowNode(taskType as TaskType, position)
			setNodes((nds) => nds.concat(newNode))
		},
		[setNodes, screenToFlowPosition]
	)

	const onConnect = useCallback((connection: Connection) => {
		setEdges((eds) => addEdge({ ...connection, animated: true }, eds)
		)

		if (!connection.targetHandle) return;

		const targetNode = nodes.find(node => node.id === connection.target)
		if (!targetNode) return;
		const nodeInputs = targetNode.data.inputs;

		updateNodeData(targetNode.id, {
			inputs: {
				...nodeInputs,
				[connection.targetHandle]: "",

			}
		})

	}, [setEdges, nodes, updateNodeData])

	const isValidConnection = useCallback((connection: Edge | Connection) => {
		//No self-connection is allowed
		if (connection.source === connection.target) {
			return false;
		}

		//same TaskParam type connection

		const source = nodes.find(node => node.id === connection.source);
		const target = nodes.find(node => node.id === connection.target)

		if (!source || !target) {
			console.error("invaild connection: source or target node not found")
			return false;
		}

		const sourceTask = taskRegistry[source.data.type];
		const targetTask = taskRegistry[target.data.type];

		const output = sourceTask.outputs.find(
			(o) => o.name === connection.sourceHandle
		)
		const input = targetTask.inputs.find(
			(i) => i.name === connection.targetHandle
		)

		if (input?.type !== output?.type) {
			console.error("invaild connection: mismatched types", input?.type, output?.type)
			return false;
		}
		//No cyclic connection
		//DFS to check if there's a path from target to source
		//visited = new Set() → Keeps track of visited nodes to avoid infinite recursion.
		const hasCycle = (node: AppNode, visited = new Set()) => {
			if (visited.has(node.id)) return false;
			visited.add(node.id);
			//Loop through outgoing neighbors
			for (const outgoer of getOutgoers(node, nodes, edges)) {
				if (outgoer.id === connection.source) return true;
				if (hasCycle(outgoer, visited)) return true;
			}
			return false;
		}
		const detectedCycle = hasCycle(target);
		return !detectedCycle;

	}, [nodes, edges])

	return (
		<div className="w-full h-full">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				snapToGrid={true}
				snapGrid={snapGrid}
				fitViewOptions={fitViewOptions}
				onDragOver={onDragOver}
				onDrop={onDrop}
				onConnect={onConnect}
				isValidConnection={isValidConnection}
			>
				<Controls position="top-left" fitViewOptions={fitViewOptions} />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1.2} />
			</ReactFlow>
		</div>
	)
}
export default FlowEditor