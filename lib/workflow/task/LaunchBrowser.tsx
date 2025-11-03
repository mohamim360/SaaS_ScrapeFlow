import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { GlobeLock, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
	type: TaskType.LAUNCH_BROWSER,
	label: "Launch browser",
	icon: (props: LucideProps) => (
		<GlobeLock className="stroke-pink-400" {...props} />
	),
	isEntryPoint: true,
	credits: 5,
	inputs: [
		{
			name: "Website URL",
			type: TaskParamType.STRING,
			required: true,
			helperText: "eg: https://www.google.com",
			hideHandle: true
		},
	],
	outputs: [
		{
			name: "Web page",
			type: TaskParamType.BROWSER_INSTANCE
		}
	],
} satisfies WorkflowTask;

//You're assigning a function that returns JSX to the icon key.
//This makes icon effectively a React component!