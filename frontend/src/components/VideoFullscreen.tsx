import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo } from "../global/videoState.ts";
import {
	currentClipIndex,
	getCurrentClip,
	incrementCurrentVideo,
	indexOfFirstClipInChapter,
	indexOfLastClipInChapter,
	setCurrentClipIndex,
} from "../utils/clipUtils.ts";

export function VideoFullscreen(props: {
	first_clip_index?: number;
	max_clips?: number;
}) {
	const { max_clips = 5, first_clip_index = 0 } = props;
	let videoRef: HTMLVideoElement | undefined;

	const triggerNextVideo = () => {
		playNextClip();
	};

	const playNextClip = () => {
		if (currentClipIndex() === indexOfLastClipInChapter()) {
			setCurrentClipIndex(indexOfFirstClipInChapter());
		} else {
			incrementCurrentVideo();
		}
	};

	let currentPath = currentVideo()?.name;
	const currentClipPath = () => getCurrentClip()?.videoPath ?? "";

	// Load new video side effect
	Solid.createEffect(() => {
		// DON'T REMOVE: This unused variable triggers this Effect when it changes
		const new_video_path = currentClipPath();

		const isNewVideo = currentPath !== currentVideo()?.name;
		if (isNewVideo) {
			currentPath = currentVideo()?.name;
			setCurrentClipIndex(first_clip_index);
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

	// TODO: Click anywhere to play overlay (before user interacts with the page)
	return (
		<>
			{currentVideo()?.clips.length && (
				<VideoPlayerContainer>
					<Framework.Video
						ref={videoRef}
						src={currentClipPath()}
						loop={max_clips === 1}
						autoplay
						muted={true}
						style={{
							height: "100dvh",
							width: "auto",
						}}
					/>
				</VideoPlayerContainer>
			)}
		</>
	);
}

const VideoPlayerContainer = styled.div`
	position: fixed;
	z-index: 0;
	height: 100dvh;
	left: -67dvh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: 0.3;
	overflow: visible;
`;
