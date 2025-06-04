Here is your updated `README.md` with the **developer guide of Pareto commands** embedded at the end — no simplification, fully detailed:

---

````markdown
# Recruiter Showcase – TSmithCode.ai

This is the official portfolio site for Thomas Smith, a .NET & Automation Engineer, built to streamline the hiring process by giving recruiters everything they need on one high-performance page.

⚙️ Built with:
- **Next.js 15 (App Router)**
- **Tailwind CSS**
- **Framer Motion**
- **Vercel for hosting**
- **Live YouTube Demo Integration**

💼 What you'll find:
- ⚡ Real-world CAD & ERP automation projects
- 🎯 Problem–Solution breakdowns by domain
- 🧠 Agile + SDLC approach with a developer mindset
- ✨ Elegant UI with animations and responsive layout

🔗 Live site: [https://tsmithcode.ai](https://tsmithcode.ai)

📫 Contact: [job@tsmithcode.ai](mailto:job@tsmithcode.ai)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🔧 Pareto Developer Command Guide (NPM, Git, Vercel)

### 🌀 Git – 20% of commands for 80% of workflows

```bash
git init
git remote add origin https://github.com/tsmithcode/recruiter-showcase.git
git add .
git commit -m "Initial commit"
git pull origin main --allow-unrelated-histories
git push -u origin main
git push -u origin main --force           # use carefully if pushing over existing branch
```

### 🔹 Config & Remotes

```bash
git config pull.rebase false              # merge strategy
git branch -M main                        # rename current branch to main
git remote -v                             # verify remotes
git remote remove origin                  # remove if incorrectly added
```

---

### 📦 NPM – Essential commands only

```bash
npm install                               # install all dependencies
npm install <pkg>                         # add new dependency
npm install <pkg> -D                      # add dev dependency
npm uninstall <pkg>                       # remove a dependency
npm outdated                              # list outdated packages
npm update                                # update to latest compatible versions

npm run dev                               # start dev server
npm run build                             # build production bundle
npm run start                             # start production server
```

---

### 🚀 Vercel – Core CLI deployment workflow

```bash
vercel                                     # initial deploy (follow prompts)
vercel --prod                              # production deploy
vercel link                                # link local project to vercel
vercel env pull .env.local                 # pull remote environment variables
vercel logs <deployment-url>               # inspect server logs
vercel inspect <deployment-url>            # debug build issues
```

---

### ✅ .gitignore Essentials

```bash
node_modules/
.env
.next/
dist/
```

---

> Want this guide as a PDF, image, or sidebar card in the app? Open a GitHub issue or fork this repo.

```

Let me know if you'd like this styled in Markdown for a GitHub Pages site or embedded in the app itself.
```
