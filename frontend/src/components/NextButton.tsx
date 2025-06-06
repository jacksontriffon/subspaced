import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo, setCurrentVideo } from "../global/videoState.ts";
import { ClipDetails } from "common/api/video.js";

const getCurrentClip = (): ClipDetails | null => {
	return currentVideo()?.clips[currentVideo()?.currentClipIndex ?? 0] ?? null;
};

const incrementCurrentVideo = () => {
	setCurrentVideo(
		(prev) =>
			prev && {
				...prev,
				currentClipIndex: prev.currentClipIndex + 1,
			},
	);
};

export function NextButton() {
	const newSubtitles = () =>
		currentVideo()?.clips[currentVideo()?.currentClipIndex ?? 0].subtitles;

	const goToNextClip = () => {
		const inASubPage = window.location.href.split("/").length > 3;
		if (inASubPage) {
			window.location.pathname = "/search/" + newSubtitles();
		} else {
			window.location.replace(newSubtitles() ?? "");
		}
	};

	return (
		<CtaContainer>
			<Framework.ButtonFloating
				label="NEXT"
				style={{
					width: "100%",
					"max-width": "300px",
					"margin-right": "24px",
					"border-radius": "4px",
				}}
				onClick={() => {
					incrementCurrentVideo();
					goToNextClip();
				}}
			/>
		</CtaContainer>
	);
}

const CtaContainer = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: end;
	padding-bottom: 120px;
	top: 0;
	z-index: 2;
	pointer-events: none;
`;
