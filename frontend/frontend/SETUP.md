# Frontend Setup — React (Vite)

This is a complete Vite + React project — unlike the backend, you can run this folder as-is.

## 1. Install dependencies

```bash
cd frontend
npm install
```

## 2. Configure the API URL

```bash
cp .env.example .env
```

Edit `.env`:

```env
# local dev — point at your local Laravel server
VITE_API_URL=http://localhost:8000/api

# production — point at your deployed API domain
# VITE_API_URL=https://api.yourdomain.com/api
```

## 3. Run it locally

```bash
npm run dev
```

Visit `http://localhost:5173`. Make sure the Laravel backend is running too (`php artisan serve`)
and that `FRONTEND_URL` in the backend's `.env` matches `http://localhost:5173` for CORS.

## 4. Build for production

```bash
npm run build
```

This outputs static files to `dist/` — see `DEPLOYMENT.md` in the project root for how to serve
this with Nginx on your VPS.

## What's in here

- `src/pages/public/` — Home, About, Projects, Project Detail, Contact (the viewer side)
- `src/pages/admin/` — Login, Dashboard, Profile, Skills, Experience, Projects, Messages (the admin side)
- `src/components/`, `src/layouts/` — shared navbar, footer, cards, admin sidebar
- `src/index.css` — design tokens (colors, fonts) — edit here to retheme the whole site
- `src/lib/categories.js` — project category list + colors, edit here if you add/rename categories

## Admin login

Go to `/admin/login` (there's also a small "Admin" link in the footer). Use the account created
by the backend seeder — see `backend-files/SETUP.md`.

## Logo / monogram

The "VA" monogram in the navbar and favicon is plain text/SVG, not an image — edit
`src/components/Navbar.jsx` and `public/favicon.svg` directly if you want to change it later.
