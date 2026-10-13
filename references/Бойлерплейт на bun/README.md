# generative-boilerplate-bun

## Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

## Install dependencies

```bash
bun install
```

## Run development

```bash
bun run dev
```

## Build production

```bash
bun run build
```

## Make a new release

- Commit all changes
- Merge commit to gh-pages branch
- Push changes to GitHub

```bash
git add .
git commit -am "Changes"
git checkout gh-pages
# git checkout -b gh-pages
git merge main
git push origin gh-pages
```
