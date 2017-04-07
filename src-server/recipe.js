const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  author: String,
  name: String,
  ingredients: String,
  instructions: String,
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
