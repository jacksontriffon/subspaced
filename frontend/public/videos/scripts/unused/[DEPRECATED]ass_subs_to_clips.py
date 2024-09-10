import os
import argparse
from moviepy.video.io.VideoFileClip import VideoFileClip
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip

def create_clips(input_folder):
    output_folder = os.path.join(input_folder, 'clips')
    os.makedirs(output_folder, exist_ok=True)

    for file_name in os.listdir(input_folder):
        if file_name.endswith('.ass'):
            base_name = os.path.splitext(file_name)[0]
            video_path = os.path.join(input_folder, f"{base_name}.mp4")
            subtitle_path = os.path.join(input_folder, file_name)

            if os.path.exists(video_path) and os.path.exists(subtitle_path):
                with open(subtitle_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()

                for line in lines:
                    if line.startswith('Dialogue:'):
                        parts = line.split(',')
                        start_time = parts[1]
                        end_time = parts[2]
                        start_time_seconds = sum(float(x) * 60 ** i for i, x in enumerate(reversed(start_time.split(':'))))
                        end_time_seconds = sum(float(x) * 60 ** i for i, x in enumerate(reversed(end_time.split(':'))))

                        timestamp = f"{start_time}_{end_time}"
                        timestamp = timestamp.replace(':', '_')
                        output_subfolder = os.path.join(output_folder, timestamp)
                        os.makedirs(output_subfolder, exist_ok=True)

                        output_filename = f"{output_subfolder}/clip_{timestamp}.mp4"
                        ffmpeg_extract_subclip(video_path, start_time_seconds, end_time_seconds, targetname=output_filename)

                        text_filename = f"{output_subfolder}/clip_{start_time}_{end_time}.txt"
                        text_filename = text_filename.replace(':', '_')
                        with open(text_filename, 'a', encoding='utf-8') as text_file:
                            text_file.write(line)

def main():
    parser = argparse.ArgumentParser(description='Create video clips based on subtitles.')
    parser.add_argument('--input_folder', required=True, help='Path to the folder containing both .ass and .mp4 files.')
    args = parser.parse_args()

    create_clips(args.input_folder)

if __name__ == "__main__":
    main()
