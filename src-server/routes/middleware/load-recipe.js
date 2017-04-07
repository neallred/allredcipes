const Recipe = require('../../recipe.js')

function loadRecipe(req, res, next) {
  Recipe.findOne({name: req.params.name}, function(err, recipe) {
    if (err) {
      return next(err)
    }
    if (!recipe) {
      return res.send('Not found', 404)
    }
    req.recipe = recipe
    next()
  })
}

module.exports = loadRecipe
