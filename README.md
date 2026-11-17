# Mohammed Apsal M — Portfolio

AI Automation Specialist. React, TanStack Start, Tailwind CSS and Nitro, configured for Netlify and Vercel.

## Local preview
```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```
Open http://127.0.0.1:5173/.

## Checks
```sh
npx tsc --noEmit
npm run lint
node --experimental-strip-types --test tests/enquiry.test.mjs
npm run build
node tests/build-smoke.mjs
```
Run the smoke check without real delivery/AI credentials; it checks the unconfigured states and never sends external messages.

See [REDESIGN.md](REDESIGN.md) for project evidence, status wording, server configuration and Vercel deployment instructions. See [.env.example](.env.example) for the server-only environment names.

The current portfolio is deployed at https://apsalautomation.com/, with https://apsal-automation-portfolio.netlify.app/ also available. Netlify builds use `netlify.toml` and the `NETLIFY=true` environment setting. Deployments currently upload the local build through Netlify CLI.
