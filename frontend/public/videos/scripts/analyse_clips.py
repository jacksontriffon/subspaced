import os
import argparse
import json
from phrases import subs_to_phrases

# Important! [cd into the SCRIPTS folder]
# Usage: python analyse_clips.py --folder ../videos/PekoraFinalFantasyOrigin/ --start 5 --total 5


def analyse_phrases_in_clips(
    parent_folder_path: str, starting_index: int = 0, total_clips_to_analyse: int = 0
) -> None:
    if not os.path.exists(parent_folder_path):
        print(f"Error: folder does not exist at {parent_folder_path}")
        return
    all_file_paths: list[str] = get_tres_file_paths(parent_folder_path)
    file_paths_to_analyse = []
    if int(total_clips_to_analyse) > 0:
        file_paths_to_analyse = all_file_paths[
            int(starting_index) : int(starting_index) + int(total_clips_to_analyse)
        ]  # creates a subset of the array
    else:
        file_paths_to_analyse = all_file_paths[int(starting_index) :]

    for file_path in file_paths_to_analyse:
        subs: str = extract_subtitles_from_tres_file(file_path)
        phrases: list[dict] = subs_to_phrases(subs)
        # Dump into a json in the same folder
        json_path = file_path.removesuffix(".tres") + ".json"
        with open(json_path, "w", encoding="utf-8") as json_file:
            json.dump({"phrases": phrases}, json_file, ensure_ascii=False, indent=4)


# @deprecated
def update_phrases_in_tres_file(file_path: str, new_phrases: list[dict]) -> None:
    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    # Find the index of the line containing 'phrases'
    phrases_index = None
    for i, line in enumerate(lines):
        if "phrases =" in line:
            phrases_index = i
            break

    phrases_value = (
        '[ " ' + json.dumps({"phrases": new_phrases}).replace('"', '\\"') + ' " ]'
    )

    # If 'phrases' line is found, update it with the new value
    if phrases_index is not None:
        lines[phrases_index] = f"phrases = {phrases_value}"
    else:
        # If 'phrases' line does not exist, append it to the end of the file
        lines.append(f"phrases = {phrases_value}")

    # Write the updated lines back to the file
    with open(file_path, "w", encoding="utf-8") as file:
        file.writelines(lines)


def get_tres_file_paths(parent_folder_path: str) -> list[str]:
    tres_files = []
    for root, dirs, files in os.walk(parent_folder_path + "clips/"):
        for file in files:
            if file.endswith(".tres"):
                tres_files.append(root + "/" + file)
    return tres_files


def extract_subtitles_from_tres_file(file_path: str) -> str:
    subtitles = ""
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            if line.startswith("subtitles ="):
                # Extract the subtitles value from the line
                subtitles = line.split("=")[1].strip().strip('"')
                break  # Stop searching after finding the subtitles line
    return subtitles


def main():
    parser = argparse.ArgumentParser(
        description="Analyses phrases within clips in a given folder."
    )
    parser.add_argument(
        "--folder",
        required=True,
        help="Parent folder with clips",
    )
    parser.add_argument(
        "--start",
        required=False,
        help="First clip to analyse",
    )
    parser.add_argument(
        "--total",
        required=False,
        help="Total clips to analyse",
    )
    args = parser.parse_args()
    if args.start and args.total:
        analyse_phrases_in_clips(args.folder, args.start, args.total)
    elif args.start:
        analyse_phrases_in_clips(args.folder, args.start)
    else:
        analyse_phrases_in_clips(args.folder)


if __name__ == "__main__":
    main()
