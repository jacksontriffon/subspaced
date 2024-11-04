import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo, setCurrentVideo } from "../global/videoState.ts";
import { ClipDetails } from "common/api/video.js";

const getCurrentClip = (): ClipDetails | null => {
	return currentVideo()?.clips[currentVideo()?.currentClipIndex ?? 0] ?? null;
};

function shuffleArray<T>(array: T[]): T[] {
	const result = array.slice(); // Make a copy to avoid mutating the original array
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]]; // Swap elements
	}
	return result;
}

export function Quiz() {
	const currentClip = getCurrentClip();
	if (!currentClip) {
		return <p>Clip not found</p>;
	}
	const allTranslations: { text: string; isCorrect: boolean }[] =
		shuffleArray([
			{ text: currentClip.translation, isCorrect: true },
			...currentClip.incorrect_translations.map((text) => ({
				text,
				isCorrect: false,
			})),
		]);

	return (
		<form>
			<fieldset>
				<legend>Pick the best translation</legend>
				{allTranslations.map((translation, i) => {
					return (
						<div>
							<input
								type="checkbox"
								class={
									translation.isCorrect
										? "correct"
										: "incorrect"
								}
								id={translation.text}
								name="translation"
								value={translation.text}
							/>
							<label for={translation.text}>
								{translation.text}
							</label>
						</div>
					);
				})}
			</fieldset>
		</form>
	);
}
