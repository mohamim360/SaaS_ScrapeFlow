import { Node } from "@xyflow/react";
import { Taskparam, TaskType } from "./TaskType";

export interface AppNodeData {
  type: TaskType;
  Inputs: Record<string, string>; //{ email: "john@example.com", subject: "Hello" }
  [key: string]: any; // Additional properties can be added dynamically
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface ParamProps {
  param: Taskparam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}
