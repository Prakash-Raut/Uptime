"use client";

import { Marquee } from "../ui/marquee";
import {
	Logo01,
	Logo02,
	Logo03,
	Logo04,
	Logo05,
	Logo06,
	Logo07,
	Logo08,
} from "./logos";

export default function Floating() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<div className="flex h-[125px] w-full items-center justify-center">
					<div className="max-w-(--breakpoint-xl)">
						<Marquee
							pauseOnHover
							className="mask-x-from-70% mask-x-to-90% [--duration:20s] [&_svg]:mr-10"
						>
							<Logo01 />
							<Logo02 />
							<Logo03 />
							<Logo04 />
							<Logo05 />
							<Logo06 />
							<Logo07 />
							<Logo08 />
						</Marquee>
					</div>
				</div>
			</div>
		</section>
	);
}
