# Initial plan for the BMI-Hero Body Fat Calculator 🧮💪

This will be a web application for estimating **body fat percentage**, focused primarily on the **skinfold (caliper/adipometer) method**, with an architecture that supports adding more calculation methods over time.

This app will also support **user profiles and progress tracking**, allowing users to save measurements and results to a **database** and visualize changes over time.

> ⚠️ Disclaimer: If you are not massively into fitness keep in mind that this tool just as most methods of body fat calculation only provide estimates and should not replace or be taken as medical advice. Accuracy depends on measurement technique and the method used.

---

## Key Goals

Some of my goals at the momment with this app include:

- Provide a reliable **skinfold-first** body fat estimator
- Make it easy to **add more methods** (Navy, BMI, BIA, etc.)
- Enable **profiles + history tracking** using a database
- Make it easy to expand later on in case I want to cater for other audiences such as:
    - Coaches/trainers tracking multiple clients
    - Individuals tracking personal progress
    - Users cross-checking results via multiple methods

---

## Tech Stack

- **Frontend & Backend:** Next.js (React)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** Not required initially (planned for a later phase)

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm**
- **PostgreSQL** (local or hosted)
