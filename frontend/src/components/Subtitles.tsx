import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo } from "../global/videoState.ts";
import * as App from "../app.tsx";
import { videoIndex } from "./VideoPlayer.tsx";

export function Subtitles() {
	const subtitles = () => currentVideo()?.clips[videoIndex()].subtitles;

	return <HeadingText>{subtitles()}</HeadingText>;
}

const HeadingText = styled.span`
	font-weight: ${App.cssVarJapaneseFontWeight};
	font-size: 1.5rem;
	position: absolute;
	bottom: 8px;
	outline: 1px solid black;
	background-color: rgba(0, 0, 0, 0.7);
`;
