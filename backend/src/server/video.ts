import { VideoDetails } from "common/api/video.js";
import * as Express from "express";
import { promises as fs } from "fs"; // Use fs.promises for async operations
import * as path from "path";

export function init(app: Express.Application) {
	app.get("/videos", async (req, res) => {
		const directoryPath = "../frontend/public/videos/videos";

		try {
			const videoNames: string[] = await fs.readdir(directoryPath);
			if (!videoNames || videoNames.length === 0) {
				return res
					.status(404)
					.json({ message: "No videos found in the directory" });
			}
			const allVideoDetails = await getVideoDetails(
				directoryPath,
				videoNames,
			);
			res.json(allVideoDetails);
		} catch (err) {
			console.error("Error reading the directory:", err);
			return res.status(500).json({
				error: "Unable to scan directory",
				details: err.message,
			});
		}
	});
}

const getVideoDetails = async (
	directoryPath: string,
	videoNames: string[],
): Promise<VideoDetails[]> => {
	let all_video_details: VideoDetails[] = [];
	for (const folderName of videoNames) {
		const videoDetailsPath = path.join(
			directoryPath,
			folderName,
			"details.json",
		);
		const exists = await fileExists(videoDetailsPath);
		if (!exists) {
			console.error(folderName, "doesn't have details");
			continue;
		}
		try {
			const buffer = await fs.readFile(videoDetailsPath);
			const jsonString = buffer.toString();
			const jsonData = JSON.parse(jsonString);
			all_video_details.push(jsonData);
		} catch (err) {
			console.error("Error reading or parsing file:", err);
		}
	}
	return all_video_details;
};

const fileExists = async (filePath: string): Promise<boolean> => {
	try {
		await fs.access(filePath, fs.constants.F_OK);
		return true;
	} catch {
		return false;
	}
};
