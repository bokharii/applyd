# Applyd

A CLI I built to help me look for new opporunities. Scans your Gmail for job application emails, uses an LLM to extract company, role, status, and date, and stores everything locally in JSON for fast lookup.

## Commands

```bash
npm run dev -- auth      # Connect Gmail (one-time)
npm run dev -- sync      # Fetch + parse + update local storage
npm run dev -- list      # Show all saved applications
npm run dev -- summary   # Count applications by status
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

   - **Google OAuth:** [Google Cloud Console](https://console.cloud.google.com/) — enable Gmail API, create a Desktop OAuth client, add yourself as a test user with `gmail.readonly` scope
   - **Groq:** [console.groq.com](https://console.groq.com/) — create an API key

3. To authenticate:

   ```bash
   npm run dev -- auth
   ```

4. Sync and view:

   ```bash
   npm run dev -- sync
   npm run dev -- list
   npm run dev -- summary
   ```
