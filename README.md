# Random Quotes

A quote-sharing app built with Next.js. Browse quotes in a shuffled order, filter them by category, like your favorites, and contribute your own quotes.

## Features

- Browse quotes in a shuffled order
- Filter quotes by category
- Like and unlike quotes
- View your liked quotes and their like counts
- Add, edit, and delete your own quotes
- Add up to five tags to a quote, with a 20-character limit per tag
- Sign in with Auth0
- Switch between light and dark themes

## Requirements

- Node.js 20 or later
- npm
- A MongoDB database
- An Auth0 Regular Web Application

## Getting Started

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root and add the environment variables below.

3. In your Auth0 application settings, configure these local URLs:

   - **Allowed Callback URL:** `http://localhost:3000/auth/callback`
   - **Allowed Logout URL:** `http://localhost:3000`

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Add these variable names to `.env.local` and provide your own values:

```env
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_SECRET=
APP_BASE_URL=http://localhost:3000

MONGODB_URI=
MONGODB_DB=quotes-app
```

Get the Auth0 domain and client credentials from your Auth0 application settings. Generate an `AUTH0_SECRET` with:

```bash
openssl rand -hex 32
```

`APP_BASE_URL` is optional for local development; it is included here to make the app URL explicit. `MONGODB_DB` is also optional and defaults to `quotes-app`.

Keep `.env.local` private. Never commit credentials, secrets, or database connection strings.

## Available Scripts

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Start the production server
```
