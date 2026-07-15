# Vina Nur Aini — Portfolio (Admin + Viewer)

A personal portfolio site with two sides:

- **Viewer (public)** — Home, About, Projects (filterable by category), Project detail, Contact
- **Admin (you only)** — log in at `/admin/login` to edit your profile/bio, skills, experience,
  projects (with image upload), and read contact-form messages — no code changes needed for
  day-to-day content updates.

Stack: **Laravel 12 (API) + React/Vite**, matching what you're already running for `sistemsaas`.

## What's in this folder

```
backend-files/     → Laravel application code to drop into a fresh `laravel new` project
                      (see backend-files/SETUP.md)
frontend/           → Complete React + Vite project, ready to `npm install` (see frontend/SETUP.md)
DEPLOYMENT.md       → Full VPS + Nginx + SSL + name.com DNS walkthrough
```

**Start here:** `DEPLOYMENT.md` — it links out to the two `SETUP.md` files at the right steps.

## Design notes

The layout structure (sticky nav → hero → filterable project grid → footer with columns)
follows the book-track-first reference you pointed at. The visual identity — navy/gold/sky/coral/
teal/plum palette, the open-circle "swoosh" mark, Sora/Manrope/JetBrains Mono type — is pulled
from your own Canva portfolio, so it still feels like *you* rather than a copy of someone else's
book app.

Project categories each get their own color (matches your actual project types):

| Category | Color |
|---|---|
| Web Programming | Sky blue |
| Mobile Programming | Coral |
| Machine Learning | Gold |
| Data Analysis & Visualization | Teal |
| Interaction Design | Plum |

To change colors/fonts later, edit `frontend/src/index.css` (the `@theme` block) — everything
else references those tokens, so one edit re-themes the whole site.

## Content already seeded

Your bio, vision/mission, skills, organizational/internship experience, and all 9 projects from
your CV and Canva portfolio are pre-loaded via `backend-files/database/seeders/PortfolioSeeder.php`.
You can edit all of it from the admin panel after deploying — the seeder is just the starting point.

⚠️ One thing to double check: your CV lists `vinanuraisah69@gmail.com` but your portfolio's
contact page lists `vinanurainina@gmail.com`. I seeded the **portfolio** one — let me know if
that's wrong and I'll point you to where to fix it (or just edit it yourself in
`/admin/profile` once it's live).

## Known limitation worth knowing

I built and test-compiled the frontend in my own sandbox (mock data, not your real API) to verify
the design renders correctly — screenshots matched what's described above. I was not able to run
`composer install` or actually run the Laravel backend, since this sandbox can't reach
`packagist.org`. Run through `backend-files/SETUP.md` on your VPS, where Composer will work
normally, and let me know if anything doesn't match.
