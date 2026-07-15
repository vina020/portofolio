# Deployment Guide — Portfolio (Laravel API + React)

This covers taking the two pieces (`backend-files/` and `frontend/`) live on your
DigitalOcean VPS, with a domain bought on name.com. It assumes the same kind of
Ubuntu + Nginx + PHP-FPM + MySQL stack you already run for `sistemsaas` — this
portfolio runs as a **separate site** on the same server, with its own domain
(or subdomain) and its own Nginx server blocks, so it won't conflict with
anything already running.

## Architecture

```
yourdomain.com         →  React build (static files) served by Nginx
api.yourdomain.com     →  Laravel API, served by Nginx + PHP-FPM
```

Two domains (or one domain + one subdomain) pointing at the same VPS IP,
each with its own Nginx server block.

---

## 1. Point your domain at the VPS (name.com)

In your name.com dashboard → the domain → **DNS Records**, add:

| Type | Host | Answer            |
|------|------|--------------------|
| A    | @    | your VPS IP address |
| A    | api  | your VPS IP address |
| A    | www  | your VPS IP address |

DNS propagation can take a few minutes to a few hours. Check with:

```bash
dig yourdomain.com +short
dig api.yourdomain.com +short
```

---

## 2. Backend (Laravel API)

Follow `backend-files/SETUP.md` first to scaffold Laravel, copy in the app code,
and run migrations/seeders. Once that works locally on the VPS (`php artisan serve`
responds correctly), set it up to run permanently under Nginx:

### `.env` (production values)

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

### Nginx server block — `/etc/nginx/sites-available/portfolio-api`

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/portfolio/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.3-fpm.sock; # match your PHP-FPM version
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    client_max_body_size 20M; # allow photo/CV/project image uploads
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio-api /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Permissions

```bash
cd /var/www/portfolio/backend
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

## 3. Frontend (React)

Build it **with the production API URL already set**:

```bash
cd /var/www/portfolio/frontend
cp .env.example .env
# edit .env → VITE_API_URL=https://api.yourdomain.com/api
npm install
npm run build
```

This produces a `dist/` folder of static files — that's what Nginx serves directly,
no Node process needs to stay running.

### Nginx server block — `/etc/nginx/sites-available/portfolio`

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/portfolio/frontend/dist;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html; # SPA fallback for React Router
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 4. SSL (HTTPS) via Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com
```

Certbot edits both Nginx blocks to add the `listen 443 ssl` config and redirects
automatically. Renewal is automatic via the systemd timer certbot installs.

---

## 5. CORS — double check

In `backend/config/cors.php`, make sure `allowed_origins` includes your real
production frontend URL (`https://yourdomain.com`), not just localhost — the
file already reads `FRONTEND_URL` from `.env`, so as long as that's set
correctly in step 2 you're covered.

---

## 6. Updating content after launch

You don't need to redeploy anything to change your bio, skills, experience, or
projects — that's exactly what the admin panel is for:

1. Go to `https://yourdomain.com/admin/login`
2. Log in with the account from `backend-files/SETUP.md` (**change the password
   immediately if you haven't already**)
3. Edit away — changes are live immediately, no rebuild needed

You only need to re-run `npm run build` (step 3) if you change the **code**
(layout, colors, new pages) — not for content edits.

---

## 7. Quick troubleshooting

| Symptom | Likely cause |
|---|---|
| Frontend loads but no data shows | `VITE_API_URL` wrong, or CORS blocking — check browser console |
| 419/401 on admin login | Sanctum token not sent — check `localStorage` has `admin_token` after login |
| Images don't load | Forgot `php artisan storage:link` on the backend |
| 502 from api domain | PHP-FPM socket path in the Nginx block doesn't match your installed PHP version — run `php -v` and `ls /run/php/` to check |
