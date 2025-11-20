import { MonitorView } from "./monitor-view";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function MonitorPage({ params }: Props) {
	const { id } = await params;
	return <MonitorView id={id} />;
}
