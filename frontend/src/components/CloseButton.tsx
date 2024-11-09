import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";

export function CloseButton() {
	return <StyledLink href="/">X</StyledLink>;
}

const StyledLink = styled.a`
	position: absolute;
	top: 4px;
	left: 4px;
	z-index: 100;
	color: white;
	padding: 10px;
	border-radius: 50%;
	width: 32px;
	height: 32px;
	text-align: center;
	font-size: 13px;
	font-weight: bold;
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(41, 41, 41, 0.6);
	border: 2px solid white;
`;
