# Spotibuds

Music listening with a social side. Explore artists and albums, build playlists, discover listening activity and chat with friends across desktop and mobile.

[![Spotibuds: desktop listening and mobile chat](https://raw.githubusercontent.com/Spotibuds/Frontend/main/docs/portfolio/preview.jpg)](https://spotibuds.github.io/.github/#overview)

**[Watch the 1:16 overview with sound](https://spotibuds.github.io/.github/#overview)** · [Architecture and local setup](https://github.com/Spotibuds/Frontend/tree/main/docs/portfolio)

Watch directly in your browser with sound, captions and chapter navigation. No download or account is needed; the recordings are hosted independently of the app server.

## See it in action

| Video                                                                           | Length | Workflows                                                                                                 |
| ------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| [Overview](https://spotibuds.github.io/.github/#overview)                       | 1:16   | Audible listening, reactions, collections and independent desktop/mobile chat                             |
| [Discover and listen](https://spotibuds.github.io/.github/#discover)            | 1:54   | Home, catalogue paging, music/people search, playback, queue, album/artist links and mobile navigation    |
| [Favorites and playlists](https://spotibuds.github.io/.github/#favorites)       | 0:57   | Favorites, creation, covers, visibility, album/song additions, order, persistence and disposable deletion |
| [Feed and listening profiles](https://spotibuds.github.io/.github/#feed)        | 1:42   | All five feed cards, navigation, playback, reactions, profiles, post links and listening history          |
| [Friends, chat and notifications](https://spotibuds.github.io/.github/#friends) | 1:24   | Request/cancel/decline/accept, profile messaging, delivery, receipts, saved chats and inbox actions       |
| [Accounts and administration](https://spotibuds.github.io/.github/#accounts)    | 1:46   | Registration, profile/avatar/privacy, sign-in/out, recovery limits and administration previews            |

These are recordings of the deployed app using existing music and synthetic participants. Listening scenes include actual playback audio. Matching captions, chapter timestamps and checksums accompany the [demo release](https://github.com/Spotibuds/Frontend/releases/tag/demo-suite-2026-10-05). [Coverage plan](https://github.com/Spotibuds/Frontend/blob/main/docs/demo-coverage.md) · [Timestamped action index](https://github.com/Spotibuds/Frontend/blob/main/docs/demo-coverage.json).

## How it is built

| Repository                                        | Responsibility                                                                                           |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Frontend](https://github.com/Spotibuds/Frontend) | Next.js, React and TypeScript interface; shared player, responsive navigation and session coordination   |
| [Identity](https://github.com/Spotibuds/Identity) | ASP.NET Core accounts, roles and cookie-based refresh sessions; PostgreSQL                               |
| [Music](https://github.com/Spotibuds/Music)       | ASP.NET Core catalogue, playlists and media access; MongoDB and Azure Blob Storage                       |
| [User](https://github.com/Spotibuds/User)         | ASP.NET Core profiles, listening history, feed, friendships, notifications and chat; MongoDB and SignalR |

Docker services run behind Caddy HTTPS on an Azure VM. Media byte ranges support progressive playback and seeking. The single-instance deployment uses an expiring in-memory now-playing cache.

The recorded source passed 234 frontend tests, TypeScript, ESLint and a production build; 31 live checks were repeated after recording. [Verification and scope](https://github.com/Spotibuds/Frontend/blob/main/docs/portfolio/showcase-verification.json).

## Run the project

Follow the [isolated local demo guide](https://github.com/Spotibuds/Frontend/tree/main/demo) for sibling repositories, generated secrets, dependencies, migrations, fixture data and verification. The local setup uses generated audio fixtures and does not require cloud credentials or production music downloads.

The public deployment is a single-instance demo. Production recovery email awaits a relay; the recording shows that limitation. Administration changes are previewed or canceled to preserve the catalogue. Mobile demos show the responsive web app. Broader load and device certification remain future work.
