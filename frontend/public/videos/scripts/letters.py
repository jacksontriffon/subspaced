import re
import argparse
from wanikani import find_in_wanikani


def get_letter_details(word: str) -> list[dict]:
    letter_details = []
    for letter in split_japanese_text(word):
        last_letter_found = ""
        for subject in find_in_wanikani(letter):
            if subject["object"] == "kanji":
                letter_details.append(subject)
                last_letter_found = letter
        if last_letter_found != letter:
            letter_details.append(letter)
        # Currently only gets kanji details
    return letter_details  # [{letter_details...}, の, {...}, ...]


def split_japanese_text(text):
    # Use regex to match individual characters
    japanese_characters = re.findall(r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]", text)
    return japanese_characters


def main():
    parser = argparse.ArgumentParser(
        description="Splits words into letters and searches wanikani."
    )
    parser.add_argument(
        "--text",
        type=str,
        required=True,
        help="Text to search for letters.",
    )
    args = parser.parse_args()
    if args.text:
        get_letter_details(args.text)


if __name__ == "__main__":
    main()
