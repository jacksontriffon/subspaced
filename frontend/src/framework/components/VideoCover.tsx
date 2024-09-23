import { styled } from "solid-styled-components";

export const VideoCover = styled.img<{ isChecked?: boolean }>`
	width: 96px;
	height: 136px;
	object-fit: cover;
	transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

	border: ${({ isChecked }) =>
		isChecked ? "3px solid rgba(255, 255, 255, 1)" : ""};
	box-shadow: ${({ isChecked }) =>
		isChecked ? "10px 4px 8px rgba(0, 0, 0, 0.2)" : "none"};
`;
