import * as Solid from "solid-js";
import * as Framework from "../framework/index.ts";
import * as App from "../app.tsx";
import { Page } from "../components/Page.tsx";
import { VideoList } from "../components/VideoList.tsx";
import { VideoSelected } from "../components/VideoSelected.tsx";

export function PageHome(props: Framework.RouteProps) {
	const [open, setOpen] = Solid.createSignal(false);
	const [currentVideoIndex, setCurrentVideoIndex] = Solid.createSignal<
		number | null
	>(null);
	Solid.createEffect(() => {
		if (!open()) {
			setCurrentVideoIndex(null);
		}
	});
	return (
		<Page>
			<Framework.Drawer open={open} setOpen={setOpen}>
				<VideoSelected />
			</Framework.Drawer>
			<VideoList
				currentVideoIndex={currentVideoIndex}
				setCurrentVideoIndex={setCurrentVideoIndex}
				onChange={() => {
					setOpen(true);
				}}
			/>
		</Page>
	);
}
