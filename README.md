# JorjDominic Portfolio

A React portfolio with a project slideshow, technology/tool carousels, a static View all mode, photo enlargement, and a saved light/dark preference. Dark mode is the default.

## Requirements

- Node.js 24.x (also specified in package.json and .nvmrc)
- npm

## Local development

```sh
npm ci
npm start
```

## Checks and production build

```sh
npm test -- --watchAll=false
npm run build
```

The deployable static website is generated in `build/`. Commit the source and `package-lock.json`; Vercel builds the output automatically.

## Deploy to Vercel

1. Push this project, including `vercel.json` and `package-lock.json`, to your GitHub repository.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Set the root directory to the folder containing `package.json` (the repository root for this project).
4. Confirm these settings, supplied by `vercel.json`:

| Setting               | Value            |
| --------------------- | ---------------- |
| Framework preset      | Create React App |
| Install command       | `npm ci`         |
| Build command         | `npm run build`  |
| Output directory      | `build`          |
| Node.js               | 24.x             |
| Environment variables | None required    |

5. Deploy. Later pushes to the connected production branch can trigger new deployments.

The page uses fragment links such as `#about`, `#projects`, and `#socials`; no SPA catch-all rewrite or backend functions are needed. Profile images, project logos, and icons are served from `public/`. Google Fonts requires internet access and has local fallback fonts.

For a CLI deployment, run `npx vercel` from the project root, then `npx vercel --prod` when ready to publish production.

`.vercelignore` excludes local dependencies, existing build output, and Sites-specific `.openai` metadata from CLI uploads. The existing Sites configuration is preserved separately and is not required by Vercel.

## Content and styling

- `src/App.js`: profile, project data, technology/tool lists, social links, and interactions
- `src/App.css`: layout, themes, responsive rules, and animations
- `src/index.css`: fonts and base styles
- `public/pfp.jpg`: profile picture
- `public/projects/`: project logos
- `public/icons/`: technology, tool, and social icons
- `public/index.html`: browser title, description, and initial theme

## References

- [Vercel Create React App deployment](https://vercel.com/docs/frameworks/frontend/create-react-app)
- [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json)
- [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
