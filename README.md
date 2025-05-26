# Gym App 🏋️‍♀️

**Gym App** is a modern fitness management platform built with Next.js 13 (App Router), and Supabase. It allows gym administrators to manage subscription plans and users, track revenue, and monitor activity — all through a clean, responsive interface.

## 🚀 Features

- 🔐 Secure authentication with Clerk
- 📊 Admin dashboard showing subscriptions and users reports
- 🧑‍💼 Admin panel for managing users and plans
- 💳 Stripe integration for real payment processing
- 💳 Subscription tracking with amount, duration, and active status
- 📱 Fully responsive design using Tailwind CSS and Shadcn
- 🌐 Deployed with Vercel

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Database**: PostgreSQL
- **Auth**: Clerk
- **Payments**: Stripe
- **Styling**: Tailwind CSS, Shadcn
- **Deployment**: Vercel

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/nadiia-dev/gym-app.git
cd gym-app
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a .env file in the root directory and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=   # Публічний ключ для ініціалізації Clerk на фронтенді
CLERK_SECRET_KEY=                     # Секретний ключ для взаємодії з Clerk на бекенді

NEXT_PUBLIC_SUPABASE_URL=            # URL до твого Supabase проекту
NEXT_PUBLIC_SUPABASE_ANON_KEY=       # Публічний ключ для читання/запису з обмеженими правами

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Публічний ключ Stripe для клієнтської частини
STRIPE_SECRET_KEY=                   # Секретний ключ Stripe для сервера (створення сесій, вебхуків тощо)

```

5. Start the development server

```bash
npm run dev
```

Visit http://localhost:3000 to view the app.
