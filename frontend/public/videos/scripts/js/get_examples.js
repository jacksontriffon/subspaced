const JishoAPI = require("unofficial-jisho-api");
const jisho = new JishoAPI();

// Get the phrase from command-line arguments
const phrase = process.argv[2];

const _searchExamplesPromise = jisho
	.searchForExamples(phrase)
	.then((result) => {
		console.log(JSON.stringify(result, null, 2));
	})
	.catch((error) => {
		console.error("Error: ", error);
	});
