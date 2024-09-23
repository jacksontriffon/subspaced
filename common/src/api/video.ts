export interface VideoDetails {
	name: string;
	cover: string;
	clips: ClipDetails[];
}

export interface ClipDetails {
	videoName: string;
	videoPath: string;
	subtitles: string;
}
