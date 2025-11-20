import { PAGINATION } from "@/config/pagination";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

//Describe your search params, and reuse this in useQueryStates / createSerializer:
export const statusPagesParams = {
	page: parseAsInteger
		.withDefault(PAGINATION.DEFAULT_PAGE)
		.withOptions({ clearOnDefault: true }),
	pageSize: parseAsInteger
		.withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
		.withOptions({ clearOnDefault: true }),
	search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const loadStatusPagesParams = createLoader(statusPagesParams);
