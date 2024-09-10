import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";

export function NextButton() {
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
`;
