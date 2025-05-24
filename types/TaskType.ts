export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export enum TaskParamType {
  STRING = "STRING",
}

export interface Taskparam {
  name: string;
  type: TaskParamType;
  required: boolean;
  helperText?: string;
  hidehandle?: boolean;
  [key: string]: any;
}