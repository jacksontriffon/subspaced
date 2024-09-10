# Using this cmd prompt: python ./scripts/test_pykakasi.py --text [YOUR_JAPANESE_TEXT]

import argparse
import budoux

def break_up_text(text: str):
    parser = budoux.load_default_japanese_parser()
    print(parser.parse(text))


def main():
    parser = argparse.ArgumentParser(description='Break Japanese into words')
    parser.add_argument('--text', required=True, help='Text to break into words')
    args = parser.parse_args()
    break_up_text(args.text)
    

if __name__ == "__main__":
    main()
