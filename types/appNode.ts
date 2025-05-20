import { Node } from "@xyflow/react";
import { TaskType } from "./TaskType";

export interface AppNodeData {
  type: TaskType;
  Inputs: Record<string, string>; //{ email: "john@example.com", subject: "Hello" }
  [key: string]: any; // Additional properties can be added dynamically
}

export interface AppNode extends Node {
  data: AppNodeData;
}
