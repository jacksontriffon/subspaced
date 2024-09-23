import { ClipDetails, VideoDetails } from "common/api/video.js";
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
				req,
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
	// Required for video path
	req: Express.Request,
): Promise<VideoDetails[]> => {
	let all_video_details: VideoDetails[] = [];
	for (const videoName of videoNames) {
		const videoDetailsPath = path.join(
			directoryPath,
			videoName,
			"details.json",
		);
		const exists = await fileExists(videoDetailsPath);

		if (!exists) {
			console.error(videoName, "doesn't have details");
			continue;
		}

		try {
			const buffer = await fs.readFile(videoDetailsPath);
			const jsonString = buffer.toString();
			const jsonData = JSON.parse(jsonString);

			const clipsPath: string = path.join(
				directoryPath,
				videoName,
				"clips",
			);
			const clips = await getVideoClips(clipsPath, req, videoName);
			const videoDetailsWithClips: VideoDetails = { ...jsonData, clips };
			all_video_details.push(videoDetailsWithClips);
		} catch (err) {
			console.error("Error reading or parsing file:", err);
		}
	}
	return all_video_details;
};

const getVideoClips = async (
	clipsPath: string,
	// Required for video path
	req: Express.Request,
	videoName: string,
): Promise<ClipDetails[]> => {
	let videoClips: ClipDetails[] = [];
	const clipsFolderExists = await fileExists(clipsPath);
	if (!clipsFolderExists) {
		console.error("Clips folder doesn't exist!");
		return videoClips;
	}

	try {
		const clipNames: string[] = await fs.readdir(clipsPath);
		if (!clipNames || clipNames.length === 0) {
			console.error("No video clips found");
		}

		for (let clip of clipNames) {
			const clipDetails = await getClipDetails(
				clipsPath,
				clip,
				req,
				videoName,
			);
			if (clipDetails) {
				videoClips.push(clipDetails);
			}
		}
	} catch (err) {
		console.error("Error reading the clips directory:", err);
	}
	return videoClips;
};

const getClipDetails = async (
	clipsPath: string,
	clipName: string,
	// Required for video path name
	req: Express.Request,
	videoName: string,
): Promise<ClipDetails | null> => {
	const clipVideoPath = getClipVideoPath(req, videoName, clipName);
	const clipDetailsPath = path.join(
		clipsPath,
		clipName,
		"clip_" + clipName + ".json",
	);
	const detailsPathExists = await fileExists(clipDetailsPath);
	if (!detailsPathExists) {
		console.error("Clip details don't exist at: ", clipDetailsPath);
		return null;
	}
	const buffer = await fs.readFile(clipDetailsPath);
	const jsonString = buffer.toString();
	const clipDetails = JSON.parse(jsonString);
	return {
		subtitles: clipDetails.subtitles,
		videoName: clipDetails.name,
		videoPath: clipVideoPath,
	};
};

const getClipVideoPath = (
	req: Express.Request,
	videoName: string,
	clipName: string,
): string => {
	const baseUrl = `${req.protocol}://${req.get("host")}`;
	const fullUrl = `${baseUrl}/videos/videos/clips/${videoName}/${clipName}/clip_${clipName}.webm`;
	return fullUrl;
};

const fileExists = async (filePath: string): Promise<boolean> => {
	try {
		await fs.access(filePath, fs.constants.F_OK);
		return true;
	} catch {
		return false;
	}
};
