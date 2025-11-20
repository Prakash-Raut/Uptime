"use client";

import { ChevronRightIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<Badge
					variant="outline"
					className="px-4 py-1.5 font-medium text-gray-500"
				>
					Backed by 100xDevs
				</Badge>
				<h1 className="max-w-4xl text-center font-semibold text-7xl tracking-tight">
					{/* Never miss a beat with Uptime */}
					The only app you Need to Stay Online
				</h1>
				<p className="max-w-lg text-center">
					Monitor your websites, APIs, and servers in real time. Get instant
					alerts when something goes wrong — before your users notice.
				</p>
				<div className="flex items-center justify-center">
					<Button className="transition-all duration-300">
						<span>Start Monitoring Now</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
				</div>
				<div className="flex h-[576px] w-full items-center justify-center">
					<iframe
						title="Uptime Demo"
						src="https://app.supademo.com/demo/cmc0xjr1hj5y3sn1rbn1h092b"
						width="100%"
						height="100%"
						allowFullScreen={true}
						style={{ border: "none" }}
					/>
				</div>
			</div>
		</section>
	);
}
