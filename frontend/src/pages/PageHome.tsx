import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import * as App from "../app.tsx";
import { Page } from "../components/Page.tsx";
import { Searchbox } from "../components/Searchbox.tsx";
import { AnalyticsBox } from "../components/AnalyticsBox.tsx";
import { VideoListSelect } from "../components/VideoList.tsx";
import { VideoSelected } from "../components/VideoSelected.tsx";
import { VideoPlayer } from "../components/VideoPlayer.tsx";

export function PageHome(props: Framework.RouteProps) {
	return (
		<Page>
			<VideoPlayer />
			<VideoSelected />
			<VideoListSelect />
		</Page>
	);
}
