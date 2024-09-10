const fs = require("fs");

var apiToken = "12d7eba4-b861-4a90-9d08-959912b94657";
var apiEndpointPath = "subjects";
var requestHeaders = new Headers({
	Authorization: "Bearer " + apiToken,
});
var json_file_path = "../testing/output/wanikani_subjects.json";

const add_wanikani_subjects_from_index = async (index) => {
	var apiEndpoint = new Request(
		"https://api.wanikani.com/v2/" + apiEndpointPath + "/" + index,
		{
			method: "GET",
			headers: requestHeaders,
		},
	);
	let currentJsonData;
	fs.readFile(json_file_path, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading file:", err);
			return;
		}

		// Parse the JSON data
		currentJsonData = JSON.parse(data);
	});

	return fetch(apiEndpoint)
		.then((response) => response.json())
		.then((responseBody) => {
			// Add the new entry to the JSON data
			currentJsonData.data.push(responseBody);

			// Convert the updated JSON data back to string
			let updatedJsonData = JSON.stringify(currentJsonData, null, 2);

			// Write the updated JSON back to the file
			fs.writeFile(json_file_path, updatedJsonData, "utf8", (err) => {
				if (err) {
					console.error("Error writing file:", err);
					return;
				}
				console.log("File updated successfully.");
			});
		})
		.catch((err) => {
			console.log(err);
			throw err; // Throw the error to be caught in fetch_all_wanikani_subjects
		});
};

const fetch_all_wanikani_subjects = async () => {
	let current_index = 0;
	while (true) {
		try {
			await add_wanikani_subjects_from_index(current_index);
			current_index += 1000;
		} catch (err) {
			console.log("An error occurred:", err);
			break; // Break out of the loop if an error occurs
		}
	}
};

// fetch_all_wanikani_subjects();

const fetchAllSubjects = async () => {
	const requestHeaders = new Headers({
		"Wanikani-Revision": "20170710",
		Authorization: "Bearer " + apiToken,
	});

	let allSubjects = []; // Array to store all subjects
	let nextPageUrl = `https://api.wanikani.com/v2/${apiEndpointPath}`;
	const json_file_path = "./output/wanikani_subjects.json";

	try {
		while (nextPageUrl) {
			console.log("fetching...");
			const response = await fetch(nextPageUrl, {
				method: "GET",
				headers: requestHeaders,
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.statusText}`);
			}

			const responseBody = await response.json();
			const currentPageSubjects = responseBody.data;
			allSubjects = allSubjects.concat(currentPageSubjects);

			// Check if there's a next page
			nextPageUrl = responseBody.pages.next_url;
		}
		let updatedJsonData = JSON.stringify(allSubjects, null, 2);
		updatedJsonData = '{ "subjects":' + updatedJsonData + "}";
		fs.writeFile(json_file_path, updatedJsonData, "utf8", (err) => {
			if (err) {
				console.error("Error writing file:", err);
				return;
			}
			console.log("Subjects saved to ", json_file_path);
		});
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

fetchAllSubjects();
