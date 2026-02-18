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

### Installation

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd BMI-Hero
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env.local
    ```

    Then update `.env.local` with your PostgreSQL connection string:

    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/bmi_hero_db"
    ```

4. **Generate Prisma Client**

    ```bash
    npm run prisma:generate
    ```

5. **Run database migrations**

    ```bash
    npm run prisma:migrate
    ```

    This will create all necessary tables in your PostgreSQL database.

6. **Start the development server**

    ```bash
    npm run dev
    ```

7. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action.

---

## Project Structure

```
BMI-Hero/
├── app/
│   ├── api/
│   │   └── users/
│   │       └── route.ts          # User management endpoints
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── page.css                  # Home page styles
├── components/
│   ├── UserSelector.tsx          # User selection/creation component
│   └── UserSelector.css          # UserSelector styles
├── prisma/
│   └── schema.prisma             # Database schema
├── .env.local                    # Environment variables (not in git)
├── .env.example                  # Example environment file
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── ReadMe.md                     # This file
```

---

## Features (Current Status)

### ✅ Implemented

- **User Profile Management**
    - Create new user profiles
    - View all existing users
    - Conditional UI: Text input for new users, dropdown for existing users
    - Add new profiles anytime with a plus (+) button

### 🔄 In Development / Planned

- Skinfold measurement input forms
- Body fat percentage calculations
- Measurement history and progress tracking
- Multiple calculation methods (Navy, BMI, etc.)
- Data visualization and charts
- User authentication (future)
- Export/import functionality (future)

---

## Usage

### First Time Using the App

1. The app will show a text input prompt: "Insert your name"
2. Type your name and click the `+` button to create your profile
3. Once created, you'll be redirected to the measurement section

### Returning Users

1. The app will display a dropdown: "Select one of the already existing users"
2. Choose your profile from the dropdown
3. Alternatively, click the `+` button to create a new profile

---

## API Endpoints

### GET `/api/users`

Fetches all existing users.

**Response:**

```json
[
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Smith" }
]
```

### POST `/api/users`

Creates a new user profile.

**Request Body:**

```json
{
    "name": "New User Name"
}
```

**Response (201):**

```json
{
    "id": 3,
    "name": "New User Name",
    "createdAt": "2024-02-08T12:00:00Z"
}
```

---

## Development Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (visual database manager)
npm run prisma:studio
```

---

## Database Schema

### User Table

- `id` - Auto-increment primary key
- `name` - Unique user name
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Measurement Table

- `id` - Auto-increment primary key
- `userId` - Foreign key to User
- Skinfold measurements: `triceps`, `biceps`, `chest`, `midaxillary`, `subscapular`, `suprailiac`, `abdominal`, `thigh` (in mm)
- `bodyFatPercentage` - Calculated result
- `method` - Calculation method used (default: "skinfold")
- `createdAt` - Measurement timestamp
- `updatedAt` - Last update timestamp

---

## Disclaimer

⚠️ This application is a **tool for estimation purposes only**. Body fat percentage measurements can vary significantly based on:

- Measurement technique accuracy
- Measurement tool calibration
- Body hydration levels
- Time of day
- Environmental conditions

Always consult with a healthcare professional for medical advice. Do not use this as a sole indicator of health or fitness.

---

## Future Enhancements

- [ ] Multiple calculation methods
- [ ] Progress charts and graphs
- [ ] Export measurements to CSV/PDF
- [ ] User authentication and profiles
- [ ] Mobile app version
- [ ] Integration with fitness trackers
- [ ] Coaching features for trainers
