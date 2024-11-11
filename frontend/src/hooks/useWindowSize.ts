import { createSignal, onCleanup } from "solid-js";

export function useWindowSize() {
	// Initialize width and height signals
	const [width, setWidth] = createSignal(window.innerWidth);
	const [height, setHeight] = createSignal(window.innerHeight);

	// Define a function to update width and height on resize
	const handleResize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	// Attach event listener
	window.addEventListener("resize", handleResize);

	// Cleanup event listener on component unmount
	onCleanup(() => window.removeEventListener("resize", handleResize));

	// Return the width and height signals
	return { width, height };
}
