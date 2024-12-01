import * as Solid from "solid-js";
import { useContainerItems } from "./useContainerItems.ts";
import { allVideos } from "../global/videoState.ts";
import { VideoDetails } from "common/api/video.js";

export function useVideoCards({
	cardWidth,
	cardHeight,
	gapX = 0,
	gapY = 0,
	debug = false,
}: {
	cardWidth: number;
	cardHeight: number;
	gapX?: number;
	gapY?: number;
	debug?: boolean;
}) {
	const { totalItems, containerRef, itemsPerColumn, itemsPerRow } =
		useContainerItems({
			itemWidth: cardWidth,
			itemHeight: cardHeight,
			gapX,
			gapY,
			debug,
		});

	const [videoCards, setVideoCards] = Solid.createSignal<
		(VideoDetails | null)[]
	>([]);

	Solid.createEffect(() => {
		const totalVideos = allVideos().length;

		const minItems = totalItems();

		const newVideoCards = Array(minItems)
			.fill(null)
			.map((_, i) => allVideos()[i] || null);

		if (newVideoCards.length < minItems) {
			setVideoCards([
				...newVideoCards,
				...new Array(minItems - newVideoCards.length).fill(null),
			]);
		} else {
			setVideoCards(newVideoCards);
		}
	});

	const cardsPerRow = () => itemsPerRow();
	const cardsPerColumn = () => itemsPerColumn();

	return {
		videoCards,
		containerRef,
		cardsPerColumn,
		cardsPerRow,
	};
}
