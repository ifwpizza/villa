# SaGa Montana — Deployment Guide

This guide walks you through everything from zero to a live website. Follow each step in order.

---

## What You Need (Free Accounts)

Before starting, create these accounts:

1. **Supabase** — Your database (stores booking dates)
   - Go to https://supabase.com and sign up
2. **Vercel** — Your hosting (runs the website)
   - Go to https://vercel.com and sign up with your GitHub account
3. **GitHub** — Where your code lives
   - Go to https://github.com and sign up if you don't have an account

---

## Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - **Organization**: Create one if you don't have one (click "Create organization")
   - **Project name**: `villa99`
   - **Database password**: Type a strong password and **save it somewhere safe**
   - **Region**: Choose `Asia` (Mumbai) or closest to your users
4. Click **"Create new project"**
5. Wait 1-2 minutes for it to finish setting up

---

## Step 2: Create the Database Table

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Paste this entire block and click **"Run"** (the play button):

```sql
CREATE TABLE availability (
  id int PRIMARY KEY DEFAULT 1,
  booked_dates text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Add your existing booked dates (edit or remove this line if needed)
INSERT INTO availability (id, booked_dates)
VALUES (1, ARRAY['2026-07-25', '2026-07-26']);
```

You should see "Success. No rows returned" at the bottom.

---

## Step 3: Get Your Supabase Keys

1. In the Supabase dashboard, click the **gear icon** (Settings) in the left sidebar
2. Click **"API"** under "Configuration"
3. You need two values from this page:
   - **Project URL**: Looks like `https://xxxxxxxx.supabase.co`
   - **Service Role Key**: Click the eye icon to reveal it. Looks like a long `eyJ...` string

**Save both of these. You'll need them in Step 6.**

> Never share the Service Role Key publicly. It has full access to your database.

---

## Step 4: Push Your Code to GitHub

Open **Terminal** on your Mac. Run these commands one by one:

```bash
cd ~/Desktop/villa99/demo-4
git init
git add .
git commit -m "initial commit"
```

Then create a repository on GitHub:

1. Go to https://github.com/new
2. **Repository name**: `villa99`
3. Keep it **Public** or **Private** (your choice)
4. Click **Create repository**
5. GitHub will show you commands. Copy and run the "push an existing repository" ones. They look like:

```bash
git remote add origin https://github.com/YOUR_USERNAME/villa99.git
git branch -M main
git push -u origin main
```

---

## Step 5: Generate Your Secrets

Open Terminal and run these two commands to generate secure random strings:

```bash
openssl rand -base64 48
```

Copy the output somewhere. This is your **JWT_SECRET**.

Run it again:

```bash
openssl rand -base64 48
```

Copy this output too. This is your **CSRF_SECRET**.

Run it one more time:

```bash
openssl rand -base64 48
```

This output will be used to create your **OWNER_PASSWORD_HASH**.

Now generate the password hash (replace `YOUR_PASSWORD_HERE` with the password you want to use to log in as owner):

```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD_HERE', 12))"
```

**Save this hash. This is your OWNER_PASSWORD_HASH. Remember the password you used — you'll need it to log in.**

---

## Step 6: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `villa99` repository
4. **Do NOT deploy yet** — click **"Environment Variables"** first
5. Add these variables one by one (click "Add" after each):

| Name | Value |
|------|-------|
| `SUPABASE_URL` | Your Project URL from Step 3 (e.g. `https://xxxxxxxx.supabase.co`) |
| `SUPABASE_SERVICE_KEY` | Your Service Role Key from Step 3 (the long `eyJ...` string) |
| `OWNER_PASSWORD_HASH` | The bcrypt hash from Step 5 |
| `JWT_SECRET` | First random string from Step 5 |
| `CSRF_SECRET` | Second random string from Step 5 |

6. Click **"Deploy"**
7. Wait 2-3 minutes for the build to finish

---

## Step 7: Test It

1. Once deployed, Vercel will give you a URL like `villa99-xxxx.vercel.app`
2. Open it in your browser — you should see the SaGa Montana website
3. Scroll down to **"Book Your Stay"** and try selecting dates on the calendar
4. To test the owner login:
   - Scroll to the footer and click the owner login link
   - Enter the password you set in Step 5
   - You should see the Availability Manager panel

---

## Step 8: Set Up Your Custom Domain (Optional)

If you have a domain name (like `sagamontana.com`):

1. In Vercel, go to your project → **"Settings"** → **"Domains"**
2. Type your domain name and click **"Add"**
3. Vercel will give you DNS records to add at your domain registrar
4. Go to your domain registrar (GoDaddy, Namecheap, etc.) and add those DNS records
5. Wait up to 24 hours for DNS to propagate (usually much faster)

---

## How to Update Booked Dates

### Option A: Using the Owner Panel
1. Go to your website
2. Scroll to the footer, click the owner login
3. Enter your password
4. Click dates on the calendar to select them
5. Click **"Mark as Booked"** or **"Mark as Available"**
6. Click **"Save Changes"**

### Option B: Using the Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **"Table Editor"** in the left sidebar
4. Click on the `availability` table
5. Edit the `booked_dates` cell directly

---

## How to Change Your Owner Password

1. Generate a new hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('NEW_PASSWORD', 12))"
```

2. Go to Vercel → your project → **Settings** → **Environment Variables**
3. Update `OWNER_PASSWORD_HASH` with the new hash
4. Redeploy (Vercel → Deployments → click "..." on latest → "Redeploy")

---

## Troubleshooting

**"API is not configured" error on the website:**
- You forgot an environment variable. Go to Vercel → Settings → Environment Variables and make sure all 5 are set.

**Calendar shows no dates / always available:**
- Check that your Supabase table was created correctly. Go to Table Editor → `availability` and verify the row exists.

**Owner login says "Invalid credentials":**
- Double-check that `OWNER_PASSWORD_HASH` matches your password. The hash must start with `$2a$` or `$2b$`.

**Deployment fails:**
- Check the build logs in Vercel. The most common issue is a missing environment variable.

---

## Environment Variables Reference

| Variable | Where to Get It | Required |
|----------|----------------|----------|
| `SUPABASE_URL` | Supabase → Settings → API → Project URL | Yes |
| `SUPABASE_SERVICE_KEY` | Supabase → Settings → API → Service Role Key | Yes |
| `OWNER_PASSWORD_HASH` | Generated with bcrypt (see Step 5) | Yes |
| `JWT_SECRET` | Generated with `openssl rand -base64 48` | Yes |
| `CSRF_SECRET` | Generated with `openssl rand -base64 48` | Yes |
| `CORS_ORIGIN` | Your website URL (auto-set by Vercel) | No |
