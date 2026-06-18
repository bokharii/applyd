# Applyd

A CLI that scans your Gmail for job application emails, uses an LLM to extract company, role, status, and date, and stores everything locally in JSON for fast lookup.

## Commands

- `npm run dev -- auth` — connect your Gmail account (one-time setup)
- `npm run dev -- list` — fetch, parse, and save applications to `data/applications.json`

## Setup

1. Install dependencies: `npm install`
2. Add Google OAuth credentials and `GROQ_API_KEY` to `.env`
3. Run `npm run dev -- auth` to authenticate

## Stack

Node.js, TypeScript, Commander, Gmail API, Groq, Zod
