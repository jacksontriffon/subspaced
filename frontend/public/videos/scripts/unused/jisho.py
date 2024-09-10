import argparse
import requests
from bs4 import BeautifulSoup

url = "https://jisho.org"


def break_into_words(japanese_text: str):
    words_to_return = []
    search_url = url + "/search/" + japanese_text

    # Send a GET request to the URL
    response = requests.get(search_url)

    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, "html.parser")

        # Extract specific information from the page
        # For example, let's extract all the links on the page
        words = soup.find_all(class_="japanese_word")
        for word in words:
            furigana_wrapper = word.find(class_="japanese_word__furigana_wrapper")
            word_has_no_kanji = len(furigana_wrapper.contents) == 0
            word_segments = []
            word_kanji = ""
            word_furigana = ""
            if word_has_no_kanji:
                link = word.find("a")
                if link:
                    word_kanji = link.text
                else:
                    word_kanji = word.find(class_="japanese_word__text_wrapper").text

            else:
                spans = word.find_all(class_="japanese_word__furigana")
                for span in spans:
                    if span.get("class")[0] == "japanese_word__furigana":
                        kanji_segment = span.get("data-text")
                        furigana_segment = span.text
                        word_kanji += kanji_segment
                        word_furigana += furigana_segment
                        word_segments.append(
                            {"kanji": kanji_segment, "furigana": furigana_segment}
                        )
            words_to_return.append(
                {
                    "word": word_kanji,
                    "furigana": word_furigana,
                    "letters": word_segments,
                }
            )

    else:
        print("Failed to retrieve the webpage")
    print(words_to_return)


def main():
    parser = argparse.ArgumentParser(
        description="Searches Jisho.org using the text provided."
    )
    parser.add_argument(
        "--text",
        type=str,
        required=True,
        help="Text to search in Jisho.",
    )
    args = parser.parse_args()
    if args.text:
        break_into_words(args.text)


if __name__ == "__main__":
    main()
