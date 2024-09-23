import * as Api from "common/api/index.ts";
import { VideoDetails } from "common/api/video.js";
import { createSignal } from "solid-js";

const [allVideos, setAllVideos] = createSignal<VideoDetails[]>([]);
const [currentVideo, setCurrentVideo] = createSignal<VideoDetails | null>(null);

export { allVideos, setAllVideos, currentVideo, setCurrentVideo };
