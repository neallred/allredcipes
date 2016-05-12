Recipe Box App
==============================
A Recipe Box built with Webpack, Babel, React, Redux, and Sass

Getting started
------------------------------
Install webpack: `npm install -g webpack`
Install the dev server: `npm install -g webpack-dev-server`
Install dependencies `npm install`

Server
------------------------------
`npm run server`

The go to [localhost:8080](http://localhost:8080)

This will start up a webpack-dev-server that has hot module
replacement. Just change a file and save and see the results
without having to refresh.

Structure
------------------------------
Presentational/dumb/stateless,functional components are
in src/components. Components that subscribe to the Redux
store are located in src/containers.

TODO
------------------------------
* Create filter capability
* Migrate from plain text fixture file to SQLite DB. Or to RethinkDB?
* Create user system.
  * Sendgrid email service
  * username,email,password
  * Ideate user data table
    * Authentication Tokens?
    * Activation Tokens?
    * Password Reset Tokens?
  * Permissions system
    * **anonymous**
      * read all
      * edit/delete none
    * **authenticated**
    * edit/delete own
    * **admin**
      * can edit all
* Add recipes in physical box
