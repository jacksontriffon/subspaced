import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { setAllVideos } from "../global/videoState.ts";
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

	const loadingAnimation = () =>
		anime({
			targets: ".card",
			scale: () => {
				const rand = Math.random();
				return [1, rand];
			},
			rotate: () => {
				const rand = Math.random();
				return [0, rand * 10];
			},
			loop: true,
			direction: "alternate",
			easing: "linear",
			duration: 10000,
		});

	const finishedLoadingAnimation = () =>
		anime({
			targets: ".card",
			scale: [0, 1],
			delay: anime.stagger(50, {
				grid: [cardsPerRow(), cardsPerColumn()],
				from: "center",
			}),
			duration: 1000,
		});

	Solid.createEffect(() => {
		if (loading()) {
			setVisibleCards(emptyVideoCards());
			setTimeout(() => {
				loadingAnimation();
			}, 10);
		} else {
			// Transition cards animation
			setTimeout(() => {
				setVisibleCards(videoCards());
				finishedLoadingAnimation();
			}, 10);
		}
	});

	return (
		<>
			<ListContainer ref={containerRef}>
				{visibleCards().map((video, index) => {
					let checked = index === currentVideoIndex();
					return (
						<VideoCard
							checked={checked}
							index={index}
							currentVideoIndex={currentVideoIndex}
							onChange={() => {
								anime({
									targets: ".card",
									scale: [0.5, 1],
									delay: anime.stagger(100, {
										grid: [cardsPerRow(), cardsPerColumn()],
										from: index,
									}),
								});
								onChange();
							}}
							setCurrentVideoIndex={setCurrentVideoIndex}
							video={video}
							loading={loading}
						/>
					);
				})}
			</ListContainer>
		</>
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
