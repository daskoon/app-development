# TODO: Skoonbot Mobile Bridge

- [x] **Phase 1: Project Setup (Skoonbot Rescue)**
  - [x] Create directory `tasks/mobile-bridge/skoonbot` [backend]
  - [x] Initialize project and install `discord.js dotenv screenshot-desktop` [backend]
  - [x] Create `.env` with the recovered Skoonbot token [backend] [security]
  - [x] Create `.gitignore` to protect the token [backend]

- [x] **Phase 2: Bot Implementation**
  - [x] Write `bot.js` to connect as "Skoonbot" [backend]
  - [x] Implement `!snap` command for remote screenshots [backend]
  - [x] Implement `!cmd` command for remote shell execution [backend]
  - [x] Implement `!status` command [backend]
  - [x] **Security:** Add middleware to log User ID on first contact and then enforce allowlist [backend] [security]

- [ ] **Phase 3: Deployment & Lockdown**
  - [x] Run bot locally [test]
  - [ ] Instruct user to ping the bot to capture User ID [test]
  - [ ] Update `.env` with `ALLOWED_USER_ID` [security]
  - [ ] Verify `!snap` works and sends an image to the phone [test]

- [ ] **Phase 4: Persistence**
  - [ ] Create a `start.bat` or PM2 config to keep Skoonbot running [backend]
