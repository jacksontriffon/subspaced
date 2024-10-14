import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo } from "../global/videoState.ts";
import { Subtitles } from "./Subtitles.tsx";

export const [videoIndex, setVideoIndex] = Solid.createSignal(0);

export function VideoPlayer(props: {
	randomise_clips?: boolean;
	show_subtitles?: boolean;
	first_clip_index?: number;
	max_clips?: number;
}) {
	const {
		randomise_clips = true,
		show_subtitles = true,
		max_clips = 5,
		first_clip_index = 0,
	} = props;

	let videoRef: HTMLVideoElement | undefined;

	const triggerNextVideo = () => {
		console.log(videoIndex());
		if (videoIndex() === max_clips - 1) {
			setVideoIndex(0);
		} else {
			setVideoIndex(videoIndex() + 1);
		}
	};

	let currentPath = currentVideo()?.name;
	// Load new video side effect
	Solid.createEffect(() => {
		// DON'T REMOVE: This unused variable triggers this Effect when it changes
		const new_video_path = currentVideo()?.clips[videoIndex()].videoPath;

		const isNewVideo = currentPath !== currentVideo()?.name;
		if (isNewVideo) {
			currentPath = currentVideo()?.name;
			console.log("new video");
			setVideoIndex(first_clip_index);
		}

		if (videoRef) {
			videoRef.src = new_video_path ?? "";
			videoRef.onended = (e) => {
				triggerNextVideo();
			};
			Solid.onCleanup(() => {
				if (videoRef) videoRef.onended = null;
			});
			videoRef.load();
		}
	});

	return (
		<>
			{currentVideo()?.clips.length && (
				<>
					<Framework.Video
						ref={videoRef}
						src={currentVideo()?.clips[0].videoPath}
						loop={false}
					/>
					<Subtitles />
				</>
			)}
		</>
	);
}
