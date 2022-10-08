# Module Federation Experiments

This repository serves as a volatile container for experiments using module fedaration and Next.js. We are very much allowed to make silly mistakes here.

Try out the codebase by doing the following:
- (terminal) Install dependencies: `yarn install`;
- (terminal) Run home and shop projects:
  ```
  yarn nx run-many --target=serve --parallel=true --projects=home,shop
  ```
- (browser) Visit port 4200;
  - Verify that the static page renders as expected;
- (browser) Click SSR:
  - Verify that the SSR page renders as expected;
- (browser) Click CSR:
  - Verify that the CSR page renders as expected;

If you feel like going further, I suggest you figure out what is going on in the source of this information, as listed bellow:
- [next-srr examples](https://github.com/module-federation/module-federation-examples/blob/master/nextjs-ssr);
- [nextjs-mf](https://www.npmjs.com/package/@module-federation/nextjs-mf);
- [@ScriptedAlchemy](https://twitter.com/ScriptedAlchemy);
