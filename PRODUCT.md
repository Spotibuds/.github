# Spotibuds showcase

Spotibuds combines catalogue browsing, music playback, favorites, playlists, social listening, profiles, friends, chat and notifications. Its public repositories contain the implementation and local setup instructions.

This repository holds the organization profile and a static gallery of six actual desktop and mobile browser recordings. Visitors can watch with sound, use English captions, seek through chapters and share a specific demo without signing in or saving a video file. The gallery uses no application APIs or Azure assets and survives retirement of the app server.

The recordings reuse existing catalogue media and synthetic demonstration accounts. Administrative catalogue writes and role changes are previews; production password recovery was unavailable during recording. Evidence and detailed limitations remain in the Frontend repository.

The gallery extends the existing Spotibuds dark design system recorded in `../Frontend/DESIGN.md`: neutral surfaces, lavender accents, Segoe UI typography and artwork-first content. The experience mode is Experience. The video is the primary artifact; surrounding controls should be quiet, legible and easy to operate on desktop and mobile.
