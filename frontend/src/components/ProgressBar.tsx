import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { IconUnlock } from "../framework/components/icons/IconUnlock.tsx";

export function ProgressBar({ percentage = 0 }: { percentage: number }) {
	return (
		<ProgressBarContainer>
			<ProgressBackground>
				<Progress percentage={percentage} />
			</ProgressBackground>
			<GoalCenter>
				<Goal>
					<GoalIcon>
						<IconUnlock />
					</GoalIcon>
				</Goal>
			</GoalCenter>
		</ProgressBarContainer>
	);
}

const ProgressBarContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

const ProgressBackground = styled.div`
	border: 1px solid #1d99ff;
	background: linear-gradient(
		150deg,
		rgba(8, 45, 75, 0.3),
		rgba(9, 48, 79, 1),
		rgba(9, 48, 79, 0.3),
		rgba(9, 48, 79, 1),
		rgba(9, 48, 79, 0.3),
		rgba(9, 48, 79, 1)
	);
	height: 24px;
	width: 100%;
	border-radius: 18px;
	display: flex;
	overflow: hidden;

	background-size: 200% 200%;
	-webkit-animation: Animation 5s infinite;
	-moz-animation: Animation 5s infinite;
	animation: Animation 5s infinite;
	animation-fill-mode: forwards;

	@-webkit-keyframes Animation {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 95% 0%;
		}
	}
	@-moz-keyframes Animation {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 95% 0%;
		}
	}
	@keyframes Animation {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 95% 0%;
		}
	}
`;

const Progress = styled.div<{ percentage: number }>`
	width: ${(props) => props.percentage}%;
	height: 100%;
	border: 1px solid #1d99ff;
	background: linear-gradient(
		150deg,
		rgba(29, 153, 255, 1),
		rgba(75, 13, 178, 1),
		rgba(29, 153, 255, 1),
		rgba(75, 13, 178, 1),
		rgba(29, 153, 255, 1),
		rgba(75, 13, 178, 1)
	);
	transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	border-radius: 18px;

	background-size: 200% 200%;
	-webkit-animation: Animation 5s infinite linear;
	-moz-animation: Animation 5s infinite linear;
	animation: Animation 5s infinite linear;
	animation-fill-mode: forwards;

	@-webkit-keyframes Animation {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 95% 0%;
		}
	}
	@-moz-keyframes Animation {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 95% 0%;
		}
	}
	@keyframes Animation {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 95% 0%;
		}
	}
`;

const GoalCenter = styled.div`
	position: relative;
	height: 42px;
	width: 21px;
`;

const Goal = styled.div`
	position: absolute;
	border: 2px solid #1d99ff;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 42px;
	right: 0px;
	height: 42px;
	background: linear-gradient(150deg, #2f8dda, #0d293f);
`;

const GoalIcon = styled.div`
	color: #8ccbff;
	padding-bottom: 2px;
`;
