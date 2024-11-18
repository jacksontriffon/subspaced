import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import * as App from "../app.tsx";
import { Page } from "../components/Page.tsx";
import { VideoPlayer } from "../components/VideoPlayer.tsx";
import { CloseButton } from "components/CloseButton.tsx";
import { QuizButton } from "components/QuizButton.tsx";
import { preferences } from "global/preferencesState.ts";

export function PageWatch(props: Framework.RouteProps) {
	return (
		<Page>
			<CloseButton />
			<CenteredDiv>
				<VideoPlayer max_clips={preferences().clipsPerChapter} />
				<MarginBottom />
			</CenteredDiv>
			<QuizButton />
		</Page>
	);
}

const MarginBottom = styled.div`
	margin-bottom: 0.5em;
`;

const CenteredDiv = styled.div``;
