export interface VideoDetails {
	name: string;
	cover: string;
	clips: ClipDetails[];
	currentClipIndex: number;
}

export interface ClipDetails {
	videoName: string;
	videoPath: string;
	subtitles: string;
}
