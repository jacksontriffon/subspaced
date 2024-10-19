import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import {
	allVideos,
	currentVideo,
	setCurrentVideo,
} from "../global/videoState.ts";

export function VideoSelected() {
	setDefaultVideo();
	return (
		<>
			{currentVideo() && (
				<Container>
					<Framework.VideoCover
						src={currentVideo()?.cover}
						alt={currentVideo()?.name}
					/>
					<div>
						<div>
							<h3>{currentVideo()?.name}</h3>
							<p>Progress 23%</p>
						</div>
						<Framework.Button
							title="Start Learning"
							href={`search/${
								currentVideo()?.clips[0].subtitles
							}`}
						>
							Start Learning
						</Framework.Button>
					</div>
				</Container>
			)}
		</>
	);
}

const setDefaultVideo = () => {
	Solid.createEffect(() => {
		if (allVideos()) {
			const firstVideo = allVideos()[0];
			setCurrentVideo(firstVideo);
		}
	});
};

const Container = styled.div`
	margin-top: 24px;
	padding: 0px;
	display: flex;
	gap: 8px;
`;
