import subprocess
import argparse


def get_phrase_by_search(phrase: str) -> dict:
    # Define the command to run the JavaScript script
    command = ["node", "../get_phrase_by_search.js", phrase]

    # Run the command and capture its output
    result = subprocess.run(command, capture_output=True, text=True, encoding="utf-8")

    # Check if the command executed successfully
    if result.returncode == 0:
        # Parse the output as JSON
        try:
            json_data = result.stdout
            print(json_data)
            return json_data
        except json_data.JSONDecodeError as e:
            print("Error parsing JSON:", e)
            return {}  # Return empty dictionary in case of JSON decoding error
    else:
        # Print an error message if the command failed
        print("An error occurred:", result.stderr)
        return {}  # Return empty dictionary in case of error


def get_phrase_by_scrape(phrase: str) -> dict:
    # Define the command to run the JavaScript script
    command = ["node", "../get_phrase_by_scrape.js", phrase]

    # Run the command and capture its output
    result = subprocess.run(command, capture_output=True, text=True, encoding="utf-8")

    # Check if the command executed successfully
    if result.returncode == 0:
        # Parse the output as JSON
        try:
            json_data = result.stdout
            print(json_data)
            return json_data
        except json_data.JSONDecodeError as e:
            print("Error parsing JSON:", e)
            return {}  # Return empty dictionary in case of JSON decoding error
    else:
        # Print an error message if the command failed
        print("An error occurred:", result.stderr)
        return {}  # Return empty dictionary in case of error


def get_kanji_details(kanji: str) -> dict:
    # Define the command to run the JavaScript script
    command = ["node", "../get_kanji.js", kanji]

    # Run the command and capture its output
    result = subprocess.run(command, capture_output=True, text=True, encoding="utf-8")

    # Check if the command executed successfully
    if result.returncode == 0:
        # Parse the output as JSON
        try:
            json_data = result.stdout
            print(json_data)
            return json_data
        except json_data.JSONDecodeError as e:
            print("Error parsing JSON:", e)
            return {}  # Return empty dictionary in case of JSON decoding error
    else:
        # Print an error message if the command failed
        print("An error occurred:", result.stderr)
        return {}  # Return empty dictionary in case of error


def get_examples(phrase: str) -> dict:
    # Define the command to run the JavaScript script
    command = ["node", "../get_examples.js", phrase]

    # Run the command and capture its output
    result = subprocess.run(command, capture_output=True, text=True, encoding="utf-8")

    # Check if the command executed successfully
    if result.returncode == 0:
        # Parse the output as JSON
        try:
            json_data = result.stdout
            print(json_data)
            return json_data
        except json_data.JSONDecodeError as e:
            print("Error parsing JSON:", e)
            return {}  # Return empty dictionary in case of JSON decoding error
    else:
        # Print an error message if the command failed
        print("An error occurred:", result.stderr)
        return {}  # Return empty dictionary in case of error


def main():
    parser = argparse.ArgumentParser(
        description="Create video clips based on subtitles."
    )
    parser.add_argument("--text", required=True, help="Phrase to get details")
    args = parser.parse_args()


if __name__ == "__main__":
    main()
