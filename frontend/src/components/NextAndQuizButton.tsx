import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo, setCurrentVideo } from "../global/videoState.ts";
import {
	clipIndexIsWithinChapter,
	getCurrentClip,
	incrementCurrentVideo,
	indexOfFirstClipInChapter,
	isLastClipOfCurrentChapter,
	setCurrentClipIndex,
} from "../utils/clipUtils.ts";

export function NextAndQuizButton() {
	if (!getCurrentClip()) return;
	const newSubtitles = () => getCurrentClip()?.subtitles;

	const goToNextClip = () => {
		const inASubPage = window.location.href.split("/").length > 3;
		if (inASubPage) {
			window.location.pathname = "/search/" + newSubtitles();
		} else {
			window.location.replace(newSubtitles() ?? "");
		}
	};

	const goToFirstClip = () => {
		setCurrentClipIndex(indexOfFirstClipInChapter());
		goToNextClip();
	};

	const goToQuiz = () => {
		setCurrentClipIndex(indexOfFirstClipInChapter());
		window.location.pathname = "/quiz";
	};

	return (
		<CtaContainer>
			{isLastClipOfCurrentChapter() ? (
				<Framework.ButtonFloating
					label="QUIZ"
					style={{
						width: "100%",
						"max-width": "300px",
						"margin-right": "24px",
						"border-radius": "4px",
						background: "#1D99FF",
					}}
					onClick={() => goToQuiz()}
				/>
			) : clipIndexIsWithinChapter() ? (
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
			) : (
				<Framework.ButtonFloating
					label="BACK TO START"
					style={{
						width: "100%",
						"max-width": "300px",
						"margin-right": "24px",
						"border-radius": "4px",
					}}
					onClick={() => {
						goToFirstClip();
					}}
				/>
			)}
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
	padding-bottom: 24px;
	top: 0;
	z-index: 2;
	pointer-events: none;
`;
