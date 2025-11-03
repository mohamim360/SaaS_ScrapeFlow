import { TaskType } from "@/types/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromElementTask";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { WorkflowTask } from "@/types/workflow";

type Registry = {
	[key in TaskType]: WorkflowTask & { type: key };
}

export const taskRegistry: Registry = {
	LAUNCH_BROWSER: LaunchBrowserTask,
	PAGE_TO_HTML: PageToHtmlTask,
	EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask
}

// [key in TaskType]
// This is a mapped type.
// It means: "For every value of TaskType, create a key in the object."
// Example:
// If TaskType is a union like:
// type TaskType = "build" | "deploy" | "test";

// then this part expands to:

// {
//   build: WorkflowTask;
//   deploy: WorkflowTask;
//   test: WorkflowTask;
// }