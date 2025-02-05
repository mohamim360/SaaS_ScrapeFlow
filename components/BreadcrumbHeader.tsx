"use client"

import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "./ui/breadcrumb"
import React from "react"

function BreadcrumbHeader() {
	const pathName = usePathname()
	const paths = pathName === "/" ? [""] : pathName.split("/")
	return (
		<div className="flex items-center flex-start">
			<Breadcrumb>
				<BreadcrumbList>
					{paths.map((path, index) => (
						<React.Fragment key={index}>
							<BreadcrumbItem>
								<BreadcrumbLink href={`/${path}`} className="capitalize">
									{path === "" ? "Home" : path}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}
export default BreadcrumbHeader