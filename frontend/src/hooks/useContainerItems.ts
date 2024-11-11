import { createSignal, onCleanup, Accessor } from "solid-js";

interface UseContainerItemsProps {
	itemWidth: number;
	itemHeight: number;
	gapX?: number;
	gapY?: number;
	debug?: boolean;
	extraRows?: number;
}

interface UseContainerItemsResult {
	totalItems: Accessor<number>;
	containerRef: (el: HTMLElement | null) => void;
}

export function useContainerItems({
	itemWidth,
	itemHeight,
	gapX = 0,
	gapY = 0,
	debug = false,
}: UseContainerItemsProps): UseContainerItemsResult {
	const [totalItems, setTotalItems] = createSignal(0);

	const calculateItems = (container: HTMLElement | null) => {
		if (container) {
			const containerWidth = container.offsetWidth;
			const containerHeight = container.offsetHeight;

			// Include gaps in the calculation
			const effectiveItemWidth = itemWidth + gapX;
			const effectiveItemHeight = itemHeight + gapY;

			const itemsPerRow = Math.floor(
				(containerWidth + gapX) / effectiveItemWidth,
			);
			const itemsPerColumn = Math.floor(
				(containerHeight + gapY) / effectiveItemHeight,
			);

			setTotalItems(itemsPerRow * itemsPerColumn);

			if (debug) {
				console.log("Calculating... \n\n");
				console.log("Container Height:", containerHeight);
				console.log("Container Width:", containerWidth);
				console.log("Item Height:", effectiveItemHeight);
				console.log("Item Width:", effectiveItemWidth);
				console.log("Items per column:", itemsPerColumn);
				console.log("Items per row:", itemsPerRow);
				console.log("-----------------------------------");
			}
		}
	};

	const containerRef = (el: HTMLElement | null) => {
		if (el) {
			calculateItems(el);
			const resizeObserver = new ResizeObserver(() => calculateItems(el));
			resizeObserver.observe(el);

			// Cleanup the observer when the component is unmounted
			onCleanup(() => resizeObserver.disconnect());
		}
	};

	console.log(totalItems());

	return {
		totalItems,
		containerRef,
	};
}
