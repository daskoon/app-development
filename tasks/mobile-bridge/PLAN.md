# Plan: "Skoonbot" Rescue & Mobile Bridge

## Goal
Revive the user's existing "Skoonbot" identity as a standalone, lightweight Discord bot to serve as a mobile bridge to the local Gemini CLI. This bypasses the broken "OpenClaw" installation while keeping the bot the user already knows.

## Why this approach?
*   **User Preference:** The user already has "Skoonbot" set up on Discord.
*   **Simplicity:** We extract the credentials and run a simple Node.js script. No complex frameworks.
*   **Reliability:** Direct connection via `discord.js` is more stable than a complex wrapper.

## Prerequisites (Recovered)
*   **Bot Name:** Skoonbot
*   **Token:** `[REDACTED_DISCORD_TOKEN]` (Recovered from OpenClaw logs)
*   **Discord Server:** User already has the bot invited to a server.

## Step-by-Step Implementation Plan

### Phase 1: The "Skoonbot" Rebirth
1.  **Project Initialization:**
    *   Create `tasks/mobile-bridge/skoonbot`.
    *   Initialize Node.js project.
    *   Install `discord.js`, `dotenv`, `screenshot-desktop`.
2.  **Credential Migration:**
    *   Create `.env` file populated with the recovered Skoonbot token.
    *   **Action Required:** User will need to provide their User ID (I will provide a script to catch it).

### Phase 2: Bot Logic (`bot.js`)
1.  **Core Features:**
    *   **Vibe Check (`!status`):** Reports back "Skoonbot is alive and bridging."
    *   **Visuals (`!snap`):** Takes a screenshot of the host PC and sends it to chat.
    *   **Command (`!cmd`):** Runs terminal commands (e.g., `git status`, `npm test`) and replies with output.
2.  **Security:**
    *   Hardcode a check so the bot *only* responds to the user's specific Discord User ID.

### Phase 3: Launch & Verify
1.  **Start:** `node bot.js`
2.  **Verify:** User types `!ping` in their Discord server.
3.  **Lock:** Capture the User ID from the first message and save it to `.env`.

### Phase 4: Persistence
1.  **PM2:** Set up the bot to run forever in the background.

## User Action Items
*   [ ] Open the Discord server where Skoonbot is.
*   [ ] Wait for me to say "Go" and then type `!ping`.

