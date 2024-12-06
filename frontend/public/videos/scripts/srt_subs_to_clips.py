import os
import re
import argparse
import json
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip


def create_clip_json(resource_path: str, subtitles: str, details: dict):
    with open(resource_path, "w", encoding="utf-8") as resource_file:
        json_dict = {
            "subtitles": subtitles,
        }
        json_dict.update(details)
        json.dump(json_dict, resource_file, ensure_ascii=False)


def generate_clip(video_path, details, start_time, end_time, text, output_folder):
    start_time_seconds = sum(
        float(x) * 60**i for i, x in enumerate(reversed(start_time.split(":")))
    )
    end_time_seconds = sum(
        float(x) * 60**i for i, x in enumerate(reversed(end_time.split(":")))
    )

    timestamp = f"{start_time}_{end_time}"
    timestamp = timestamp.replace(":", "_")
    output_subfolder = os.path.join(output_folder, timestamp)
    os.makedirs(output_subfolder, exist_ok=True)

    output_filename = f"{output_subfolder}/clip_{timestamp}.mp4"
    ffmpeg_extract_subclip(
        video_path, start_time_seconds, end_time_seconds, targetname=output_filename
    )

    clip_resource_name = f"{output_subfolder}/clip_{start_time}_{end_time}.json"
    clip_resource_name = clip_resource_name.replace(":", "_")
    create_clip_json(clip_resource_name, text, details)


def create_clips(input_folder: str):
    if not os.path.exists(input_folder):
        print("Input folder needs to exist!")
        return

    output_folder = os.path.join(input_folder, "clips")
    os.makedirs(output_folder, exist_ok=True)

    details = {}
    details_path = os.path.join(input_folder, "details.json")
    if os.path.exists(details_path):
        with open(details_path, "r", encoding="utf-8") as details_json:
            details = json.load(details_json)
    else:
        print("\033[31mNo Details Found\033[0m")

    for file_name in os.listdir(input_folder):
        if file_name.endswith(".srt"):
            base_name = os.path.splitext(file_name)[0]
            subtitle_path = os.path.join(input_folder, file_name)
            video_path = os.path.join(input_folder, f"{base_name}.mp4")

            # Split videos
            if os.path.exists(video_path) and os.path.exists(subtitle_path):
                # Read subs
                with open(subtitle_path, "r", encoding="utf-8") as f:
                    content = f.readlines()

                subtitles = re.split(r"\n\s*\n", "".join(content))
                for subtitle in subtitles:
                    # index
                    lines = subtitle.strip().split("\n")
                    if len(lines) >= 3:
                        # index = int(lines[0])
                        times = re.findall(r"(\d{2}:\d{2}:\d{2},\d{3})", lines[1])
                        if len(times) == 2:
                            start_time = times[0].replace(",", ".")
                            end_time = times[1].replace(",", ".")
                            text = "\n".join(lines[2:])
                            clean_text = text.replace("\u3000", " ")
                            generate_clip(
                                video_path,
                                details,
                                start_time,
                                end_time,
                                clean_text,
                                output_folder,
                            )


def main():
    parser = argparse.ArgumentParser(
        description="Create video clips based on subtitles."
    )
    parser.add_argument(
        "--path",
        required=True,
        help="Path to the folder containing both .srt and .mp4 files.",
    )
    args = parser.parse_args()

    create_clips(args.path)


if __name__ == "__main__":
    main()
