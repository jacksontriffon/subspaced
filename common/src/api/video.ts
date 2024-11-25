export interface VideoDetails {
	name: string;
	cover: string;
	clips: ClipDetails[];
	currentClipIndex: number;
	currentChapter: number;
}

export interface ClipDetails {
	videoName: string;
	videoPath: string;
	subtitles: string;
	translation: string;
	incorrect_translations: string[];
	questions: Question[]
}

export interface Question {
	question: string;
	choices: Choice[];
}

export interface Choice {
	text: string;
	isCorrect: boolean;
}
