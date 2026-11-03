# Report Cyber™ — Cyber Security & Cyberbullying Redressal Portal

**Report Cyber** is a human-centered, responsive, cybersecurity incident reporting and case management web application designed for reporting cyberbullying, online harassment, non-consensual media, doxxing, and digital threats.

---

## 🌟 Key Features

1. **Cyberbullying & Digital Crimes Intake Wizard**:
   - 4-step intake process (Incident Category, Perpetrator Intelligence, Evidence Vault, and Nearest Station Dispatch).
   - Covers Instagram, Discord, WhatsApp, TikTok, Snapchat, X, Gaming chat rooms, and educational portals.
   - Self-assessed danger levels and incident frequency evaluation.
   - **Confidential & Anonymous Mode**: Protects victim identity with automated cryptographic pseudonym tokens (`#ANON-901`).

2. **Digital Evidence Vault & Video Proof**:
   - Multi-format file uploader for videos (`.mp4`, `.mov`, `.webm`), screenshots (`.png`, `.jpg`), voice notes (`.mp3`), and chat exports.
   - **Simulated Screen Recorder**: Live screen and audio capture utility for preserving disappearing messages and stories before abusers delete them.
   - **Cryptographic SHA-256 Hashing**: Generates court-admissible digital integrity checksums for every piece of uploaded evidence.

3. **Intelligent Nearest Station Routing**:
   - Auto-geolocation and distance calculation to authorized local Cyber Crime Divisions.
   - Displays Station Head, Division name, jurisdiction, badge number, hotline, and real-time response time estimations.

4. **Case Tracking & Interactive Officer Desk**:
   - Instant Case Reference ID (e.g., `CYBER-2026-BL-94821`).
   - 4-stage live progression tracker: *Lodged -> Dispatched -> Officer Assigned -> Forensic Subpoena*.
   - **Assigned Officer Card**: Direct contact details, badge ID, emergency call desk, and panic broadcast alert.
   - **Secure Real-time Officer Chat**: Two-way interactive communication line with realistic, supportive cyber policing guidance and updates.

5. **Official Printable E-FIR / Case Docket**:
   - Generates official government-style incident report with verified case stamps, complainant details, suspect handles, legal statutes, and evidence ledger.
   - One-click print or save as PDF.

6. **Victim Safety Features**:
   - **Quick Escape (ESC key)**: Immediately disguises the screen and redirects to Google if an abuser walks into the room.
   - **24/7 National Emergency Helplines**: Toll-free 1930 Cyber helpline, Childline (1098), Women's Helpline (1091), and Crisis Support (988).

---

## 🚀 How to Launch the Application

### Option 1: Direct Browser Launch
Simply double click or open `index.html` in any web browser:
```bash
open /Users/harshithreddy/Documents/projects/report-cyber/index.html
```

### Option 2: Local Python Server
Run the included zero-dependency server:
```bash
cd /Users/harshithreddy/Documents/projects/report-cyber
python3 server.py
```
Then visit: **`http://localhost:8080`**

---

## 🎨 Design & Aesthetic
- High-contrast Cyberpunk Sentinel theme (`#070a12`, `#00f2fe`, `#10b981`).
- Subtle animated cyber grid backdrop, glowing accents, and glassmorphic cards.
- Human-crafted UX with trauma-informed guidance and reassuring safety notices.
