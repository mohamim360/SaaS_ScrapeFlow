import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/TaskType";

export function createFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    data: {
      type: nodeType,
      Inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}

//: AppNode is a type annotation that tells the compiler what type the function returns.
