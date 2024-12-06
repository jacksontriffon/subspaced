import { ClipDetails } from "common/api/video.js";
import { preferences } from "../global/preferencesState.ts";
import { currentVideo, setCurrentVideo } from "../global/videoState.ts";

export const currentChapter = (): number => currentVideo()?.currentChapter ?? 1;

export const indexOfLastClipInChapter = () =>
	currentChapter() * preferences().clipsPerChapter - 1;

export const indexOfFirstClipInChapter = () =>
	currentChapter() * preferences().clipsPerChapter -
	preferences().clipsPerChapter;

export const currentClipIndex = () => currentVideo()?.currentClipIndex ?? 0;

export const isLastClipOfCurrentChapter = () =>
	currentClipIndex() === indexOfLastClipInChapter();

export const clipIndexIsWithinChapter = () =>
	currentClipIndex() <= indexOfLastClipInChapter() &&
	currentClipIndex() >= indexOfFirstClipInChapter();

export const getCurrentClip = (): ClipDetails | null => {
	return currentVideo()?.clips[currentClipIndex() ?? 0] ?? null;
};

export const setCurrentClipIndex = (index: number) => {
	setCurrentVideo(
		(prev) =>
			prev && {
				...prev,
				currentClipIndex: index,
			},
	);
};

export const setCurrentChapter = (chapter: number) => {
	setCurrentVideo(
		(prev) =>
			prev && {
				...prev,
				currentClipIndex:
					chapter * preferences().clipsPerChapter -
					preferences().clipsPerChapter,
				currentChapter: chapter,
			},
	);
};

export const incrementCurrentVideo = () => {
	setCurrentVideo(
		(prev) =>
			prev && {
				...prev,
				currentClipIndex: prev.currentClipIndex + 1,
			},
	);
};
