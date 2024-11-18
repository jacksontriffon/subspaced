import * as Api from "common/api/index.ts";
import { createSignal } from "solid-js";
import * as Framework from "../framework/index.ts";

interface Preferences {
	clipsPerChapter: number;
}

const [preferences, setPreferences] = createSignal<Preferences>({
	clipsPerChapter: 5,
});

const localStorageKey = "preferences";

const savePreferences = () => {
	// TODO: Save to User in Db
	Framework.LocalStorage.writeJson(
		localStorageKey,
		JSON.stringify(preferences()),
	);
};

const loadPreferencesFromStorage = () => {
	// TODO: Load from DB
	const savedJson = String(Framework.LocalStorage.readJson(localStorageKey));
	if (Framework.isJsonString(savedJson)) {
		const savedPreferences: Preferences = JSON.parse(savedJson);
		setPreferences(savedPreferences);
	}
};

const removeLoadedVideo = () => {
	Framework.LocalStorage.remove(localStorageKey);
};

export {
	preferences,
	setPreferences,
	removeLoadedVideo,
	savePreferences,
	loadPreferencesFromStorage,
};
