# Architecture

* Api in rails
* Website in react.js


# Installation steps

* `git clone git@bitbucket.org:mskills/idun.git`
* `cd idun`
* `npm install`
* in case of problems with node-sass run `npm rebuild node-sass`
* Visit on http://localhost:8080

# Testing
Run `npm test` for feature tests (phantomjs)
Run `npm unit-test` for unit tests (jest)

You can use prod api in development env so you don't need api server running
Edit `config.js` and edit `apiUrl`.
