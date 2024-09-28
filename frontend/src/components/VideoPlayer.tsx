import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import {
	allVideos,
	currentVideo,
	setCurrentVideo,
} from "../global/videoState.ts";

export function VideoPlayer() {
	Solid.createEffect(() => {
		console.log("Current video: ", currentVideo()?.clips[0].videoPath);
	});
	return (
		<>
			{currentVideo()?.clips.length && (
				<Framework.Video
					src={currentVideo()?.clips[0].videoPath ?? ""}
				/>
			)}
		</>
	);
}
 