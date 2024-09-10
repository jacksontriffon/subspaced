# Define default values for variables
FOLDER ?= ../videos/PekoraFinalFantasyOrigin/
START ?= 0
TOTAL ?= 5

# Turn a mp4 into snippets based on the subtitles srt file in its directory
snippet:
	python ./srt_subs_to_clips.py --input_folder $(FOLDER)

# Target to run the analyse_clips script with specified arguments
analyse:
	python analyse_clips.py --folder $(FOLDER) --start $(START) --total $(TOTAL)

# Target to run the srt_subs_to_clips and analyse_clips scripts with specified arguments
process:
	python ./srt_subs_to_clips.py --input_folder $(FOLDER)
	python analyse_clips.py --folder $(FOLDER)
