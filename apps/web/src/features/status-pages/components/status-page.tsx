"use client";

import {
	EntityContainer,
	EntityEmptyView,
	EntityErrorView,
	EntityHeader,
	EntityItem,
	EntityList,
	EntityLoadingView,
	EntityPagination,
	EntitySearch,
} from "@/components/general/entity";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { LayoutPanelTopIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useStatusPageParams, useStatusPages } from "../hooks/use-status";
import type { StatusPage } from "../types";

export const StatusPagesHeader = () => {
	const router = useRouter();
	return (
		<EntityHeader
			title="Status Pages"
			description="Create and manage your status pages"
			onCreate={() => router.push("/dashboard")}
			createButtonLabel="New Status Page"
		/>
	);
};

export const StatusPageSearch = () => {
	const [params, setParams] = useStatusPageParams();
	const { searchValue, onSearchChange } = useEntitySearch({
		params,
		setParams,
	});
	return (
		<EntitySearch
			value={searchValue}
			onChange={onSearchChange}
			placeholder="Search status pages"
		/>
	);
};

export const StatusPagePagination = () => {
	const { data: statusPages, isFetching } = useStatusPages();
	const [params, setParams] = useStatusPageParams();

	if (!statusPages) return null;

	return (
		<EntityPagination
			page={statusPages.page}
			totalPages={statusPages.total}
			onPageChange={(page) => {
				setParams({ ...params, page });
			}}
			disabled={isFetching}
		/>
	);
};

export const StatusPageContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<EntityContainer
			header={<StatusPagesHeader />}
			search={
				<Suspense fallback={null}>
					<StatusPageSearch />
				</Suspense>
			}
			pagination={
				<Suspense fallback={null}>
					<StatusPagePagination />
				</Suspense>
			}
		>
			{children}
		</EntityContainer>
	);
};

export const StatusPageEmpty = () => {
	const router = useRouter();

	return (
		<EntityEmptyView
			message="You haven't created any status pages yet. Get started by creating your first status page."
			onNew={() => router.push("/dashboard")}
		/>
	);
};

export const StatusPageList = () => {
	const { data } = useStatusPages();
	if (!data) return null;
	return (
		<EntityList
			items={data.statusPages}
			getKey={(statusPage: StatusPage) => statusPage.id}
			renderItem={(statusPage: StatusPage) => (
				<StatusPageItem statusPage={statusPage} />
			)}
			emptyView={<StatusPageEmpty />}
		/>
	);
};

export const StatusPageItem = ({ statusPage }: { statusPage: StatusPage }) => {
	// No delete mutation for status pages provided, can add when available

	return (
		<EntityItem
			href={`/dashboard/status-pages/${statusPage.id}`}
			title={statusPage.title}
			image={
				<div className="flex justify-center items-center size-8">
					<LayoutPanelTopIcon className="size-5 text-muted-foreground" />
				</div>
			}
		// onRemove={...} // Uncomment and implement if delete is added
		// isRemoving={...}
		/>
	);
};

export const StatusPageLoading = () => {
	return <EntityLoadingView message="Loading status pages..." />;
};

export const StatusPageError = () => {
	return (
		<EntityErrorView message="An error occurred while loading status pages. Please try again later." />
	);
};
