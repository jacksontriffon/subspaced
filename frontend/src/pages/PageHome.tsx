import * as Solid from "solid-js";
import * as Framework from "../framework/index.ts";
import * as App from "../app.tsx";
import { Page } from "../components/Page.tsx";
import { VideoListSelect } from "../components/VideoList.tsx";
import { VideoPlayer } from "../components/VideoPlayer.tsx";

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
				<VideoPlayer max_clips={5} />
			</Framework.Drawer>
			<VideoListSelect
				currentVideoIndex={currentVideoIndex}
				setCurrentVideoIndex={setCurrentVideoIndex}
				onChange={() => {
					setOpen(true);
				}}
			/>
		</Page>
	);
}
