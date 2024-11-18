import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import * as App from "../app.tsx";
import { getCurrentClip } from "../utils/clipUtils.ts";

export function Subtitles() {
	const subtitles = () => getCurrentClip()?.subtitles ?? "";

	return <HeadingText>{subtitles()}</HeadingText>;
}

const HeadingText = styled.span`
	font-weight: ${App.cssVarJapaneseFontWeight};
	font-size: 1rem;
	text-align: center;
	position: absolute;
	bottom: 8px;
	outline: 1px solid black;
	background-color: rgba(0, 0, 0, 0.7);
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 4px;
	padding-bottom: 4px;
`;
