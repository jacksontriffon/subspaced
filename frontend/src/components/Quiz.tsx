import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { currentVideo } from "../global/videoState.ts";
import { ClipDetails } from "common/api/video.js";
import { QuizChoice } from "./QuizChoice.tsx";
import { getCurrentClip } from "../utils/clipUtils.ts";
import { ProgressBar } from "./ProgressBar.tsx";

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
	const [totalCorrectAnswers, setTotalCorrectAnswers] =
		Solid.createSignal<number>(0);

	const currentClip = getCurrentClip();
	const totalQuestions = () =>
		(currentClip?.questions && currentClip.questions.length) ?? 0;
	const progress = () =>
		totalQuestions() > 0
			? (totalCorrectAnswers() / totalQuestions()) * 100
			: 0;

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
			<QuizContainer>
				<div style={{ position: "relative" }}>
					<QuizTitle answered={!!choiceSelected()}>
						Pick the most accurate translation
					</QuizTitle>
					<Result
						isCorrect={true}
						visible={
							!!choiceSelected() &&
							choiceSelected() === currentClip.translation
						}
					>
						Success
					</Result>
					<Result
						isCorrect={false}
						visible={
							!!choiceSelected() &&
							!(choiceSelected() === currentClip.translation)
						}
					>
						Failed.
					</Result>
				</div>

				{allTranslations.map((translation) => {
					return (
						<QuizChoice
							choiceSelected={choiceSelected}
							setChoiceSelected={setChoiceSelected}
							isCorrect={translation.isCorrect}
							text={translation.text}
							onClick={() => {}}
						/>
					);
				})}
			</QuizContainer>

			<ProgressBar percentage={progress()} />
		</form>
	);
}

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
	font-weight: 900;
	color: ${(props) =>
		props.isCorrect ? "rgba(60, 217, 104, 1)" : "rgba(239, 62, 33, 1)"};
	filter: ${(props) =>
		props.isCorrect
			? "drop-shadow(0 0 8px rgba(60, 217, 104, 1))"
			: "drop-shadow(0 0 8px rgba(239, 62, 33, 0.75))"};
	opacity: ${(props) => (props.visible ? 1 : 0)};
	top: -16px;
	transition: all 0.15s ease-out;
	transition-delay: 0.3s;
`;
