import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { allVideos, setAllVideos } from "../global/videoState.ts";
import { VideoCard } from "./VideoCard.tsx";
import { useVideoCards } from "../hooks/useVideoCards.ts";

export function VideoList({
	onChange,
	currentVideoIndex,
	setCurrentVideoIndex,
}: {
	onChange: () => void;
	currentVideoIndex: Solid.Accessor<number | null>;
	setCurrentVideoIndex: Solid.Setter<number | null>;
}) {
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

	const cardWidth = 72;
	const cardHeight = 110;
	const gapX = 6;
	const gapY = 6;

	const { videoCards, containerRef } = useVideoCards({
		cardWidth,
		cardHeight,
		gapX,
		gapY,
	});

	return (
		<ListContainer ref={containerRef}>
			{videoCards().map((video, index) => {
				let checked = index === currentVideoIndex();
				return (
					<VideoCard
						checked={checked}
						index={index}
						currentVideoIndex={currentVideoIndex}
						onChange={onChange}
						setCurrentVideoIndex={setCurrentVideoIndex}
						video={video}
						loading={loading}
					/>
				);
			})}
		</ListContainer>
	);
}

const ListContainer = styled.ul`
	margin-top: 24px;
	margin-bottom: 24px;
	max-width: 1028px;
	min-width: 200px;
	height: 99%;
	padding: 0px;
	display: flex;
	flex-wrap: wrap;
	row-gap: 6px;
	column-gap: 6px;
	justify-content: center;
	align-items: flex-start;
`;
