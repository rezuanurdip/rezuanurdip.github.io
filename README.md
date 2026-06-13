# Rezuanur Rahman Dip — Personal Portfolio

A clean, modular personal portfolio site built with **Next.js 15**, **Tailwind CSS**, and static export for free **GitHub Pages** hosting.

## Tech stack
- **Framework**: Next.js 15 (App Router, static export)
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion + CSS
- **Icons**: React Icons (Feather + Font Awesome)
- **Deploy**: GitHub Pages via GitHub Actions (auto on every push)
- **Contact form**: Formspree (free tier, no backend needed)

---

## Project structure

```
portfolio/
├── data/                   ← EDIT YOUR CONTENT HERE
│   ├── profile.json        ← Name, bio, social links, metrics
│   ├── experience.json     ← Job history
│   ├── publications.json   ← Research papers
│   ├── projects.json       ← Projects
│   ├── opensource.json     ← Open source work
│   ├── achievements.json   ← Awards & certifications
│   ├── workAreas.json      ← Domain overview grid
│   └── blog.json           ← Blog posts (LinkedIn links or native)
│
├── src/
│   ├── app/                ← Next.js pages
│   │   ├── page.tsx        ← Landing page
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── experience/
│   │   ├── projects/
│   │   └── publications/
│   ├── components/
│   │   ├── layout/         ← Navbar, Footer
│   │   └── sections/       ← Page sections
│   └── styles/globals.css
│
├── public/
│   ├── images/             ← Add your headshot here as avatar.jpg
│   └── Rezuanur_Rahman_Dip_Resume.pdf ← Add your PDF resume here
│
└── .github/workflows/deploy.yml ← Auto-deploy on push to main
```

---

## Getting started locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## How to update content (no code needed)

### Add a blog post
Open `data/blog.json` and add one object to the array:
```json
{
  "id": "my-new-post",
  "title": "My Post Title",
  "date": "2025-06-01",
  "summary": "One paragraph description shown in the list.",
  "tags": ["Python", "ML"],
  "thumbnail": "/images/blog/my-post.png",
  "externalUrl": "https://linkedin.com/posts/your-post-link",
  "featured": false
}
```
- Set `externalUrl` to your LinkedIn post URL → clicking opens LinkedIn
- Set `featured: true` → post appears in the landing page slideshow
- Leave `externalUrl` empty → post routes to a native detail page

### Add a project
Open `data/projects.json` and append an object with the same schema as existing entries.

### Add a publication
Open `data/publications.json` and append an object. Set `type` to `"journal"` or `"conference"`.

### Update a job
Open `data/experience.json`. Edit the relevant object or append a new role. Set `current: true` for your active role.

### Add an achievement or certification
Open `data/achievements.json`. Set `category` to `"award"`, `"team-award"`, or `"certification"`.

---

## One-time setup tasks

### 1. Add your profile photo
Drop your headshot as `/public/images/avatar.jpg` (or `.png`).
Then update `HeroSection.tsx` — replace the placeholder `<div>` with:
```tsx
<Image src="/images/avatar.jpg" alt="Rezuanur Rahman Dip" fill className="object-cover" />
```

### 2. Add your resume PDF
Copy your resume as `/public/Rezuanur_Rahman_Dip_Resume.pdf`.

### 3. Set up the contact form
1. Go to [formspree.io](https://formspree.io) → create a free account → create a new form
2. Copy the form ID (looks like `xrgjabc`)
3. Open `src/app/contact/page.tsx` and replace `YOUR_FORM_ID`:
   ```tsx
   const res = await fetch('https://formspree.io/f/xrgjabc', { ... });
   ```

### 4. Update publication links
In `data/publications.json`, replace `"link": "#"` with your actual DOI or paper URLs.

---

## Deploy to GitHub Pages (free)

### First-time setup
1. Push this repo to GitHub
2. Go to your repo → **Settings** → **Pages**
3. Under "Build and deployment", set Source to **GitHub Actions**
4. That's it — the workflow at `.github/workflows/deploy.yml` handles everything

### If deploying to a sub-path repo (username.github.io/repo-name)
Uncomment and update these lines in `next.config.js`:
```js
basePath: '/your-repo-name',
assetPrefix: '/your-repo-name/',
```

### If using a custom domain
1. In GitHub Pages settings, add your custom domain
2. Remove `basePath` and `assetPrefix` from `next.config.js` (leave them commented out)
3. Add a `CNAME` file to `/public/` containing your domain

Every time you push to `main`, GitHub Actions will rebuild and redeploy automatically. No manual steps.

---

## Update LinkedIn publication links
Once you have your paper DOI/IEEE links, update them in `data/publications.json` — just replace the `"#"` placeholder.

---

Built with ❤️ and Next.js. Hosted free on GitHub Pages.
