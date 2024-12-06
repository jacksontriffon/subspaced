import * as Solid from "solid-js";
import { preferences } from "../global/preferencesState.ts";
import { currentVideo, setCurrentVideo } from "../global/videoState.ts";
import { styled } from "solid-styled-components";
import {
	currentChapter,
	setCurrentChapter,
	setCurrentClipIndex,
} from "../utils/clipUtils.ts";

export const VideoChapterList = () => {
	const totalChapters = Solid.createMemo(() =>
		!!currentVideo()
			? Math.floor(
					currentVideo().clips.length / preferences().clipsPerChapter,
			  )
			: 0,
	);

	const highlightedChapter = Solid.createMemo(() => currentChapter());
	const isChecked = (index: number) => index + 1 === highlightedChapter();

	let containerRef: Solid.Ref<HTMLUListElement>;

	return (
		<ChapterList ref={containerRef}>
			{Array.from({ length: totalChapters() }).map((_, index) => {
				const checked = isChecked(index);
				return (
					<RadioWrapper>
						<HiddenRadioInput
							type="radio"
							name="video-list"
							value={index}
							checked={checked}
							onChange={() => {
								setCurrentChapter(index + 1);
								containerRef.scrollTo({
									top: 0,
									behavior: "smooth",
								});
							}}
						/>

						<Chapter checked={checked}>
							<ChapterThumbnail
								controls={false}
								autoplay={false}
								src={
									currentVideo()?.clips[
										index * preferences().clipsPerChapter
									].videoPath
								}
							/>
							<ChapterTextContainer>
								<span>Chapter {index + 1}</span>
								{checked && (
									<ChapterStatus>Selected</ChapterStatus>
								)}
							</ChapterTextContainer>
						</Chapter>
					</RadioWrapper>
				);
			})}
		</ChapterList>
	);
};

const ChapterList = styled.ul`
	margin: 0;
	padding: 0;
`;

const RadioWrapper = styled.label`
	cursor: pointer;
	width: 72px;
	height: 110px;
`;

const HiddenRadioInput = styled.input`
	display: none;
`;

const Chapter = styled.li<{ checked: boolean }>`
	padding-top: 8px;
	padding-bottom: 8px;
	padding-left: 8px;
	padding-right: 8px;
	border-bottom: 1px solid #bcbcbc;
	list-style: none;
	display: flex;
	align-items: center;
	gap: 16px;
	background: ${({ checked }) =>
		checked
			? "linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3))"
			: ""};
`;

const ChapterTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const ChapterStatus = styled.span`
	font-size: 10px;
	color: #bcbcbc;
`;

const ChapterThumbnail = styled.video`
	user-select: none;
	width: 100px;
`;
