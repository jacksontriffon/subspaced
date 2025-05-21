# Subspaced

Learn Japanese through subtitles, featuring a full dictionary using [JMdict](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project) Japanese-English dictionary project!

Upload any video and .srt (subtitles file) and we break down your video into clips to quiz you on Vocabulary, Meaning and Pronunciation.


## Local Development

To start:

-   Use `node` version 16 (or greater).
-   In all of `common/`, `backend/`, and `frontend/`, execute `npm install`.
-   If you have MongoDB installed, in `backend/`, execute `npm run db-build` to download JMdict and build the database.

To work on the codebase, execute in parallel:

-   In `backend/`, execute `npm run dev` to start the server in watch mode. You can pass arguments to select between a few options for internal services. Remember to pass as `npm run dev -- --option`.

-   In `frontend/`, execute `npm run dev` to build and pack the frontend JavaScript files in watch mode.

-   Finally, you can access the page through `http://127.0.0.1`.

Shortcut to run everything is in `.vscode/tasks.json` - Use Ctrl+Shift+P and type `Tasks: Run Task` and select `Run All`.
