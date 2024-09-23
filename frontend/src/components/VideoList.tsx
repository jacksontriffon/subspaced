import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { VideoDetails } from "common/api/video.js";
import {
	allVideos,
	currentVideo,
	setAllVideos,
	setCurrentVideo,
} from "../global/videoState.ts";

export function VideoListSelect() {
	const [currentVideoIndex, setCurrentVideoIndex] =
		Solid.createSignal<number>(0);

	const [loading, setLoading] = Solid.createSignal<boolean>(true);
	Solid.createEffect(() => {
		Framework.getAllVideos()
			.then((value) => {
				setAllVideos(value);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	});

	const updateCurrentVideo = (newVideo: VideoDetails) => {
		setCurrentVideo(newVideo);
	};

	return (
		<ListContainer>
			{loading() ? (
				<Center>
					<p>Loading...</p>
				</Center>
			) : allVideos().length > 0 ? (
				allVideos().map((video, index) => {
					let isChecked = index === currentVideoIndex();
					return (
						<ListItem>
							<RadioWrapper>
								<HiddenRadioInput
									type="radio"
									name="video-list"
									value={index}
									checked={isChecked}
									onChange={() =>
										setCurrentVideoIndex((prevIndex) => {
											const isNewSelection =
												prevIndex !== index;
											if (isNewSelection) {
												updateCurrentVideo(video);
											}
											return index;
										})
									}
								/>
								<Framework.VideoCover
									isChecked={isChecked}
									src={video.cover}
									alt={video.name}
								/>
							</RadioWrapper>
						</ListItem>
					);
				})
			) : (
				<Center>
					<p>No videos found.</p>
				</Center>
			)}
		</ListContainer>
	);
}

const Center = styled.p`
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ListContainer = styled.ul`
	margin-top: 24px;
	padding: 0px;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	justify-content: center;
`;

const ListItem = styled.li`
	display: flex;
	gap: 16px;
	align-items: center;
`;

const RadioWrapper = styled.label`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
`;

const HiddenRadioInput = styled.input`
	display: none;
`;
