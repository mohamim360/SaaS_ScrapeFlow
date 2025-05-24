"use client"

import { Taskparam, TaskParamType } from "@/types/TaskType"
import StringParam from "./param/StringParam"

function NodeParamField({ param }: { param: Taskparam }) {

	switch (param.type) {
		case TaskParamType.STRING:
			return <StringParam param={param}/>
		default:
			return (
				<div className="w-full">
					<p className="text-xs to-muted-foreground">Not implemented</p>
				</div>
			)

	}

}
export default NodeParamField