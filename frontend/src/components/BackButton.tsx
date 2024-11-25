import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo, setCurrentVideo } from "../global/videoState.ts";
import { ClipDetails } from "common/api/video.js";

export function BackButton() {
	return (
		<CtaContainer>
			<Framework.ButtonFloating
				label="BACK"
				style={{
					width: "100%",
					"max-width": "300px",
					"margin-right": "24px",
					"border-radius": "4px",
				}}
				onClick={() => {
					window.history.back();
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
	padding-bottom: 40px;
	top: 0;
	z-index: 2;
	pointer-events: none;
`;
