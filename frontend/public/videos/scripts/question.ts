import { Configuration, OpenAIApi } from "openai";
import { promises as fs } from "fs";
import path from "path";
import { Command } from "commander";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function isValidJson(jsonStr: string): Promise<boolean> {
	try {
		JSON.parse(jsonStr);
		return true;
	} catch {
		return false;
	}
}

interface TranslationResponse {
	translation: string;
	incorrect_translations: string[];
}

async function getTranslationQuestion(
	japaneseText: string,
): Promise<TranslationResponse | null> {
	const prompt = `
        Translate the following subtitles and create three more incorrect translations for people learning Japanese. Return it in JSON format like the following:
        If subtitles are "＜謎のペンダントを持つ女の子シータを悪者達から守り→", return this
        {
            "translation": "Protecting the girl Sheeta who possesses a mysterious pendant from the villains",
            "incorrect_translations": [ 
                "Protecting the mysterious girl's pendant from the villains",
                "Sheeta, the girl with the strange necklace, defends the villains.",
                "To save the evil people with the pendant that the girl Sheeta owns."
            ]
        }
    `;

	console.log("Translating with OpenAI:", japaneseText);

	try {
		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant that translates Japanese subtitles.",
				},
				{ role: "user", content: prompt },
				{ role: "user", content: japaneseText },
			],
			temperature: 0.3,
		});

		const content = response.data.choices[0].message.content;
		if (await isValidJson(content)) {
			const jsonContent: TranslationResponse = JSON.parse(content);
			if (jsonContent.translation && jsonContent.incorrect_translations) {
				return jsonContent;
			}
		}
		console.error("Invalid response structure:", content);
	} catch (error) {
		console.error("OpenAI API error:", error);
	}

	return null;
}

async function updateJsonFile(
	filePath: string,
	callCount: number,
	maxCalls: number,
	overwrite: boolean,
): Promise<number> {
	if (callCount >= maxCalls) {
		console.log(
			`Reached the maximum API call limit of ${maxCalls}. Skipping further calls.`,
		);
		return callCount;
	}

	try {
		const data: any = JSON.parse(await fs.readFile(filePath, "utf8"));

		if (data.translation && !overwrite) {
			console.log(
				`Skipping ${filePath} (already contains 'translation').`,
			);
			return callCount;
		}

		const japaneseText = data.subtitles;
		if (!japaneseText) {
			console.log(
				`No 'subtitles' field found in ${filePath}. Skipping...`,
			);
			return callCount;
		}

		const translationData = await getTranslationQuestion(japaneseText);
		if (!translationData) {
			console.log(
				`Failed to get translation for ${filePath}. Skipping...`,
			);
			return callCount;
		}

		Object.assign(data, translationData);
		await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf8");
		console.log(`Updated ${filePath} successfully.`);
		return callCount + 1;
	} catch (error) {
		console.error(`Error processing ${filePath}:`, error);
		return callCount;
	}
}

async function main() {
	const program = new Command();
	program
		.requiredOption(
			"--path <path>",
			"Path to the root directory containing JSON files.",
		)
		.option(
			"--max-calls <number>",
			"Maximum number of API calls to make.",
			parseInt,
			10,
		)
		.option(
			"--overwrite",
			"Overwrite existing translations if present.",
			false,
		);
	program.parse(process.argv);

	const options = program.opts();
	const rootPath = path.resolve(options.path);
	const maxCalls = options.maxCalls || 10; // Default value if not specified
	const overwrite = options.overwrite;

	try {
		const files = await fs.readdir(rootPath, { withFileTypes: true });
		const jsonFiles: string[] = [];

		for (const file of files) {
			if (file.isFile() && file.name.endsWith(".json")) {
				jsonFiles.push(path.join(rootPath, file.name));
			}
		}

		console.log(
			`Found ${jsonFiles.length} JSON files. Starting processing with a limit of ${maxCalls} API calls...`,
		);
		let callCount = 0;

		for (const jsonFile of jsonFiles) {
			callCount = await updateJsonFile(
				jsonFile,
				callCount,
				maxCalls,
				overwrite,
			);
			if (callCount >= maxCalls) break;
		}
	} catch (error) {
		console.error("Error reading directory:", error);
	}
}

main().catch((error) => console.error("Script error:", error));
