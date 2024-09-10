// Docs - https://mistval.github.io/unofficial-jisho-api/API.html#searchForPhrase
// Usage - (cd into `./testing`) node ./test_phrase.js
const fs = require("fs");
const JishoAPI = require("unofficial-jisho-api");

const jisho = new JishoAPI();

// Works best for finding specific word or kanji details
const phrase = "ヘッヘッヘ～！(忍１)こら ナルト";

jisho.scrapeForPhrase(phrase).then((result) => {
	// Convert the data object to a JSON string
	const jsonData = JSON.stringify(result, null, 2); // null and 2 are for indentation

	// Write the JSON data to a file
	fs.writeFileSync("./output/scrape_phrase.json", jsonData);
});

jisho.searchForPhrase(phrase).then((result) => {
	// Convert the data object to a JSON string
	const jsonData = JSON.stringify(result, null, 2); // null and 2 are for indentation

	// Write the JSON data to a file
	fs.writeFileSync("./output/api_phrase.json", jsonData);
});

jisho.searchForExamples(phrase).then((result) => {
	// Convert the data object to a JSON string
	const jsonData = JSON.stringify(result, null, 2); // null and 2 are for indentation

	// Write the JSON data to a file
	fs.writeFileSync("./output/examples.json", jsonData);
});

jisho.searchForKanji(phrase).then((result) => {
	// Convert the data object to a JSON string
	const jsonData = JSON.stringify(result, null, 2); // null and 2 are for indentation

	// Write the JSON data to a file
	fs.writeFileSync("./output/kanji.json", jsonData);
});
