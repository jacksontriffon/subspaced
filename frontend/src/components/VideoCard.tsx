import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { VideoDetails } from "common/api/video.js";
import { setCurrentVideo } from "../global/videoState.ts";

export function VideoCard({
	onChange,
	video,
	checked,
	index,
	currentVideoIndex,
	setCurrentVideoIndex,
}: {
	onChange: () => void;
	video: VideoDetails | null;
	checked: boolean;
	index: number;
	currentVideoIndex: Solid.Accessor<number | null>;
	setCurrentVideoIndex: Solid.Setter<number | null>;
}) {
	const updateCurrentVideo = (
		newVideo: VideoDetails,
		randomiseDefaultClipIndex: boolean = true,
	) => {
		if (randomiseDefaultClipIndex) {
			setCurrentVideo({
				...newVideo,
				currentClipIndex: Framework.randomIndex(newVideo.clips),
			});
		} else {
			setCurrentVideo(newVideo);
		}
	};

	return (
		<>
			{video !== null ? (
				<RadioWrapper>
					<HiddenRadioInput
						type="radio"
						name="video-list"
						value={index}
						checked={checked}
						onChange={() => {
							setCurrentVideoIndex((prevIndex) => {
								const isNewSelection = prevIndex !== index;
								if (isNewSelection) {
									updateCurrentVideo(video);
								}
								return index;
							});
							onChange();
						}}
					/>
					<Framework.VideoCover
						visible={checked || currentVideoIndex() === null}
						src={video.cover}
						alt={video.name}
					/>
				</RadioWrapper>
			) : (
				<DefaultCard>?</DefaultCard>
			)}
		</>
		// <ListItem>
		// </ListItem>
	);
}

const ListItem = styled.li`
	width: 72px;
	height: 110px;
	/* display: flex; */
	/* gap: 16px; */
	/* flex: 0 0 auto; */
	/* align-items: center; */
	text-decoration: none;
`;

const RadioWrapper = styled.label`
	/* display: flex; */
	/* flex-direction: column; */
	/* align-items: center; */
	cursor: pointer;
	width: 72px;
	height: 110px;
`;

const HiddenRadioInput = styled.input`
	display: none;
`;

const DefaultCard = styled.div`
	width: 72px;
	height: 110px;
	border-radius: 4px;
	border: 1px solid #9f65ff;
	display: flex;
	justify-content: center;
	opacity: 0.5;
	align-items: center;
	font-size: 36px;
	font-weight: 500;
	color: #9f65ff;
	background: linear-gradient(220deg, rgba(0, 0, 0, 1), rgba(70, 67, 67, 1));
`;
