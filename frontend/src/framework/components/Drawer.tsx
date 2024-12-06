import CorvuDrawer from "@corvu/drawer";
import { styled } from "solid-styled-components";
import * as Solid from "solid-js";

export const Drawer = ({
	open,
	setOpen,
	...divProps
}: {
	open: Solid.Accessor<boolean>;
	setOpen: Solid.Setter<boolean>;
} & Solid.ComponentProps<"div">) => {
	const { children, ...restOfDivProps } = divProps;
	return (
		<StyledDrawer
			open={open()}
			onOpenChange={setOpen}
			snapPoints={[1, 0.5, 0]}
		>
			<>
				<CorvuDrawer.Portal>
					<StyledDrawerContent>
						<DrawerContentContainer {...restOfDivProps}>
							<>
								<DrawerNotch />
								{children}
							</>
						</DrawerContentContainer>
					</StyledDrawerContent>
				</CorvuDrawer.Portal>
			</>
		</StyledDrawer>
	);
};

const StyledDrawer = styled(CorvuDrawer)`
	&[data-corvu-drawer-trigger] {
		border-width: 0;
		cursor: pointer;
		margin-top: auto;
		margin-bottom: auto;
		border-radius: 0.5rem;
		background-color: hsl(249, 87%, 94%);
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 500;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
		animation-duration: 100ms;
	}

	&[data-corvu-drawer-trigger]:hover {
		background-color: hsl(251, 86%, 89%);
	}

	&[data-corvu-drawer-trigger]:active {
		transform: translate(0px, 0.125rem);
	}

	&[data-corvu-drawer-overlay] {
		position: fixed;
		inset: 0px;
		z-index: 40;
	}

	&[data-corvu-drawer-overlay][data-transitioning] {
		transition-property: background-color;
		transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
		transition-duration: 500ms;
	}
`;
const StyledDrawerContent = styled(CorvuDrawer.Content)`
	box-sizing: border-box;
	border-width: 0;
	border-style: solid;
	position: fixed;
	left: 0px;
	right: 0px;
	bottom: 0px;
	z-index: 50;
	display: flex;
	height: 100%;
	max-height: 80vh;
	overflow: scroll;
	flex-direction: column;
	border-top-left-radius: 28px;
	border-top-right-radius: 28px;
	border-top-width: 2px;
	border-color: rgba(128, 128, 128, 0.8);
	background: linear-gradient(rgba(24, 45, 56, 0.3), rgba(3, 18, 27, 0.3));
	backdrop-filter: blur(16px);
	filter: drop-shadow(0 -5px 16px rgba(73, 73, 73, 0.75));
	padding-top: 0.75rem;
	outline: none;

	&::after {
		position: absolute;
		left: 0px;
		right: 0px;
		top: 100%;
		height: 50%;
		background-color: inherit;
		content: "";
	}

	&[data-transitioning] {
		transition-property: transform;
		transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
		transition-duration: 500ms;
	}

	@media (min-width: 768px) {
		&[data-corvu-drawer-content] {
			-webkit-user-select: none;
			user-select: none;
		}
	}

	&[data-corvu-drawer-label] {
		margin-top: 0.5rem;
		margin-bottom: 0px;
		text-align: center;
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
	}

	&[data-corvu-drawer-description] {
		margin-top: 0.25rem;
		text-align: center;
	}
`;

const DrawerContentContainer = styled.div`
	padding-left: 24px;
	padding-right: 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const DrawerNotch = styled.div`
	background-color: #929292;
	opacity: 0.5;
	border-radius: 8px;
	width: 20%;
	height: 6px;
	margin-bottom: 16px;
	margin-left: auto;
	margin-right: auto;
`;
