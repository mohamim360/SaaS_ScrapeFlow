export function NodeInputs({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-2 divide-y">
			{children}
		</div>
	)
}
export function NodeInput({ input }: { input: any }) {
	return (
		<div>
			{input.name}
		</div>
	)
}
