import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { setCurrentVideo } from "../global/videoState.ts";
import {
	incrementCurrentVideo,
	isLastClipOfCurrentChapter,
} from "../utils/clipUtils.ts";

interface QuizChoiceProps extends Solid.ComponentProps<"label"> {
	isCorrect: boolean;
	text: string;
	choiceSelected: Solid.Accessor<string | null>;
	setChoiceSelected: Solid.Setter<string | null>;
}

export function QuizChoice({
	isCorrect,
	text,
	choiceSelected,
	setChoiceSelected,
	...labelProps
}: QuizChoiceProps) {
	const isLastQuestion = () => isLastClipOfCurrentChapter();

	const goToNextQuestion = () => {
		if (isLastClipOfCurrentChapter()) {
		}
		incrementCurrentVideo();
		window.location.reload();
	};

	return (
		<>
			<input
				type="checkbox"
				hidden="hidden"
				onChange={(e) => {
					setChoiceSelected(e.target.value);
					setTimeout(() => {
						goToNextQuestion();
					}, 3000);
				}}
				id={text}
				name="translation"
				value={text}
				disabled={!!choiceSelected()}
			/>
			<ChoiceLabel
				correct={isCorrect}
				answered={!!choiceSelected()}
				isSelected={choiceSelected() === text}
				for={text}
				{...labelProps}
			>
				{text}
			</ChoiceLabel>
		</>
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
			? "black linear-gradient(230deg, rgba(67, 245, 114, 0), rgba(67, 245, 114, 0.2), rgba(67, 245, 114, 0.2), rgba(67, 245, 114, 0))"
			: props.isSelected
			? "black linear-gradient(230deg, rgba(67, 245, 114, 0), rgba(239, 62, 33, 0.2), rgba(239, 62, 33, 0.2), rgba(67, 245, 114, 0))"
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
	&:hover {
		background: ${(props) =>
			props.answered
				? "black"
				: "linear-gradient(230deg, rgba(67, 245, 114, 0), rgba(155, 60, 204, 0.2), rgba(67, 245, 114, 0))"};
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
