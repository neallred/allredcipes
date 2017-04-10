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
* Refine user system.
  Current issues:
    1. login is broken on backend, it always responds with a token and posted details, even if there is no such user.
    2. refine client side to have sense of user roles (admins can see and edit all recipes, and see/edit/delete all users)
    3. apply checks for authentication on all editing/creating/deleting

  See:
  http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/
  http://blog.slatepeak.com/creating-a-simple-node-express-api-authentication-system-with-passport-and-jwt/
  http://blog.slatepeak.com/build-a-react-redux-app-with-json-web-token-jwt-authentication/
* create Sendgrid email service
