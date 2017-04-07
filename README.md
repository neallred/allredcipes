Recipe Box App
==============================
A Recipe Box built with Node, Mongo, Webpack, Babel, React, Redux, and Sass

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

TODO
------------------------------
* Migrate to MongoDB.
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
