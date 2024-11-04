import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo, setCurrentVideo } from "../global/videoState.ts";
import { ClipDetails } from "common/api/video.js";

const getCurrentClip = (): ClipDetails | null => {
	return currentVideo()?.clips[currentVideo()?.currentClipIndex ?? 0] ?? null;
};

export function QuizButton() {
	return (
		<CtaContainer>
			{/* <Link href="/quiz">QUIZ</Link> */}
			<Framework.ButtonFloating
				label="QUIZ"
				style={{
					width: "100%",
					"max-width": "300px",
					"margin-right": "24px",
					"border-radius": "4px",
					background: "#1D99FF",
				}}
				href="/quiz"
			/>
		</CtaContainer>
	);
}

const Link = styled.a`
	width: 100%;
	text-align: center;
	max-width: 300px;
	margin-right: 24px;
	border-radius: 4px;
	padding: 16px;
	text-decoration: none;
	color: white;
	background: linear-gradient(
			241deg,
			#000 19.88%,
			rgba(29, 153, 255, 0.2) 81.96%
		),
		#000;
	border: 1px solid #1d99ff;
`;

const CtaContainer = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: end;
	padding-bottom: 40px;
	top: 0;
	z-index: 2;
	pointer-events: none;
`;
