# Task Management Application

A full-stack task management application built with React (Frontend) and NestJS (Backend).

## Prerequisites

Ensure you have installed(you need this in my experience):
- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
- npm (Node Package Manager)

## Database Setup

1. Install PostgreSQL:
   - Download from [PostgreSQL Official Website](https://www.postgresql.org/download/) 

2. Create a new database(you cannot use the preinstalled databases like template0):
   ```sql
   CREATE DATABASE task_management;
   ```

## Environment Setup

1. Backend (.env setup): You must fill in all 3, they are used for setting up our backend features
   Create a `.env` file in the `backend` directory:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/task_management"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```

2. Frontend (.env setup):
   Create a `.env` file in the `frontend` directory:
   ```
   FRONTENDURL=http://localhost:3000
   ```


### Backend Installations!

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Prisma:
   ```bash
   npm install prisma --save-dev
   npm install @prisma/client
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the backend server:
   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run build
   npm run start:prod
   ```

### Frontend Installations

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm run dev
   ```


## Video Demo

[Link to video demonstration] https://drive.google.com/file/d/1f-ZwQE3TJKipy0cV-AEubWOdL6S7zffe/view?usp=sharing


## Salary Expectations

Monthly salary expectation: 20$ an hour or 2000 a month.


## Troubleshooting

Common issues and solutions that I ran into:
1. Database connection issues:
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env
   - Ensure correct password in DATABASE_URL

2. Frontend API connection:
   - Run it with "Credentials=true" for CORS Issues

3. Prisma issues:
   - Run `npx prisma generate` after schema changes
   - Run `npx prisma migrate reset` to reset database
 