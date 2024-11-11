import { createSignal, onCleanup } from "solid-js";

export function useWindowSize() {
	const [width, setWidth] = createSignal(window.innerWidth);
	const [height, setHeight] = createSignal(window.innerHeight);

	const handleResize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	window.addEventListener("resize", handleResize);

	onCleanup(() => window.removeEventListener("resize", handleResize));

	return { width, height };
}
