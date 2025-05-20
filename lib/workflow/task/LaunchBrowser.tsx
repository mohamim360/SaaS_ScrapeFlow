import { TaskType } from "@/types/TaskType";
import { GlobeLock, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
	type: TaskType.LAUNCH_BROWSER,
	label: "Launch browser",
	icon: (props: LucideProps) => (
		<GlobeLock className="stroke-pink-400" {...props} />
	),
}