# Runbook: move baarnsmannenkoor.nl hosting to IXWorx (HestiaCP)

Instructions for an AI agent (Claude Code) to move the website from GitHub Pages to the IXWorx web server, the same server that hosts dundir.com. Written 2026-11-04.

Read the whole file before acting. Steps marked **[HUMAN]** need Christiaan; stop and ask him, do not work around them.

---

## 1. Current situation (verified 2026-11-04)

| Item | Value |
|---|---|
| Site | Astro static site, this repo, builds to `dist/` with `npm run build` |
| `astro.config.mjs` | `site: 'https://baarnsmannenkoor.nl'`, `base: '/'` (root paths, no subfolder) |
| Current hosting | GitHub Pages via `.github/workflows/deploy.yml` (push to `main` deploys) |
| DNS provider | **Cloudflare** (nameservers `aaron.ns.cloudflare.com`, `kelly.ns.cloudflare.com`) |
| Apex `baarnsmannenkoor.nl` | A/AAAA proxied through Cloudflare (orange cloud) to GitHub Pages |
| `www.baarnsmannenkoor.nl` | CNAME to `thesocialchicken.github.io` |
| Incoming email | **Cloudflare Email Routing** (MX `route1/2/3.mx.cloudflare.net`) forwarding to Gmail per role |
| Outgoing email | Gmail "Send as" through Brevo SMTP relay (SPF includes Cloudflare + Brevo, Brevo verification TXT) |
| DMARC | `_dmarc` TXT record present |

Target server:

| Item | Value |
|---|---|
| Control panel | HestiaCP 1.10.5, branded "IXWorx Web Services": https://webservices.ixworx.nl/ |
| Server IP | `94.142.240.28` (same as dundir.com) |
| Access for the agent | **SFTP only** (no shell): host `94.142.240.28`, port `19922`, user `chris`. The password is saved in FileZilla (`~/.config/filezilla/recentservers.xml`, base64). Read it into an environment variable inside a script; never print it, never write it to a file in a repo. |
| Web root per domain | `/home/chris/web/<domain>/public_html/` |

---

## 2. The one rule that protects the choir's email

**Keep DNS at Cloudflare. Do not move the nameservers to IXWorx.**

All choir email (info@, voorzitter@, secretaris@, penningmeester@, bestuur) arrives through Cloudflare Email Routing. That only works while Cloudflare is the DNS provider. "Moving the DNS" therefore means **changing two web records inside Cloudflare**, nothing else. Never touch the MX, SPF, Brevo or DMARC records.

If Christiaan wants the nameservers at IXWorx anyway, stop: email has to be redesigned first (MX, forwarding, SPF, Brevo verification) and that is a separate task.

---

## 3. Steps

### Step 1. [HUMAN] Add the domain in HestiaCP

The agent cannot do this (no panel access). Ask Christiaan to:

1. Log in at https://webservices.ixworx.nl/ as `chris`.
2. **Web** > **Add Web Domain** > `baarnsmannenkoor.nl`, with alias `www.baarnsmannenkoor.nl`.
3. Leave **DNS support** and **Mail support** unticked (DNS and mail stay at Cloudflare).
4. Do not enable SSL yet (that needs DNS first, step 5).

Verify over SFTP that `/home/chris/web/baarnsmannenkoor.nl/public_html/` exists before continuing.

### Step 2. Build the site

```bash
cd /home/chris/Documents/NextCloud/Github/BaarnsMannenKoor
git pull origin main
npm ci
npm run build
node scripts/check-bladmuziek.mjs
```

Check before uploading:

