import * as Solid from "solid-js";
import * as SolidWeb from "solid-js/web";
import * as Framework from "./framework/index.ts";
import * as App from "./app.tsx";
import * as Pages from "./pages.ts";
import {
	currentVideo,
	loadCurrentVideoFromStorage,
	removeLoadedVideo,
	saveVideoState,
} from "./global/videoState.ts";

SolidWeb.render(Root, document.getElementById("app")!);

function Root() {
	App.Api.authenticate();
	Framework.pwaEnable();
	// Framework.Analytics.init("G-PY955GS729")

	// Update current video with localStorage
	Solid.createEffect(() => {
		if (currentVideo() === null) {
			loadCurrentVideoFromStorage();
		} else if (currentVideo()?.clips.length === 0) {
			removeLoadedVideo();
		} else {
			saveVideoState();
		}
	});

	return (
		<>
			<Framework.GlobalCss extraCss={[App.usePrefsCss()]} />
			<Framework.Router
				routes={[
					{
						patterns: ["/", "/pwa_redirect"],
						load: async () =>
							(await import("./pages/PageHome.tsx")).PageHome,
					},

					{
						patterns: [
							Pages.Search.urlPattern,
							Pages.Search.urlPatternToken,
						],
						acceptsNoReload: true,
						load: async () =>
							(await import("./pages/PageSearch.tsx")).PageSearch,
					},

					{
						patterns: [Pages.KanjiWords.urlPattern],
						load: async () =>
							(await import("./pages/PageKanjiWords.tsx"))
								.PageKanjiWords,
					},

					{
						patterns: [Pages.LoginFake.urlPattern],
						load: async () =>
							(await import("./pages/PageLoginFake.tsx"))
								.PageLoginFake,
					},

					{
						patterns: [Pages.User.urlPattern],
						load: async () =>
							(await import("./pages/PageUser.tsx")).PageUser,
					},

					{
						patterns: [Pages.Studylist.urlPattern],
						load: async () =>
							(await import("./pages/PageStudylist.tsx"))
								.PageStudylist,
					},

					{
						patterns: [Pages.StudylistEditorJoin.urlPattern],
						load: async () =>
							(await import("./pages/PageStudylistJoin.tsx"))
								.PageStudylistJoin,
					},

					{
						patterns: [Pages.Community.url],
						load: async () =>
							(await import("./pages/PageCommunity.tsx"))
								.PageCommunity,
					},

					{
						patterns: [Pages.Help.url],
						load: async () =>
							(await import("./pages/PageHelp.tsx")).PageHelp,
					},

					{
						patterns: [Pages.HelpAnki.url],
						load: async () =>
							(await import("./pages/PageHelpAnki.tsx"))
								.PageHelpAnki,
					},

					{
						patterns: [Pages.HelpSymbols.url],
						load: async () =>
							(await import("./pages/PageHelpSymbols.tsx"))
								.PageHelpSymbols,
					},

					{
						patterns: [Pages.HelpFilters.url],
						load: async () =>
							(await import("./pages/PageHelpFilters.tsx"))
								.PageHelpFilters,
					},

					{
						patterns: [Pages.Log.url],
						load: async () =>
							(await import("./pages/PageLog.tsx")).PageLog,
					},

					{
						patterns: [Pages.Quiz.url],
						load: async () =>
							(await import("./pages/PageQuiz.tsx")).PageQuiz,
					},

					{
						patterns: [Pages.Watch.url],
						load: async () =>
							(await import("./pages/PageWatch.tsx")).PageWatch,
					},

					{
						patterns: ["*"],
						load: async () => () =>
							<Framework.Error message="Page not found" />,
					},
				]}
			/>
		</>
	);
}
