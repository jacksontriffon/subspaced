# Turning movies into learning resources

In theory it's quite simple.
We take the subtitle file break the video into clips based on their timestamp and show the subtitles. The hard part comes in when we analyse those subtitles.

To be able to learn what subtitles means in japanese (or any foreign language) we need to break the subtitles up into phrases and be able to click and learn more about it's individual parts.

Our current workflow is as follows:

-   Assume subtitle are phrases
-   Use 'pykakasi' to break the subs into words
-   Search for each word using Jisho and add to phrase resource
-   Get examples for each word with Jisho
-   Analyse each letter and determine if kanji or not
    -   If kanji, use Jisho to get it's details
    -   Otherwise use chatGPT to find the particles and give details on what each one does

Ideally, this could be done much better with a search function similar to https://jpdb.io which is currently the best phrase, word, kanji and particle search and explanation out there.

In fact, ChatGPT may be able to find more accurate words than most search API's currently out there. Take this phrase for example "そして放送中は", most search API's cannot find the word "放送中" (broadcasting) instead the only identify "放送" (broadcast), chatGPT alone can identify the correct words ["そして", "放送中", "は"]. Perhaps it's best to leave kanji analysis to dictionaries, while leaving word analysis to chatGPT.
