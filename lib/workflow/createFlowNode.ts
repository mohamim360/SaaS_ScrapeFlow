import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode", // ✅ This refers to the node renderer (component) from `nodeTypes`
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      Inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}

//: AppNode is a type annotation that tells the compiler what type the function returns.
