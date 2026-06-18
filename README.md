# Applyd

A CLI I built to help me look for new opporunities. Scans your Gmail for job application emails, uses an LLM to extract company, role, status, and date, and stores everything locally in JSON for fast lookup.

## Demo

[Here's a demo I recorded on Loom:](https://www.loom.com/share/65c8eb6ed16d43b7be87b8fd0b04950b)


## Commands

```bash
npm run auth      # Connect Gmail (one-time)
npm run sync      # Fetch + parse + update local storage
npm run list      # Show all saved applications
npm run summary   # Count applications by status
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   GOOGLE_REDIRECT_URI=http://localhost
   GROQ_API_KEY=...
   ```

   - **Google OAuth:** [Google Cloud Console](https://console.cloud.google.com/) — in order to run this project you need to enable the Gmail API. create a Desktop OAuth client, add yourself as a test user with `gmail.readonly` scope
   - **Groq:** [console.groq.com](https://console.groq.com/) — create an API key

3. To authenticate:

   ```bash
   npm run auth
   ```

4. Sync and view:

   ```bash
   npm run sync
   npm run list
   npm run summary
   ```
