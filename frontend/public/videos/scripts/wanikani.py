import json

wanikani_db_path = "./testing/output/wanikani_subjects.json"


def find_in_wanikani(input_text: str) -> list[dict]:
    with open(wanikani_db_path, "r", encoding="utf-8") as db:
        db_dict: dict = json.load(db)
        matching_entries = []
        for subject in db_dict["subjects"]:
            if input_text == subject["data"]["characters"]:
                matching_entries.append(subject)
        return matching_entries
