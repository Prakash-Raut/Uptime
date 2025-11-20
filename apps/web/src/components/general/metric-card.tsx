"use client";

import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
	title: string;
	value: string | number;
	suffix?: string;
	description?: string;
	icon?: ReactNode;
};

export function MetricCard({
	title,
	value,
	suffix = "",
	description,
	icon,
}: Props) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon && <div className="text-muted-foreground">{icon}</div>}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{typeof value === "number" ? value.toLocaleString() : value}
					{suffix && (
						<span className="text-muted-foreground text-lg ml-1">{suffix}</span>
					)}
				</div>
				{description && (
					<p className="text-muted-foreground text-xs mt-1">{description}</p>
				)}
			</CardContent>
		</Card>
	);
}
