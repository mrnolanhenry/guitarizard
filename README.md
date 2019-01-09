# guitarizard

Guitarizard's monorepo!

## Development

In this directory:

```
npm install
npx lerna bootstrap
(cd packages/web-ui; npm run dev)
```

### Deployment

Locally do this:

```
(cd packages/web-ui; npm run build)
(cd packages/web-ui; npx next export)
```

This creates a directory: `packages/web-ui/out`.

Then:

1. Open https://app.netlify.com/login/email

2. Login
  - username: `znetlify@querie.cc`
  - password: `***(ask jay)***`

3. Open guitarizard.com app.

4. Deploy tab

5. Drag folder `packages/web-ui/out` to the lil'
   dotted box that says:
   > Need to update your site?
   > Drag and drop your site folder here
