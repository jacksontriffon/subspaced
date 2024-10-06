import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo } from "../global/videoState.ts";

export function VideoPlayer(props: {
	randomise_clips: boolean;
	show_subtitles: true;
}) {
	let videoRef: HTMLVideoElement | undefined;
	Solid.createEffect(() => {
		// DON'T REMOVE: This unused variable triggers this Effect when it changes
		const new_video_path = currentVideo()?.clips[0].videoPath;

		if (videoRef) {
			videoRef.load();
		}
	});

	return (
		<>
			{currentVideo()?.clips.length && (
				<Framework.Video
					ref={videoRef}
					src={currentVideo()?.clips[0].videoPath ?? ""}
				/>
			)}
		</>
	);
}
