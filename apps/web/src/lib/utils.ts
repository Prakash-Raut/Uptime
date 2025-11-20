import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

// Merge class names
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Convert timestamp to human readable format
export function covertTimeFormat(timestamp: string): string {
	return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}
