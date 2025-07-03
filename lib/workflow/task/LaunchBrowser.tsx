import { TaskParamType, TaskType } from "@/types/task";
import { GlobeLock, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
	type: TaskType.LAUNCH_BROWSER,
	label: "Launch browser",
	icon: (props: LucideProps) => (
		<GlobeLock className="stroke-pink-400" {...props} />
	),
	isEntryPoint: true,
	inputs: [
		{ name: "Website URL", type: TaskParamType.STRING, required: true, helperText: "eg: https://www.google.com", hideHandle: true },
	]
}

//You're assigning a function that returns JSX to the icon key.
//This makes icon effectively a React component!