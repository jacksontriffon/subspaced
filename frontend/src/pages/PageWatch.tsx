import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import * as App from "../app.tsx";
import { Page } from "../components/Page.tsx";
import { VideoPlayer } from "../components/VideoPlayer.tsx";
import { CloseButton } from "../components/CloseButton.tsx";
import { QuizButton } from "../components/QuizButton.tsx";
import { preferences } from "../global/preferencesState.ts";
import { VideoFullscreen } from "../components/VideoFullscreen.tsx";
import { currentVideo } from "../global/videoState.ts";
import {
	indexOfFirstClipInChapter,
	setCurrentClipIndex,
} from "../utils/clipUtils.ts";

export function PageWatch(props: Framework.RouteProps) {
	return (
		<Page>
			<VideoFullscreen />
			<CloseButton />
			<ContentContainer>
				<Content>
					<VideoPlayer max_clips={preferences().clipsPerChapter} />
					<MarginBottom />
					<Description>Let's break it down.</Description>
					<HighlightedDescription>
						Or skip to the quiz?
					</HighlightedDescription>

					<BottomContainer>
						<BlueLink
							onClick={() =>
								setCurrentClipIndex(indexOfFirstClipInChapter())
							}
							href={`search/${
								currentVideo()?.clips[
									indexOfFirstClipInChapter()
								].subtitles ?? ""
							}`}
						>
							Study
						</BlueLink>
						<GreenLink href={`quiz`}>Quiz</GreenLink>
					</BottomContainer>
				</Content>
			</ContentContainer>
		</Page>
	);
}

const MarginBottom = styled.div`
	margin-bottom: 0.5em;
`;

const ContentContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100dvh;
`;

const Content = styled.div`
	display: flex;
	z-index: 5;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;
`;

const Description = styled.p`
	font-size: 13px;
`;

const HighlightedDescription = styled.p`
	font-size: 13px;
	color: white;
`;

const BottomContainer = styled.div`
	position: absolute;
	bottom: 0px;
	display: flex;
	flex-direction: column;
	width: 90%;
	justify-content: center;
	align-items: center;
	margin-bottom: 32px;
	gap: 16px;
`;

const BlueLink = styled.a`
	background: linear-gradient(
		220deg,
		rgba(0, 0, 0, 1),
		rgba(29, 153, 255, 0.2),
		rgba(0, 0, 0, 1)
	);
	transition: all 0.3s ease-in-out;
	display: block;
	text-align: center;
	padding: 10px;
	width: 100%;
	border-radius: 4px;
	border: 1px solid rgba(29, 153, 255, 1);
	font-size: 13px;
	outline: none;
	text-decoration: none;
	color: #f1fdfe;
`;

const GreenLink = styled.a`
	background: linear-gradient(
		220deg,
		rgba(0, 0, 0, 1),
		rgba(41, 232, 59, 0.2),
		rgba(0, 0, 0, 1)
	);
	transition: all 0.3s ease-in-out;
	width: 100%;
	display: block;
	text-align: center;
	padding: 10px;
	border-radius: 4px;
	border: 1px solid rgba(41, 232, 59, 1);
	font-size: 13px;
	outline: none;
	text-decoration: none;
	color: #f1fdfe;
`;
