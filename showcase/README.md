# Browser demo gallery

Public watch page: https://spotibuds.github.io/.github/

The player uses native browser controls, inline mobile playback and English WebVTT captions. Hash links select each recording: `#overview`, `#discover`, `#favorites`, `#feed`, `#friends` and `#accounts`. Chapter buttons seek within the selected recording. Videos do not autoplay on arrival or when changing recordings.

GitHub Actions builds and deploys this static directory using GitHub Pages. The build fetches the six MP4 files from the pinned `demo-suite-2026-10-05` Frontend release, verifies each SHA-256 digest in `videos.json`, and adds them only to the Pages artifact. Video files are not committed to Git history. The gallery needs no app server, cloud credentials or music API.

To build locally, run `python scripts/build-showcase.py` from the repository root, then serve `_site` with a local HTTP server. An optional `--media-directory` points to an already downloaded copy of the release assets. Generated output is ignored by Git.

Posters are actual frames from the published recordings; the overview poster is the committed Frontend showcase image. Captions and chapter labels derive from that same release. The page inherits Spotibuds' existing neutral dark surfaces, lavender accent and Segoe UI type system. Desktop places the recording list beside the player; smaller viewports place it below. A single video element keeps playback and network work bounded to the active recording.
