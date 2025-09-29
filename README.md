# Steam Backlog Tracker

![screenshot](public/website-screenshot-1.jpg?raw=true)

This tool shows all games in your Steam library and helps you sort which games you have and haven't played. You can also roll for random suggestions on what games to play next.

## Usage

- Open the website at [natanmaia95.github.io/steam-backlog-tracker/](https://natanmaia95.github.io/steam-backlog-tracker/)
- Open 'Settings' by clicking the gear button on the top right, insert your Steam Account ID (a 17 digit number below your nickname in [store.steampowered.com/account](https://store.steampowered.com/account)), and click Apply
- If you see the games you own in your account, now you can click on them to mark as played/unplayed.

## Technologies

The front-end uses Angular (version 20), on top of HTML/CSS/Typescript. It communicates with the Steam Web API.
It's a static website which means the hosted version needs a back-end to route the requests around CORS; mine is made with Node.js and Express.

## Running Locally (WIP)

To open the front-end server on `http://localhost:4200/` run:

```bash
npm start
```
(WIP) Currently the static front-end uses a back-end I host to route the Steam API requests (in the steam-api.ts file). When running locally you can modify that request to reach the Steam API directly, with your own API key.

## Building

To build the project, run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `docs/` directory.
