# **App Name**: APT Shield

## Core Features:

- Real-time Threat Dashboard: Display live APT detection alerts with color-coded severity levels (Critical, High, Medium, Low) and threat trends over time.
- APT Attack Lifecycle Tracker: Visual timeline showing the 7 stages of APT attacks (Initial Reconnaissance to Maintain Persistence).
- Detection Rules Management: Interface to create, edit, and manage custom threat detection rules for PowerShell execution, credential dumping, lateral movement, and data exfiltration.
- Log Analysis Interface: Search and filter security logs from various sources with advanced query capabilities; it also incorporates a generative AI 'tool' to summarize suspicious logs, reducing the need for extensive manual review by security analysts.
- Threat Intelligence Feed: Integration panel showing latest APT group activities, IOCs (Indicators of Compromise), and threat intelligence updates.
- Incident Response Workflow: Case management system for tracking detected threats from initial alert to resolution with assignment capabilities.
- User Authentication & Role Management: Secure login system with roles for Security Analysts, SOC Managers, and Administrators, using Firebase Authentication for role-based access control and real-time updates with Firestore.

## Style Guidelines:

- Background: Dark blue/black (#0B1622) to minimize eye strain in a SOC environment.
- Primary: Electric blue (#7DF9FF), drawing from the alertness-enhancing quality associated with emergency lighting and security systems.
- Accent: Neon green (#39FF14) for safe indicators; neon red (#FF0800) for critical alerts; and orange (#FFA500) for warnings.
- Headline font: 'Space Grotesk' (sans-serif) for a computerized, techy, scientific feel, well-suited for headlines. Body text font: 'Inter' (sans-serif) for longer text and a modern look.
- Code font: 'Source Code Pro' (monospace) for displaying code snippets from logs.
- Use professional cybersecurity-themed icons representing different threat types, severity levels, and system components.
- Implement Material Design principles for a responsive and consistent UI. Use cards and widgets to display real-time data.
- Subtle animations for real-time updates and alert notifications. Use smooth transitions for navigation and data loading.