import * as Solid from "solid-js";
import * as Framework from "../framework/index.ts";
import * as App from "../app.tsx";
import { Page } from "../components/Page.tsx";
import { VideoListSelect } from "../components/VideoList.tsx";
import { VideoPlayer } from "../components/VideoPlayer.tsx";
import { currentVideo } from "../global/videoState.ts";
import { styled } from "solid-styled-components";

export function PageHome(props: Framework.RouteProps) {
	const [open, setOpen] = Solid.createSignal(false);
	const [currentVideoIndex, setCurrentVideoIndex] = Solid.createSignal<
		number | null
	>(null);
	Solid.createEffect(() => {
		if (!open()) {
			setCurrentVideoIndex(null);
		}
	});
	return (
		<Page>
			<Framework.Drawer open={open} setOpen={setOpen}>
				<VideoPlayer max_clips={5} />
				<StyledLink
					href={`search/${
						currentVideo()?.clips[
							currentVideo()?.currentClipIndex ?? 0
						].subtitles
					}`}
				>
					Begin Quiz
				</StyledLink>
			</Framework.Drawer>
			<VideoListSelect
				currentVideoIndex={currentVideoIndex}
				setCurrentVideoIndex={setCurrentVideoIndex}
				onChange={() => {
					setOpen(true);
				}}
			/>
		</Page>
	);
}

const StyledLink = styled.a`
	margin-top: 16px;
	background: linear-gradient(
		90deg,
		rgba(29, 153, 255, 0.2),
		rgba(0, 0, 0, 1)
	);
	transition: all 0.3s ease-in-out;
	display: block;
	min-width: 100%;
	text-align: center;
	padding: 10px;
	border-radius: 4px;
	border: 1px solid rgba(29, 153, 255, 1);
	font-size: 13px;
	width: 100%;
	outline: none;
	text-decoration: none;
	color: #f1fdfe;
`;
