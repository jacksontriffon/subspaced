import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo, setCurrentVideo } from "../global/videoState.ts";
import { ClipDetails } from "common/api/video.js";

const getCurrentClip = (): ClipDetails | null => {
	return currentVideo()?.clips[currentVideo()?.currentClipIndex ?? 0] ?? null;
};

export function Quiz() {
	return (
		<div>
			{}
			<input type="checkbox" name="" id="correct" />
		</div>
	);
}
