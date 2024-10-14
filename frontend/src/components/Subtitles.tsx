import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo } from "../global/videoState.ts";
import * as App from "../app.tsx";
import { videoIndex } from "./VideoPlayer.tsx";

export function Subtitles() {
	const subtitles = () => currentVideo()?.clips[videoIndex()].subtitles;

	return (
		<HeadingText>
			{currentVideo()?.clips[videoIndex()].subtitles}
		</HeadingText>
	);
}

const HeadingText = styled.span`
	font-weight: ${App.cssVarJapaneseFontWeight};
	font-size: ${App.cssVarWordHeadingFontSize};
`;
