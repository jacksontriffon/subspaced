import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../index.ts";

export function Video(props: {
	style?: Solid.JSX.CSSProperties;
	ref?: Solid.Setter<HTMLVideoElement>;
	src: string;
}) {
	return (
		<StyledVideo
			autoplay
			controls
			loop
			muted
			style={props.style}
			ref={props.ref}
		>
			<source src={props.src}></source>
		</StyledVideo>
	);
}

const VideoContainer = styled.div`
	border-color: 2px solid white;
	aspect-ratio: 16 / 9;
`;

const StyledVideo = styled.video`
	border-color: 2px solid white;
	aspect-ratio: 16 / 9;
	width: 100%;
`;
