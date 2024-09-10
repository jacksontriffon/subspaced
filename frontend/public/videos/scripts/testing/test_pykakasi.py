# Using this cmd prompt: python ./scripts/test_pykakasi.py --text [YOUR_JAPANESE_TEXT]

import argparse
from pykakasi import kakasi

def break_up_text(text: str):
    print(kakasi().convert(text))


def main():
    parser = argparse.ArgumentParser(description='Break Japanese into words')
    parser.add_argument('--text', required=True, help='Text to break into words')
    args = parser.parse_args()
    break_up_text(args.text)
    

if __name__ == "__main__":
    main()
