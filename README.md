# Installation steps

* `git clone git@github.com:read-ma/idun.git`
* `cd idun`
* `yarn --force`
* `yarn dev`

# Testing
Run `yarn test` for feature tests (phantomjs)

Run `yarn unit-test` for unit tests (jest)

You can use prod api in development env so you don't need api server running.

# Deploy
`export DEPLOY_USER=<SSH_username>`

Staging deploy: `yarn deploy:staging`

Production deploy: `yarn deploy:production`
