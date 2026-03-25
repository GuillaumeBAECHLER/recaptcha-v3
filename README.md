# reCAPTCHA v3 Score Display

A minimal Vercel-hosted website that shows your browser's [reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) score in real time.

## How it works

1. The page loads Google's reCAPTCHA v3 script and silently requests a token.
2. The token is sent to a Vercel serverless function (`/api/verify`).
3. The function verifies the token with Google's `siteverify` API using your secret key.
4. The score (0.0 – 1.0) is returned and displayed with a color-coded ring.

## Setup

### 1. Register a reCAPTCHA v3 site

Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) and create a **v3** site. You'll get a **site key** and a **secret key**.

### 2. Deploy to Vercel

Push this repo to GitHub, then import it in [Vercel](https://vercel.com). In your Vercel project settings, add two environment variables:

| Name | Value |
|------|-------|
| `RECAPTCHA_SITE_KEY` | Your reCAPTCHA site key (public) |
| `RECAPTCHA_SECRET_KEY` | Your reCAPTCHA secret key |

Vercel automatically serves `public/` as static files and `api/` as serverless functions.

### 4. Local development

```bash
npm i -g vercel   # if you don't have the CLI
vercel env pull    # pull your env vars into .env.local
vercel dev         # runs the site locally
```
