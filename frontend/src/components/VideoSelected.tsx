import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo } from "../global/videoState.ts";
import { VideoPlayer } from "./VideoPlayer.tsx";

export function VideoSelected() {
	return (
		<>
			<VideoPlayer max_clips={5} />
			<StyledLink
				href={`search/${
					currentVideo()?.clips[currentVideo()?.currentClipIndex ?? 0]
						.subtitles
				}`}
			>
				Begin Quiz
			</StyledLink>
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
`;
