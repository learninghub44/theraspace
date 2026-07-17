# GitHub Setup Guide for TheraSpace

## Option 1: Manual Push (Recommended)

### Step 1: Create GitHub Repository
1. Go to [https://github.com/new](https://github.com/new)
2. **Repository name**: `theraspace`
3. **Description**: `TheraSpace — Premium SaaS for therapy practice management`
4. **Visibility**: Public (or Private)
5. **IMPORTANT**: Do NOT check "Initialize this repository with a README"
6. Click **Create repository**

### Step 2: Push Your Code

Copy and run these commands in your terminal (from the project directory):

```bash
cd /path/to/theraspace

# Add the remote
git remote add origin https://github.com/YOUR_USERNAME/theraspace.git

# Push to main branch
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Verify
Visit `https://github.com/YOUR_USERNAME/theraspace` to see your repo.

---

## Option 2: Using the Push Script

Run the provided script:

```bash
cd /path/to/theraspace
./push-to-github.sh
```

Follow the interactive prompts.

---

## Option 3: GitHub CLI (if installed)

```bash
# Authenticate with GitHub
gh auth login

# Create repo and push
gh repo create theraspace --public --source=. --push
```

---

## After Pushing: Enable GitHub Pages (Optional)

If you want to host via GitHub Pages:

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `root`
4. Or use **GitHub Actions** for automated builds

---

## GitHub Actions CI/CD (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel/Netlify
        # Add your deployment step here
```

---

## Repository Stats

- **Total Files**: 61
- **Lines of Code**: ~6,500+
- **Languages**: TypeScript, TSX, CSS
- **Framework**: Next.js 15
- **License**: MIT

---

## Need Help?

Contact: hello@theraspace.co.ke
