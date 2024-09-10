import os
import argparse
import json
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI
from words import get_word_details
import pykakasi

load_dotenv(find_dotenv())
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


def subs_to_phrases(japanese_text: str) -> list[dict]:
    # Subs -> [{phrase_data}, ...]
    data: dict = get_phrases(japanese_text)
    phrases = data["phrases"]
    updated_phrases = []
    for phrase in phrases:
        updated_phrases.append(update_with_word_details(phrase))
    return updated_phrases


def update_with_word_details(phrase: dict) -> dict:
    if not "words" in phrase:
        print("Couldn't find words in phrase: ", phrase)
        return {}
    words = phrase["words"]
    index = 0
    for word in words:
        phrase["words"][index]["details"] = get_word_details(word["word"])
        index += 1
    return phrase


def get_phrases_with_pykakasi(japanese_text: str) -> dict:
    # Assume subs are a phrase with words within
    kks = pykakasi.kakasi()
    kks_words = kks.convert(japanese_text)
    print(kks_words)
    words = []
    for kks_word in kks_words:
        words.append(
            {
                "word": kks_word["orig"],
                "hiragana": kks_word["hira"],
                "romaji": kks_word["hepburn"],
            }
        )
    return {
        "subtitles": japanese_text,
        "translation": "",
        "phrases": [{"phrase": japanese_text, "translation": "", "words": words}],
    }


def get_phrases(japanese_text: str) -> dict:
    # Problem is... AI doesn't use all the words!
    prompt = """
    Use all the subtitles to make a list of phrases for people learning japanese. Return it in JSON format like the following: {
		"subtitles": "＜謎のペンダントを持つ女の子シータを悪者達から守り→",
		"translation": "Protecting the girl Sheeta who possesses a mysterious pendant from the villains",
		"phrases": [ 
			{ 
				"phrase": "謎のペンダント",
				"translation": "mysterious pendant",
				"words": [
					{
						"word": "謎の",
						"hiragana": "なぞの”,
                        "romaji": "nazono",
						"translation": "mysterious"
					}, ...
				]
			}, ...
		],
	}
    """
    # prompt = """
    # Break up these subtitles into a list of words for people learning japanese. Return it in JSON format like the following: {
    # 	"subtitles": "＜謎のペンダントを持つ女の子シータを悪者達から守り→",
    # 	"translation": "Protecting the girl Sheeta who possesses a mysterious pendant from the villains",
    # 	"phrases": [
    # 		{
    # 			"phrase": "謎のペンダント",
    # 			"translation": "mysterious pendant",
    # 			"words": [
    # 				{
    # 					"word": "謎の",
    # 					"hiragana": "なぞの”,
    # 					"translation": "mysterious",
    # 					"example": {
    # 						"sentence": ["これが", "謎の", "全てを", "解く", "鍵だ"],
    # 						"translation": "This is the key to solving all mysteries."
    # 					}
    # 				}, ...
    # 			]
    # 		}, ...
    # 	],
    # }
    # """
    prompt_without_whitespace = " ".join(prompt.split())
    print("Translating with chatGPT: ", japanese_text)
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt_without_whitespace},
            {"role": "user", "content": japanese_text},
        ],
        response_format={"type": "json_object"},
    )
    content = completion.choices[0].message.content
    print("Received: ", content)
    if not is_valid_json(content):
        print("ChatGPT returned invalid json. Aborting...")
        return {}
    json_content = json.loads(content)
    if not "phrases" in json_content:
        print("Couldn't find phrases within text: ", japanese_text)

    return json_content


def is_valid_json(json_str):
    try:
        json.loads(json_str)
        return True
    except json.decoder.JSONDecodeError:
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Generates phrases based on subtitles."
    )
    parser.add_argument(
        "--text",
        required=False,
        help="Text to generate phrases.",
    )
    args = parser.parse_args()
    if args.text:
        print("\n\nFinal result: \n\n", subs_to_phrases(args.text))


if __name__ == "__main__":
    main()
