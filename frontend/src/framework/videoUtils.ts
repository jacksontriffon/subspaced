import { VideoDetails } from "common/api/video.js";

export const getAllVideos = async (): Promise<VideoDetails[]> => {
	try {
		const response = await fetch("/videos");
		if (!response.ok) {
			throw new Error(`Error! Status: ${response.status}`);
		}
		const fetchedVideos: VideoDetails[] = await response.json();
		return fetchedVideos;
	} catch (error) {
		console.error("Error fetching videos:", error);
		return [];
	}
};
