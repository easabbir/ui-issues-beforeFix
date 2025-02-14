import React from "react";

import { cn } from "@/lib/utils";

type TypographyHeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
	className?: string;
	children: React.ReactNode;
};

export function TypographyH2({
	children,
	className,
	...props
}: TypographyHeadingProps) {
	return (
		<h2
			className={cn(
				"scroll-m-20 border-none pb-2 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		>
			{children}
		</h2>
	);
}
