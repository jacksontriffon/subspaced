import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { allVideos, setAllVideos } from "../global/videoState.ts";
import { VideoCard } from "./VideoCard.tsx";
import { useVideoCards } from "../hooks/useVideoCards.ts";
import anime from "animejs";

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

	const { videoCards, containerRef, cardsPerColumn, cardsPerRow } =
		useVideoCards({
			cardWidth,
			cardHeight,
			gapX,
			gapY,
		});

	const emptyVideoCards = () => videoCards().map(() => null);

	const [visibleCards, setVisibleCards] = Solid.createSignal(videoCards());

	Solid.createEffect(() => {
		if (loading()) {
			setVisibleCards(emptyVideoCards());
		} else {
			// Transition cards animation
			setTimeout(() => {
				anime({
					targets: ".card",
					scale: [1, 0],
					delay: anime.stagger(50, {
						grid: [cardsPerRow(), cardsPerColumn()],
						from: "center",
					}),
				});
				setTimeout(() => {
					setVisibleCards(videoCards());
					anime({
						targets: ".card",
						scale: [0, 1],
						delay: anime.stagger(50, {
							grid: [cardsPerRow(), cardsPerColumn()],
							from: "center",
						}),
						duration: 1000,
					});
				}, 1000);
			}, 10);
		}
	});

	// Solid.onMount(() => {
	// 	setTimeout(() => {
	// 		anime({
	// 			targets: ".card",
	// 			scale: [0, 1],
	// 			delay: anime.stagger(200, {
	// 				grid: [cardsPerRow(), cardsPerColumn()],
	// 				from: "first",
	// 			}),
	// 		});
	// 	}, 10);
	// });

	return (
		<ListContainer ref={containerRef}>
			{visibleCards().map((video, index) => {
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
