import json


def reorganize_json(input_file, output_file):
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    subjects_dict = {}
    for subject in data["subjects"]:
        characters = subject["data"]["characters"]
        subjects_dict[characters] = subject

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump({"subjects": subjects_dict}, f, indent=2, ensure_ascii=False)


# Example usage:
input_file = "./wanikani_subjects.json"  # Replace with your input JSON file path
output_file = (
    "./wanikani_subjects_reorganised.json"  # Replace with desired output JSON file path
)

reorganize_json(input_file, output_file)
