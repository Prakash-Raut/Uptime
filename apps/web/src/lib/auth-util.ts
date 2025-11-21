import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "./auth-client";

export const requireAuth = async () => {
	const session = await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
			throw: true,
		},
	});

	if (!session || !session.session || !session.user) {
		redirect("/login");
	}

	return {
		session: session.session,
		user: session.user,
	};
};

export const getSession = async () => {
	const { session } = await requireAuth();
	return session;
};

export const getUser = async () => {
	const { user } = await requireAuth();
	return user;
};
