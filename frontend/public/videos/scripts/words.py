import argparse
from letters import get_letter_details
from wanikani import find_in_wanikani


def get_word_details(word: str) -> dict:
    word_details = {"vocab_found": [], "letters": []}
    print("Finding word: ", word)
    wk_subjects: list = find_in_wanikani(word)

    for subject in wk_subjects:
        if subject["object"] == "vocabulary":
            word_details["vocab_found"].append(subject)
    if len(wk_subjects) == 0:
        jisho_word = get_word_from_jisho(word)
        word_details["vocab_found"].append(jisho_word)
    print("Found word details: ", wk_subjects)
    print("Searching letters in ", word)
    word_details["letters"] = get_letter_details(word)
    print("Found letters: ", word_details["letters"])
    return word_details


def get_word_from_jisho(word: str) -> dict:
    pass


def main():
    parser = argparse.ArgumentParser(
        description="Finds dictionary items based on words input."
    )
    parser.add_argument(
        "--text",
        required=False,
        help="Text to search for words.",
    )
    args = parser.parse_args()
    if args.text:
        print(get_word_details(args.text))


if __name__ == "__main__":
    main()
