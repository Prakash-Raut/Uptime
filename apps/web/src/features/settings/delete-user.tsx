"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Props = {
	onDelete: () => void;
	isDeleting: boolean;
};

export function DeleteUser({ onDelete, isDeleting }: Props) {
	return (
		<Card className="border-destructive">
			<CardHeader>
				<CardTitle className="text-destructive">
					Permanently remove your account
				</CardTitle>
				<CardDescription>
					Once you delete your account, there is no going back. Please be
					certain.
				</CardDescription>
			</CardHeader>
			<CardFooter className="flex justify-end">
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive" disabled={isDeleting}>
							Delete account
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove all your data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={onDelete}
								className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
								disabled={isDeleting}
							>
								{isDeleting ? "Deleting..." : "Delete account"}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardFooter>
		</Card>
	);
}
