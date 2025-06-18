# NewsMe

<!-- 
  Add a project logo, screenshot, or animation here.
  Example: 
  ![Project Screenshot](path/to/image.png)
-->

---

## Overview

**NewsMe** is a privacy-first newsletter website that delivers personalized weekly newsletters to your inbox based on your selected topics and keywords. Simply provide your email, choose your interests, and receive curated news—no tracking, no hassle.

---

## Features

- 📰 Personalized weekly newsletters tailored to your interests
- 🏷️ Topic and keyword selection for smarter curation
- 🔒 Privacy-focused: only your email is required, with no extra tracking
- 📧 Easy signup and delivery to your inbox
- ⚡ Fast, modern user experience

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Backend:** FastAPI (Python 3.10)
- **Worker/API Layer:** Node.js 20
- **Authentication & Database:** Supabase (Auth) + PostgreSQL
- **ORM:** SQLAlchemy

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [Python](https://www.python.org/) (3.10 or later)
- [PostgreSQL](https://www.postgresql.org/)
- [Supabase](https://supabase.com/) account and project setup
- npm or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/KBG05/NewsMe.git
cd NewsMe
```

#### Frontend Setup (Vite + React + TypeScript)

```bash
cd frontend    # Replace with actual frontend directory if different
npm install
npm run dev
```

#### Backend Setup (FastAPI)

```bash
cd backend     # Replace with actual backend directory if different
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Environment Variables

### Backend (.env)

Create a `.env` file in your backend directory and configure the following:

```
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_API_KEY=your_supabase_api_key

# SQLAlchemy Database URI
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/newsme

# Allowed frontend origins (comma-separated for CORS)
FRONTEND_URLS=http://localhost:5173,https://your-production-frontend.com

# Any other environment variables
SECRET_KEY=your_secret_key
```

### Frontend (.env)

Create a `.env` file in your frontend directory:

```
VITE_BACKEND_URL=http://localhost:8000
# Add other environment variables as needed
```

---

## Project Structure

```plaintext
/
├── frontend/   # Vite + React + TypeScript app
│   └── ...
├── backend/    # FastAPI app
│   └── ...
├── worker/     # Node.js logic, if applicable
│   └── ...
├── db/         # migrations, seeds, etc.
│   └── ...
├── README.md
└── ...
```

---

## Usage

1. Sign up with your email and select topics/keywords.
2. Receive a personalized newsletter every week in your inbox.
3. No tracking, no ads, just the news you care about.

---

## Contributing

Contributions and feedback are welcome!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

Created by [KBG05](https://github.com/KBG05)

<!--
  Add your logo or a screenshot above to showcase the app!
-->
