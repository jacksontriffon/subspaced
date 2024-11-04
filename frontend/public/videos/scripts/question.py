import openai
import os
from dotenv import load_dotenv, find_dotenv
import argparse
import json
from pathlib import Path

load_dotenv(find_dotenv())
openai.api_key = os.environ.get("OPENAI_API_KEY")


def is_valid_json(json_str):
    try:
        json.loads(json_str)
        return True
    except json.JSONDecodeError:
        return False


def get_translation_question(japanese_text: str) -> dict:
    prompt = f"""
        Translate the following subtitles and create three more incorrect translations for people learning Japanese. Return it in JSON format like the following:
        If subtitles are "＜謎のペンダントを持つ女の子シータを悪者達から守り→", return this
        {{
            "translation": "Protecting the girl Sheeta who possesses a mysterious pendant from the villains",
            "incorrect_translations": [ 
                "Protecting the mysterious girl's pendant from the villains",
                "Sheeta, the girl with the strange necklace, defends the villains.",
                "To save the evil people with the pendant that the girl Sheeta owns."
            ]
        }}
        """

    print("Translating with ChatGPT:", japanese_text)
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that translates Japanese subtitles.",
                },
                {"role": "user", "content": prompt},
                {"role": "user", "content": japanese_text},
            ],
            temperature=0.3,
        )
    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return {}

    content = response.choices[0].message.content
    print("Received:", content)
    if not is_valid_json(content):
        print("ChatGPT returned invalid JSON. Aborting...")
        return {}
    json_content = json.loads(content)
    if (
        "translation" not in json_content
        or "incorrect_translations" not in json_content
    ):
        print("Couldn't find necessary keys in the JSON response.")
        return {}

    return json_content


def update_json_file(file_path: Path, call_count: int, max_calls: int):
    if call_count >= max_calls:
        print(
            f"Reached the maximum API call limit of {max_calls}. Skipping further calls."
        )
        return call_count

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        japanese_text = data.get("subtitles", "")
        if not japanese_text:
            print(f"No 'subtitles' field found in {file_path}. Skipping...")
            return call_count

        translation_data = get_translation_question(japanese_text)
        if not translation_data:
            print(f"Failed to get translation for {file_path}. Skipping...")
            return call_count

        data.update(translation_data)

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

        print(f"Updated {file_path} successfully.")
        return call_count + 1

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return call_count


def main():
    parser = argparse.ArgumentParser(
        description="Recursively update JSON files with translations and incorrect options."
    )
    parser.add_argument(
        "--path",
        required=True,
        help="Path to the root directory containing JSON files.",
    )
    parser.add_argument(
        "--max-calls",
        type=int,
        default=1000,
        help="Maximum number of API calls to make.",
    )
    args = parser.parse_args()

    root_path = Path(args.path)
    if not root_path.exists():
        print(f"The path {root_path} does not exist.")
        return

    json_files = list(root_path.rglob("*.json"))
    if not json_files:
        print("No JSON files found.")
        return

    print(
        f"Found {len(json_files)} JSON files. Starting processing with a limit of {args.max_calls} API calls..."
    )
    call_count = 0
    for json_file in json_files:
        call_count = update_json_file(json_file, call_count, args.max_calls)
        if call_count >= args.max_calls:
            break


if __name__ == "__main__":
    main()
