# Motion Mania — website

Static marketing site for [Motion Mania](https://motionmania.app). Plain HTML, one CSS file, one tiny JS file. No build step, no framework, no external requests.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: hero, how it works, detection, editing, GTA 6, pricing summary, FAQ |
| `features.html` | Full feature list, Pro Edit detail, honest limits |
| `pricing.html` | Free / Pro monthly / Pro yearly, comparison table, billing FAQ |
| `download.html` | Installer links, requirements, first-run steps, troubleshooting |
| `guides/` | Four SEO guides: GTA 6, Twitch, Kick, Stream → Shorts |
| `privacy.html` | Privacy policy (Google + TikTok limited-use, Claude data flow) |
| `terms.html` | Terms of service |
| `data-deletion.html` | Data deletion instructions (required for Google verification) |
| `contact.html` | Support, privacy, security, business |
| `404.html` | Not found |

## Before you deploy — replace these

1. **Download links** in `download.html`:
   - `https://github.com/YOUR-GITHUB/motionmania-releases/releases/latest/download/MotionMania-mac.dmg`
   - `https://github.com/YOUR-GITHUB/motionmania-releases/releases/latest/download/MotionMania-Setup.exe`
   Keep those file names fixed so the `latest/download/...` URLs keep working across releases.

2. **Canonical domain.** Everything assumes `https://motionmania.app`. If you deploy somewhere else, find and replace it in:
   - every `<link rel="canonical">` and `og:url`
   - `sitemap.xml`, `robots.txt`, `site.webmanifest`
   - JSON-LD blocks

3. **Contact email.** `support@motionmania.app` appears in every page footer and on `contact.html`. Set up Cloudflare Email Routing (free) to forward it before launch.

4. **Legal review.** The privacy policy and terms are a solid, plain-English starting point, not legal advice. Have someone qualified review them before you charge money — especially the refund, liability and governing-law sections.

5. **Claims.** The site deliberately only claims what the app does today. If you add multi-stream, VOD scanning or GTA presets, update `features.html` and remove the matching line from "What it doesn't do".

## Deploy (GitHub Pages)

```bash
cd ~/Desktop/MotionTools/motionmania-site
git init && git add -A && git commit -m "Motion Mania website"
git branch -M main
git remote add origin https://github.com/<you>/motionmania-site.git
git push -u origin main
```

Then: repo → Settings → Pages → Source: **Deploy from a branch** → `main` / root.

Custom domain: add `motionmania.app` in Settings → Pages, then in Cloudflare DNS add:

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `@` | `<you>.github.io` | DNS only (grey cloud) |

Enable "Enforce HTTPS" once the certificate is issued.

### Cloudflare Pages (alternative)

Workers & Pages → Create → Pages → Connect to Git → framework preset **None**, build command empty, output directory `/`.

## SEO checklist (already done)

- Unique `<title>` and meta description on every page
- Canonical URLs, Open Graph and Twitter cards
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`, `Product`, `Article`, `BreadcrumbList`
- Semantic headings, one `<h1>` per page
- Descriptive `alt` text, lazy loading below the fold
- `robots.txt` + `sitemap.xml`
- Fast: no webfonts, no frameworks, ~120 KB of images per page

### After deploy, do these

1. **Google Search Console** → add `motionmania.app` → verify by DNS → submit `sitemap.xml`.
2. **Bing Webmaster Tools** → same (also feeds ChatGPT search and Copilot).
3. Add the site to your Google OAuth consent screen (home, privacy, terms URLs) and TikTok app settings — this site is what those reviews look at.
4. Write one new guide per week. Ranking for "GTA 6 clipping" needs content velocity plus backlinks; a single page will not do it alone.
5. Get links: post the guides (not the homepage) in relevant Discords, Reddit threads and X replies. Guides earn links; homepages don't.

## Add analytics later (optional)

No analytics is currently included. If you want privacy-friendly stats, Cloudflare Web Analytics is free, cookieless, and one script tag in `assets/js/main.js` or the `<head>`.

## Design system

Rebuilt with the **tasteskill 2.5** rules (`design-taste-frontend`):

- One section per screen at 1440×900; the hero fills the first screen alone.
- Equal left/right content edges on a 1200px wrap.
- Palette dealt from the brand: near-black ground `#0b0b0d`, surface `#141418`, ink `#f4f2ef`, accent `#ff2d55`. No violet.
- Type: **Epilogue** (display and text) + **JetBrains Mono** (labels and figures).
- Real product UI in the hero as live HTML (the clip inbox), and real screenshots in later sections. No captions under any image.
- Hero entrance on load; hover lift on cards; two dealt type moments: counter-rolls on the detection figures and word-highlight on the statement.
- All content reduced to 60–80 words per screen.
- `prefers-reduced-motion` rests everything; focus rings; 44px targets.

The skill's checkers were run against `index.html` with headless Edge:

```bash
node scripts/copy-lint.mjs index.html --kind software      # 0 FAIL, 0 WARN
node scripts/consistency.mjs index.html --page software     # see the report
```

Remaining checker findings are structural (section/footer height multiples) or deliberate (the word-highlight moment is a dealt moment; a fixed nav makes section tops sit under it). Nothing is hidden from the checker.

## Design notes

- Dark background `#0b0b0d`, brand red `#ff2d55`, violet accent `#b98cff`
- System font stack — no webfont requests
- Screenshots live in `assets/img/*.webp` (generated from `MotionMania/docs/redesign`)
- Logo mark is inline SVG, matching the app icon