- `dist/index.html` exists.
- No HTML references the old base path: `grep -rl '/BaarnsMannenKoor/' dist --include='*.html'` must print nothing.
- `dist/` contains **only** build output. Never upload the repo itself: this repo contains `keyswebsite.kdbx`, `mail-source/`, a large WeTransfer zip and audio work files. (On 2026-11-04 a repo copy uploaded into dundir.com's web root made a KeePass vault publicly downloadable. Do not repeat that.)

### Step 3. Upload over SFTP

1. List `public_html/` first. HestiaCP puts a placeholder `index.html` there; remove it and anything else that is not part of the build.
2. Upload the **contents** of `dist/` into `/home/chris/web/baarnsmannenkoor.nl/public_html/`, so `index.html`, `_astro/`, `images/`, `bladmuziek/` etc. sit directly in `public_html/`.
3. `public/CNAME` (copied into `dist/`) only matters for GitHub Pages; delete `CNAME` from `public_html/` after uploading.

Tooling: OpenSSH `sftp` in batch mode (`put -r`) with `SSH_ASKPASS` reading the password from an env var, or Python `paramiko` (installed) for recursive delete, since the server allows no shell.

### Step 4. Test before switching DNS

The domain still points to GitHub, so test the server directly:

```bash
for p in / /events/ /history/ /conductor/ /media/ /membership/ /friends/ /contact/ /leden/; do
  printf "%s " "$p"
  curl -sk -o /dev/null -w "%{http_code}\n" --resolve baarnsmannenkoor.nl:443:94.142.240.28 "https://baarnsmannenkoor.nl$p"
done
```

All pages must return `200` (`-k` because there is no valid certificate yet). Also check that a CSS file, an image and one `.m4a` from `bladmuziek/` load. If anything fails, fix it before step 5.

### Step 5. [HUMAN] Switch the web records in Cloudflare

The agent has no Cloudflare access. Give Christiaan exactly this:

In Cloudflare > `baarnsmannenkoor.nl` > **DNS** > **Records**:

| Action | Type | Name | Content | Proxy |
|---|---|---|---|---|
| Edit (replace the GitHub/Cloudflare A records) | A | `@` | `94.142.240.28` | **DNS only** (grey cloud) |
| Delete | AAAA | `@` | (GitHub Pages IPv6) | |
| Edit | CNAME | `www` | `baarnsmannenkoor.nl` | **DNS only** (grey cloud) |

Leave the MX, TXT (SPF, Brevo), `_dmarc` and `mail` records exactly as they are.

Use **DNS only** at first, so HestiaCP can obtain a Let's Encrypt certificate directly.

### Step 6. [HUMAN] Enable HTTPS in HestiaCP

After DNS has propagated (check `dig +short baarnsmannenkoor.nl` returns `94.142.240.28`):

HestiaCP > **Web** > edit `baarnsmannenkoor.nl` > tick **Enable SSL for this domain** > **Use Let's Encrypt** > also tick **Enable automatic HTTPS redirection** > Save.

Optional afterwards: switch the Cloudflare records back to **Proxied** (orange cloud) and set Cloudflare **SSL/TLS** mode to **Full (strict)**. Never use "Flexible" (redirect loops).

### Step 7. Verify live

- Re-run the step 4 loop without `--resolve` and without `-k`: all `200`.
- `http://` and `www.` both redirect to `https://baarnsmannenkoor.nl/`.
- Favicon and images load; the contact form still posts to formsubmit.co.
- **Email check:** `dig +short MX baarnsmannenkoor.nl` still shows `route1/2/3.mx.cloudflare.net`. Ask Christiaan to send a test mail to info@baarnsmannenkoor.nl and confirm it arrives.

Only after all checks pass, tell Christiaan the move is done.

### Step 8. Retire GitHub Pages (after the live checks pass)

1. In `.github/workflows/deploy.yml`, change the trigger from `push` to only `workflow_dispatch`, so a push no longer deploys to Pages. Keep the build, validate and test jobs useful as CI if wanted.
2. Remove `public/CNAME`.
3. Update `CLAUDE.md` (Tech Stack, Deployment, "Custom domain setup") to say hosting is IXWorx and point to this runbook.
4. **[HUMAN]** GitHub repo Settings > Pages: remove the custom domain.
5. Commit and push (this repo's rule: always commit and push).

---

## 4. Future deploys

After the move, every content change is: `git pull` > `npm run build` > checks from step 2 > replace the contents of `public_html/` with `dist/` (delete files that no longer exist in the build) > step 7 checks.

## 5. Rollback

Point the Cloudflare `@` and `www` records back to GitHub Pages (A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` CNAME `thesocialchicken.github.io`) and re-enable the push trigger in `deploy.yml`. Email is unaffected either way, as long as section 2 was followed.

## 6. Open security item (not part of the move, but do not ignore)

`keyswebsite.kdbx` is tracked in git, and this GitHub repo is **public**. Raise this with Christiaan before or during the move: untrack it, add `*.kdbx` to `.gitignore`, change the passwords it contains, and either purge it from history or make the repo private.
