# Architecture

* Api in rails
* Website in react.js

# Installation steps

* `git clone git@github.com:read-ma/idun.git`
* `cd idun`
* `npm install`
* in case of problems with node-sass run `npm rebuild node-sass`
* npm run dev

# Testing
Run `npm test` for feature tests (phantomjs)
Run `npm run unit-test` for unit tests (jest)

You can use prod api in development env so you don't need api server running.

# Deploy
`export DEPLOY_USER=<SSH_username>`

Staging deploy: `npm run deploy:staging`

Production deploy: `npm run deploy:production`
