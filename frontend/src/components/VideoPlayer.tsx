import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo } from "../global/videoState.ts";
import { Subtitles } from "./Subtitles.tsx";
import {
	currentClipIndex,
	getCurrentClip,
	incrementCurrentVideo,
	indexOfFirstClipInChapter,
	indexOfLastClipInChapter,
	setCurrentClipIndex,
} from "../utils/clipUtils.ts";

export function VideoPlayer(props: {
	randomise_clips?: boolean;
	show_subtitles?: boolean;
	first_clip_index?: number;
	max_clips?: number;
	use_current_chapter?: boolean;
	muted?: boolean;
	containerProps?: Solid.ComponentProps<"div">;
	videoStyle?: Framework.VideoProps["style"];
}) {
	const {
		randomise_clips = false,
		show_subtitles = true,
		max_clips = 5,
		first_clip_index = 0,
		use_current_chapter = false,
		muted,
		containerProps,
		videoStyle,
	} = props;
	let videoRef: HTMLVideoElement | undefined;

	const triggerNextVideo = () => {
		if (randomise_clips) {
			playRandomClip();
		} else {
			playNextClip();
		}
	};

	const playNextClip = () => {
		if (currentClipIndex() === indexOfLastClipInChapter()) {
			setCurrentClipIndex(indexOfFirstClipInChapter());
		} else {
			incrementCurrentVideo();
		}
	};

	const playRandomClip = () => {
		let rand_index = Math.floor(Math.random() * max_clips);
		while (rand_index === max_clips) {
			rand_index = Math.floor(Math.random() * max_clips);
		}
		setCurrentClipIndex(first_clip_index + rand_index);
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
				<VideoPlayerContainer {...containerProps}>
					<Framework.Video
						ref={videoRef}
						src={currentClipPath()}
						loop={max_clips === 1}
						autoplay
						muted={muted}
						style={videoStyle}
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
