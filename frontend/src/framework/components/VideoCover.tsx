import { styled } from "solid-styled-components";

export const VideoCover = styled.img<{ visible?: boolean }>`
	width: 72px;
	height: 110px;
	object-fit: cover;
	transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	border-radius: 4px;
	opacity: ${({ visible }) => (visible ? 1 : 0.5)};
	box-shadow: ${({ visible }) =>
		visible ? "10px 4px 8px rgba(0, 0, 0, 0.2)" : "none"};
`;
