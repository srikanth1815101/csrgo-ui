# CSRGO UI Components

This repository contains the globally reusable UI components (Header, Footer, etc.) and brand styling for the CSRGO ecosystem. It is distributed via jsDelivr CDN as a set of native Web Components.

## How to use in any project

Include the following tags in the `<head>` of your HTML document to pull the UI components directly from the CDN:

```html
<!-- 1. Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

<!-- 2. Tailwind & Lucide (Dependencies) -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest"></script>

<!-- 3. CSRGO UI (Change @1.0.0 to your target version) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/CSRGO/csrgo-ui@1.0.0/dist/csrgo-ui.css">
<script src="https://cdn.jsdelivr.net/gh/CSRGO/csrgo-ui@1.0.0/dist/csrgo-ui.js"></script>
```

Then, just use the elements directly in your HTML `<body>`:

```html
<csrgo-header brand-name="CSRGO"></csrgo-header>
<csrgo-footer></csrgo-footer>
```

## How to release a new version

We use **GitHub Tags** to version this package. Whenever you want to release a new version (e.g., `v1.0.1`), follow these steps:

### Method A: Using the GitHub Website (Recommended)
1. Commit and push all your new code to the `main` branch.
2. Go to your repository page on GitHub.
3. On the right side, click **Releases**, then click **Draft a new release**.
4. Click **Choose a tag**, type your new version number (e.g., `v1.0.1`), and click **Create new tag: v1.0.1 on publish**.
5. Add a release title (e.g., "Version 1.0.1") and click **Publish release**.

*jsDelivr will automatically detect the new release and make it available at `.../csrgo-ui@1.0.1/...` within a few minutes!*

### Method B: Using Git Command Line
```bash
# 1. Commit your changes
git add .
git commit -m "Updated header styles"
git push origin main

# 2. Create the tag locally
git tag v1.0.1

# 3. Push the tag to GitHub
git push origin v1.0.1
```
