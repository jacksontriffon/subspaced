import * as Solid from "solid-js";
import { styled } from "solid-styled-components";
import * as Framework from "../framework/index.ts";
import * as App from "../app.tsx";
import { UserLabel } from "./User.tsx";
import { SearchboxBottomOverlay } from "./Searchbox.tsx";

export function Page(props: {
	title?: string;
	children?: Solid.JSX.Element;
	searchQuery?: string;
}) {
	return (
		<>
			<Framework.Page
				siteTitle="Lorenzi's Jisho"
				title={props.title}
				sideMenu={() => <SideMenu />}
			>
				{props.children}
			</Framework.Page>

			<Framework.PageOverlay
				childrenBottom={
					<>
						<Framework.NavigationButtons />
						<SearchboxBottomOverlay
							searchQuery={props.searchQuery}
						/>
					</>
				}
			/>
		</>
	);
}

function SideMenu() {
	const authUser = Framework.createAsyncSignal(null, async () => {
		return await App.Api.authenticate();
	});

	const [isSettingsOpen, setSettingsOpen] = Solid.createSignal(false);

	const redirectUrl = window.location.href;

	return (
		<>
			<Solid.Show when={!isSettingsOpen()}>
				<Framework.ButtonPopupPageWide label="Home" href={"/"} />

				<Framework.ButtonPopupPageWide
					label="Community"
					href={App.Pages.Community.url}
				/>

				<Framework.ButtonPopupPageWide
					icon={<Framework.IconDownload />}
					label="Install App"
					onClick={Framework.pwaInstall}
				/>

				<Framework.HorizontalBar />

				<Framework.ButtonPopupPageWide
					icon={<Framework.IconWrench />}
					label="Settings"
					onClick={() => setSettingsOpen(true)}
				/>

				<Framework.ButtonPopupPageWide
					icon={<Framework.IconHelp />}
					label="Help"
					href={App.Pages.Help.url}
				/>

				<Framework.HorizontalBar />

				<Solid.Show
					when={!authUser().loading}
					fallback={<Framework.LoadingBar />}
				>
					<Solid.Show when={!authUser().latest?.id}>
						<Framework.ButtonPopupPageWide
							label="Log in"
							href={App.Api.Login.urlForRedirect(redirectUrl)}
							native
						/>
					</Solid.Show>

					<Solid.Show when={authUser().latest?.id}>
						<Framework.ButtonPopupPageWide
							label={<UserLabel user={authUser().latest} />}
							href={App.Pages.User.urlForUserId(
								authUser().latest!.id!,
							)}
						/>
						<Framework.ButtonPopupPageWide
							label="Log out"
							href={App.Api.Logout.urlForRedirect(redirectUrl)}
							native
						/>
						<Solid.Show
							when={App.Api.userIsAdmin(authUser().latest!)}
						>
							<Framework.HorizontalBar />

							<Framework.ButtonPopupPageWide
								label="Admin: Server Log"
								href={App.Pages.Log.url}
							/>

							<Framework.ButtonPopupPageWide
								label="Admin: Git Update"
								onClick={() => {
									if (
										!window.confirm(
											"Perform a git update on the server?",
										)
									)
										return;

									window.location.href =
										App.Api.AdminGitUpdate.url;
								}}
							/>

							<Framework.ButtonPopupPageWide
								label="Admin: DB Refresh"
								onClick={() => {
									if (
										!window.confirm(
											"Perform a DB refresh on the server?",
										)
									)
										return;

									window.location.href =
										App.Api.AdminDbRefresh.url;
								}}
							/>
						</Solid.Show>
					</Solid.Show>
				</Solid.Show>
			</Solid.Show>

			<Solid.Show when={isSettingsOpen()}>
				<SettingsPanel back={() => setSettingsOpen(false)} />
			</Solid.Show>
		</>
	);
}

function SettingsPanel(props: { back: () => void }) {
	return (
		<>
			<Framework.ButtonPopupPageWide
				icon={<Framework.IconArrowLeft />}
				label="Back"
				onClick={props.back}
			/>

			<Framework.Select
				label="Theme"
				value={() => App.usePrefs().theme}
				onChange={(value) => App.mergePrefs({ theme: value })}
				options={[
					{
						label: "System Light/Dark",
						value: Framework.systemThemeId,
					},
					...Framework.themes.map((th) => ({
						label: th.name,
						value: th.id,
					})),
				]}
			/>

			<Framework.HorizontalBar />

			<Framework.Select
				label="Searchbox Position"
				value={() => App.usePrefs().searchboxPosition}
				onChange={(value) =>
					App.mergePrefs({ searchboxPosition: value })
				}
				options={[
					{ label: "Top of Page", value: "inline" },
					{ label: "Bottom of Page", value: "bottom" },
				]}
			/>

			<Framework.Select
				label="Japanese Font Style"
				value={() => App.usePrefs().japaneseFontStyle}
				onChange={(value) =>
					App.mergePrefs({ japaneseFontStyle: value })
				}
				options={[
					{ label: "Regular", value: "regular" },
					{ label: "Half-Bold", value: "half-bold" },
					{ label: "Bold", value: "bold" },
				]}
			/>

			<Framework.Select
				label="Word Heading Size"
				value={() => App.usePrefs().resultsWordHeadingSize}
				onChange={(value) =>
					App.mergePrefs({ resultsWordHeadingSize: value })
				}
				options={[
					{ label: "Regular", value: "regular" },
					{ label: "Large", value: "large" },
					{ label: "Larger", value: "larger" },
					{ label: "Largest", value: "largest" },
				]}
			/>

			<Framework.Select
				label="Word Spellings"
				value={() =>
					App.usePrefs().resultsShowWordSpellings ? "on" : "off"
				}
				onChange={(value) =>
					App.mergePrefs({ resultsShowWordSpellings: value === "on" })
				}
				options={[
					{ label: "Toggleable", value: "off" },
					{ label: "Show Always", value: "on" },
				]}
			/>

			<Framework.Select
				label="Word Ranking Tags"
				value={() =>
					App.usePrefs().resultsShowWordRankings ? "on" : "off"
				}
				onChange={(value) =>
					App.mergePrefs({ resultsShowWordRankings: value === "on" })
				}
				options={[
					{ label: "Hide", value: "off" },
					{ label: "Show", value: "on" },
				]}
			/>

			<Framework.Select
				label="Example Sentences"
				value={() =>
					App.usePrefs().resultsShowExampleSentences ? "on" : "off"
				}
				onChange={(value) =>
					App.mergePrefs({
						resultsShowExampleSentences: value === "on",
					})
				}
				options={[
					{ label: "Hide until expanded", value: "off" },
					{ label: "Show always", value: "on" },
				]}
			/>

			<Framework.HorizontalBar />

			<Framework.Select
				label="Debug Mode"
				value={() => (App.usePrefs().debugMode ? "on" : "off")}
				onChange={(value) =>
					App.mergePrefs({ debugMode: value === "on" })
				}
				options={[
					{ label: "Off", value: "off" },
					{ label: "On", value: "on" },
				]}
			/>

			<Framework.Select
				label="Search-Only Headings"
				value={() =>
					App.usePrefs().resultsShowSearchOnlyHeadings ? "on" : "off"
				}
				onChange={(value) =>
					App.mergePrefs({
						resultsShowSearchOnlyHeadings: value === "on",
					})
				}
				options={[
					{ label: "Hide", value: "off" },
					{ label: "Show", value: "on" },
				]}
			/>
		</>
	);
}
