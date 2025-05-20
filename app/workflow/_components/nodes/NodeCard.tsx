"use client"

function NodeCard({ children, nodeId }: { children: React.ReactNode, nodeId: string }) {
	return (
		<div>{children}</div>
	)
}
export default NodeCard