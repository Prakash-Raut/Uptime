"use client";

import { useState } from "react";
import { UpgradeModel } from "@/components/upgrade-modal";

export const useUpgradeModal = () => {
	const [open, setOpen] = useState(false);

	const handleError = (error: unknown) => {
		if (error instanceof Error) {
			if (error.message === "FORBIDDEN") {
				setOpen(true);
				return true;
			}
		}
		return false;
	};

	const modal = <UpgradeModel open={open} onOpenChange={setOpen} />;

	return {
		handleError,
		modal,
	};
};
