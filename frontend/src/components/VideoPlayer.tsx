import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo, setCurrentVideo } from "../global/videoState.ts";
import { Subtitles } from "./Subtitles.tsx";

export const [lastClipIndex, setLastClipIndex] = Solid.createSignal(1);

export function VideoPlayer(props: {
	randomise_clips?: boolean;
	show_subtitles?: boolean;
	first_clip_index?: number;
	max_clips?: number;
}) {
	const {
		randomise_clips = false,
		show_subtitles = true,
		max_clips = 5,
		first_clip_index = 0,
	} = props;
	let videoRef: HTMLVideoElement | undefined;

	const setClipIndex = (newClipIndex: number) => {
		setCurrentVideo(
			(prev) =>
				prev && {
					...prev,
					currentClipIndex: newClipIndex,
				},
		);
	};

	const triggerNextVideo = () => {
		if (randomise_clips) {
			playRandomClip();
		} else {
			playNextClip();
		}
	};
	const playNextClip = () => {
		if (currentVideo()?.currentClipIndex === lastClipIndex()) {
			setClipIndex(0);
		} else {
			setCurrentVideo(
				(prev) =>
					prev && {
						...prev,
						currentClipIndex: prev.currentClipIndex + 1,
					},
			);
		}
	};
	const playRandomClip = () => {
		let rand_index = Math.floor(Math.random() * lastClipIndex());
		while (rand_index === lastClipIndex()) {
			rand_index = Math.floor(Math.random() * lastClipIndex());
		}
		setClipIndex(rand_index);
	};

	let currentPath = currentVideo()?.name;
	// Load new video side effect
	Solid.createEffect(() => {
		// DON'T REMOVE: This unused variable triggers this Effect when it changes
		const new_video_path =
			currentVideo()?.clips[currentVideo()?.currentClipIndex ?? 0]
				.videoPath;

		const isNewVideo = currentPath !== currentVideo()?.name;
		if (isNewVideo) {
			currentPath = currentVideo()?.name;
			setClipIndex(first_clip_index);
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

		const total_clips = currentVideo()?.clips.length ?? max_clips;
		if (currentVideo()?.clips.length) {
			setLastClipIndex(total_clips);
		}
	});

	// TODO: Click anywhere to play overlay (before user interacts with the page)
	return (
		<>
			{currentVideo()?.clips.length && (
				<VideoPlayerContainer>
					<Framework.Video
						ref={videoRef}
						src={
							currentVideo()?.clips[
								currentVideo()?.currentClipIndex ?? 0
							].videoPath
						}
						loop={max_clips === 1}
						autoplay
					/>
					{show_subtitles && <Subtitles />}
				</VideoPlayerContainer>
			)}
		</>
	);
}

const VideoPlayerContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
