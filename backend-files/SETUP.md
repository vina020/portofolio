# Backend Setup — Laravel API

These files are meant to be dropped into a **fresh Laravel 12 project**, not run standalone.
Run all of this inside the project directory you already created on your VPS.

## 1. Scaffold Laravel + Sanctum

```bash
cd ~/your-project-directory   # the empty dir you already made
composer create-project laravel/laravel backend
cd backend
php artisan install:api
```

`install:api` installs Sanctum, creates `routes/api.php`, and wires up `bootstrap/app.php`
to load API routes automatically — you don't need to touch `bootstrap/app.php` manually.

## 2. Copy these files in

Copy everything from `backend-files/` into your new `backend/` Laravel project,
overwriting the matching paths:

```bash
cp -r backend-files/database/migrations/*.php backend/database/migrations/
cp backend-files/database/seeders/PortfolioSeeder.php backend/database/seeders/
cp backend-files/database/seeders/DatabaseSeeder.php backend/database/seeders/
cp backend-files/app/Models/*.php backend/app/Models/
mkdir -p backend/app/Http/Controllers/Api
cp backend-files/app/Http/Controllers/Api/*.php backend/app/Http/Controllers/Api/
cp backend-files/routes/api.php backend/routes/api.php
cp backend-files/config/cors.php backend/config/cors.php
```

## 3. Configure `.env`

```env
APP_NAME="Vina Nur Aini Portfolio"
APP_URL=https://api.yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=vina_portfolio
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

FRONTEND_URL=https://yourdomain.com
SESSION_DOMAIN=.yourdomain.com
SANCTUM_STATEFUL_DOMAINS=yourdomain.com
```

Create the database first: `mysql -u root -p -e "CREATE DATABASE vina_portfolio"`.

## 4. Migrate, seed, link storage

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

This creates the `users` table with one admin account:

- **email:** vinanurainina@gmail.com
- **password:** `ChangeMe123!`

⚠️ Log in once the panel is live and change this password immediately —
either build a "change password" form later, or for now run:

```bash
php artisan tinker
>>> $u = App\Models\User::first();
>>> $u->password = Hash::make('your-new-strong-password');
>>> $u->save();
```

## 5. Serve it

For production, point Nginx at `backend/public` (see `DEPLOYMENT.md` in the project root
for the full Nginx + domain setup). For a quick local test:

```bash
php artisan serve
```

## Notes on the data model

- `profiles` is a **singleton** table (always just one row) — holds your bio, vision/mission, contact info, photo, and CV file.
- `skills`, `experiences`, `projects` are standard CRUD tables, fully editable from the admin panel.
- `messages` stores contact-form submissions from visitors, readable in the admin inbox.
- All file uploads (photo, CV, project thumbnails/gallery) are stored in `storage/app/public` and served via `storage:link`.
