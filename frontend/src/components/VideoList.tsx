import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import { VideoDetails } from "common/api/video.js";

export function VideoList() {
	const [videos, setVideos] = Solid.createSignal<VideoDetails[]>([]);

	Solid.createEffect(() => {
		fetch("/videos")
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error! Status: ${response.status}`);
				}
				return response.json(); // Parse as JSON
			})
			.then((data) => {
				setVideos(data);
			})
			.catch((error) => console.error("Error fetching videos:", error));
	});

	return (
		<ListContainer>
			{videos().length > 0 ? (
				videos().map((video, index) => (
					<ListItem>
						<VideoCover src={video.cover} alt={video.name} />
						<Framework.Link label={video.name} />
					</ListItem>
				))
			) : (
				<p>No videos found.</p>
			)}
		</ListContainer>
	);
}

const ListContainer = styled.ul`
	padding: 40px;
`;

const ListItem = styled.li`
	display: flex;
	margin: 24px 0px;
	gap: 16px;
	align-items: center;
`;

const VideoCover = styled.img`
	max-width: 200px;
	max-height: 100px;
`;
