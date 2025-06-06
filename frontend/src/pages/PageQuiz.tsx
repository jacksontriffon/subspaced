import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { Page } from "../components/Page.tsx";
import { VideoPlayer } from "../components/VideoPlayer.tsx";
import { Quiz } from "../components/Quiz.tsx";
import { CloseButton } from "../components/CloseButton.tsx";

export function PageQuiz(props: Framework.RouteProps) {
	return (
		<Page>
			<CloseButton />
			<MarginBottom />
			<VideoPlayer max_clips={1} show_subtitles={true} />
			<MarginBottom />
			<Quiz />
		</Page>
	);
}

const MarginBottom = styled.div`
	margin-bottom: 0.5em;
`;
