import * as Api from "common/api/index.ts";
import { VideoDetails } from "common/api/video.js";
import { createSignal } from "solid-js";
import * as Framework from "../framework/index.ts";

const [allVideos, setAllVideos] = createSignal<VideoDetails[]>([]);
const [currentVideo, setCurrentVideo] = createSignal<VideoDetails | null>(null);

const saveVideoState = () => {
	Framework.LocalStorage.writeJson(
		"currentVideo",
		JSON.stringify(currentVideo()),
	);
};

const loadCurrentVideoFromStorage = () => {
	const savedJson = String(Framework.LocalStorage.readJson("currentVideo"));
	if (Framework.isJsonString(savedJson)) {
		const savedVideo: VideoDetails = JSON.parse(savedJson);
		setCurrentVideo(savedVideo);
	}
};

const removeLoadedVideo = () => {
	Framework.LocalStorage.remove("currentVideo");
};

export {
	allVideos,
	setAllVideos,
	currentVideo,
	setCurrentVideo,
	saveVideoState,
	loadCurrentVideoFromStorage,
	removeLoadedVideo,
};
