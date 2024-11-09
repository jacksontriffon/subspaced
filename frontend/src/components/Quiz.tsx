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
	const [choiceSelected, setChoiceSelected] = Solid.createSignal<
		null | string
	>(null);
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

	const answeredCorrectly = allTranslations
		.map((translation) =>
			translation.text === choiceSelected()
				? translation.isCorrect
				: false,
		)
		.includes(true);

	return (
		<form>
			<QuizContainer>
				<div style={{ position: "relative" }}>
					<QuizTitle answered={!!choiceSelected()}>
						Pick the most accurate translation
					</QuizTitle>
					<Result
						isCorrect={true}
						visible={!!choiceSelected() && answeredCorrectly}
					>
						Success
					</Result>
					<Result
						isCorrect={false}
						visible={!!choiceSelected() && !answeredCorrectly}
					>
						Failed.
					</Result>
				</div>

				{allTranslations.map((translation, i) => {
					return (
						<>
							<input
								type="checkbox"
								hidden="hidden"
								onChange={(e) => {
									setChoiceSelected(e.target.value);
								}}
								id={translation.text}
								name="translation"
								value={translation.text}
								disabled={!!choiceSelected()}
							/>
							<ChoiceLabel
								correct={translation.isCorrect}
								answered={!!choiceSelected()}
								isSelected={
									choiceSelected() === translation.text
								}
								for={translation.text}
							>
								{translation.text}
							</ChoiceLabel>
						</>
					);
				})}
			</QuizContainer>
		</form>
	);
}

const ChoiceLabel = styled.label<{
	correct: boolean;
	answered: boolean;
	isSelected: boolean;
}>`
	transition: all 0.3s ease-in-out;
	display: block;
	min-width: 100%;
	text-align: center;
	padding: 10px;
	border-radius: 4px;
	border: ${(props) =>
		!props.answered
			? "1px solid #9b3ccc"
			: props.correct
			? "1px solid rgba(67, 245, 114, 1)"
			: props.isSelected
			? "1px solid rgba(239, 62, 33, 1)"
			: "1px solid rgba(126, 126, 126, 1)"};
	background: ${(props) =>
		!props.answered
			? "black"
			: props.correct
			? "black linear-gradient(230deg, rgba(67, 245, 114, 0), rgba(67, 245, 114, 0.2), rgba(67, 245, 114, 0))"
			: props.isSelected
			? "black linear-gradient(230deg, rgba(67, 245, 114, 0), rgba(239, 62, 33, 0.2), rgba(67, 245, 114, 0))"
			: "black"};
	opacity: ${(props) => (!props.answered || props.isSelected ? 1 : 0.5)};
	background-size: 400% 400%;
	cursor: ${(props) => (!props.answered ? "pointer" : "default")};
	animation: ${(props) =>
		props.isSelected
			? "gradient 2s cubic-bezier(0.075, 0.82, 0.165, 1), scale 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);"
			: ""};
	font-size: 13px;
	width: 100%;
	:hover {
		background: ${(props) =>
			!props.answered
				? "linear-gradient(230deg, rgba(67, 245, 114, 0), rgba(155, 60, 204, 0.2), rgba(67, 245, 114, 0))"
				: "black"};
	}
	@keyframes gradient {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 100%;
		}
	}
	@keyframes scale {
		0% {
			scale: 1;
		}
		50% {
			scale: 1.05;
		}
		100% {
			scale: 1;
		}
	}
`;

const QuizContainer = styled.fieldset`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 32px;
	justify-content: center;
	align-items: center;
	border: none;
`;

const QuizTitle = styled.legend<{ answered: boolean }>`
	display: block;
	transition: all 0.15s ease-in;
	width: 100%;
	text-align: center;
	opacity: ${(props) => (props.answered ? 0 : 1)};
	font-size: 13px;
	padding-bottom: 8px;
`;

const Result = styled.p<{ isCorrect: boolean; visible: boolean }>`
	position: absolute;
	width: 100%;
	text-align: center;
	font-size: 20px;
	color: ${(props) =>
		props.isCorrect ? "rgba(60, 217, 104, 1)" : "rgba(239, 62, 33, 1)"};
	filter: drop-shadow(0 0 8px rgba(239, 62, 33, 0.75));
	opacity: ${(props) => (props.visible ? 1 : 0)};
	top: -16px;
	transition: all 0.15s ease-out;
	transition-delay: 0.3s;
`;
