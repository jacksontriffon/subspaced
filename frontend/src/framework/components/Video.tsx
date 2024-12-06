import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../index.ts";

export interface VideoProps extends Solid.ComponentProps<"video"> {
	style?: Solid.JSX.CSSProperties;
}

export function Video(props: VideoProps) {
	const { style, ...videoProps } = props;
	return (
		<StyledVideo autoplay loop style={props.style} {...videoProps}>
			<source src={props.src}></source>
		</StyledVideo>
	);
}

const StyledVideo = styled.video`
	border-color: 2px solid white;
	aspect-ratio: 16 / 9;
	width: 100%;
	border-radius: 4px;
`;
