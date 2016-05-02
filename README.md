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

This will start up a webpack-dev-server that had hot module
replacement. Just change a file and save and see the results
without having to refresh.

Structure
------------------------------
Presentational/dumb/stateless&functionless components are
in src/components. Components that subscribe to the Redux
store are located in src/containers.

TODO
------------------------------
* Create filter capability
* set inputs and then let them change
  * How? immediate access to state seems like too much.
* Migrate from plain text fixture file to SQLite DB.
* Create user system.
  * Sendgrid email service
  * username,email,password
  * Ideate user data table
    * Authentication Tokens?
    * Activation Tokens?
    * Password Reset Tokens?
  * Permissions system
    * *anonymous*
      * read all
      * edit/delete none
    * *authenticated*
    * edit/delete own
    * *admin*
      * can edit all
* Add recipes
  * Cadbury egg cookies
    * Authors Sara Wells and Kate Jones
  * zucchini bread
  * no bake cookies
  * Sausage potato soup
  * Chocolate cheese cake
