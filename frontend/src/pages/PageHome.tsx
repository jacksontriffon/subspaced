import * as Solid from "solid-js";
import * as Framework from "../framework/index.ts";
import * as App from "../app.tsx";
import { Page } from "../components/Page.tsx";
import { VideoListSelect } from "../components/VideoList.tsx";
import { VideoSelected } from "../components/VideoSelected.tsx";
import { VideoPlayer } from "../components/VideoPlayer.tsx";

export function PageHome(props: Framework.RouteProps) {
	return (
		<Page>
			<VideoPlayer max_clips={0} randomise_clips={true} />
			<VideoSelected />
			<VideoListSelect />
		</Page>
	);
}
