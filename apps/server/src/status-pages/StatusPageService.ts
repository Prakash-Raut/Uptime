import db from "@uptime/db";
import type { StatusPageCreateInput, StatusPageUpdateInput } from "./schema";

export class StatusPageService {
	public async createStatusPage(
		userId: string,
		statusPage: StatusPageCreateInput,
	) {
		return await db.statusPage.create({
			data: {
				...statusPage,
				userId: userId,
			},
		});
	}

	public async getStatusPages(userId: string) {
		return await db.statusPage.findMany({
			where: {
				userId: userId,
			},
		});
	}

	public async getStatusPageById(userId: string, id: string) {
		return await db.statusPage.findUnique({
			where: {
				id: id,
				userId: userId,
			},
		});
	}

	public async updateStatusPage(
		userId: string,
		id: string,
		statusPage: StatusPageUpdateInput,
	) {
		return await db.statusPage.update({
			where: {
				id: id,
				userId: userId,
			},
			data: statusPage,
		});
	}

	public async deleteStatusPage(userId: string, id: string) {
		return await db.statusPage.delete({
			where: {
				id: id,
				userId: userId,
			},
		});
	}
}
