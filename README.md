Project Title

Name: APT Shield — Adaptive Threat Detection & Response Overview

Purpose: Centralized dashboard for detecting, investigating, and responding to advanced persistent threat (APT) activity across logs and alerts. Highlights: Fast triage views, incident tracking, threat-hunting workspace, AI-assisted summarization of suspicious logs. Features

Dashboard: Overview metrics and trends. Detection: Rule-based detections and alert listing. Logs: Log summaries and contextual views. Incidents: Incident lifecycle and response tracking. Threat Intel: Enrichment and hunting workflows. AI Assist: Automated summarization of suspicious logs (in flows). Tech Stack

Framework: Next.js (App Router) Language: TypeScript Styling: Tailwind CSS UI: Custom component library in ui AI: Local AI flows in ai (dev helpers in dev.ts) Quick Start

Prerequisites: Node.js 18+, pnpm or npm Install & Run (development): Build & Start (production): Project Structure

Top-level: src — application source Important paths: app — Next.js pages and routes components — shared UI and layout components ai — AI flows and helpers (e.g., summarize-suspicious-logs.ts) lib — utilities, types, and placeholder data Development Notes

Environment: Add any API keys or env vars to .env.local as needed. Testing: Add instructions here if tests are added. Formatting: Run the project's formatter/linter before commits (if applicable). How AI is used

Flows: summarize-suspicious-logs.ts provides an automated summary for suspicious log batches to accelerate triage. Dev helpers: dev.ts and genkit.ts contain developer utilities for iterating on models/flows. Contributing

Code style: Follow existing TypeScript and component patterns. PRs: Open a branch, target main, include a short description and screenshots when UI changes. Contact: Open issues for bug reports and feature requests.