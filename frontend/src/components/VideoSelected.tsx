import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo } from "../global/videoState.ts";
import { VideoPlayer } from "./VideoPlayer.tsx";
import { preferences } from "../global/preferencesState.ts";
import {
	indexOfFirstClipInChapter,
	setCurrentClipIndex,
} from "../utils/clipUtils.ts";
import { VideoChapterList } from "./VideoChapterList.tsx";

export function VideoSelected() {
	return (
		<>
			<VideoPlayer use_current_chapter={true} muted={true} />
			<StyledLink
				onClick={() => setCurrentClipIndex(indexOfFirstClipInChapter())}
				href={`watch`}
			>
				Watch Chapter
			</StyledLink>
			<VideoChapterList />
		</>
	);
}

const StyledLink = styled.a`
	margin-top: 16px;
	background: linear-gradient(
		90deg,
		rgba(29, 153, 255, 0.2),
		rgba(0, 0, 0, 1)
	);
	transition: all 0.3s ease-in-out;
	display: block;
	min-width: 100%;
	text-align: center;
	padding: 10px;
	border-radius: 4px;
	border: 1px solid rgba(29, 153, 255, 1);
	font-size: 13px;
	width: 100%;
	outline: none;
	text-decoration: none;
	color: #f1fdfe;
	margin-bottom: 16px;
`;
