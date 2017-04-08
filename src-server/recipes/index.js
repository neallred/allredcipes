const Recipe = require('./model');
const oldRecipes = require('../seed-recipes');

module.exports = function(app) {
  app.get('/test', function(req,res) { res.send('success\n') })

  app.get('/recipes', loadRecipes);

  app.post('/recipes', /*isLoggedIn,*/ createRecipe )
  //app.post('/recipes', /*isLoggedIn,*/ seedRecipes )
  app.put('/recipes/:id', /*isLoggedIn,*/ updateRecipe )
  app.delete('/recipes/:id', /*isLoggedIn,*/ deleteRecipe)
}

function loadRecipes(req, res, next) {
  const recipeRequestLimit = 200
  const page = req.query.page && parseInt(req.query.page, 10) || 0;

  Recipe.find({})
    .sort({name: 1})
    .skip(page * recipeRequestLimit)
    .limit(recipeRequestLimit)
    .exec(function(err, recipes) {
      if (err) {
        return next(err);
      }
      if (!recipes) {
        return res.status(404).send('Not found\n')
      }

      const sortedRecipes = recipes.sort((a, b) => {
        if(a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        else if(a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        else {
          return 0
        }
      })

      res.send(sortedRecipes);
      //next();

    })
  return null;
}

function createRecipe(req, res, next) {
  const { params={} } = req;
  const { author, name, ingredients, instructions } = params;
  const newRecipe = {
    author,
    name,
    ingredients,
    instructions
  }

  const missingFieldsTemplate = 'Unable to add recipe, these fields are missing:'
  const missingFieldsError = checkFieldsMissing(newRecipe, missingFieldsTemplate);
  if (missingFieldsError) { res.send(missingFieldsError); return null }

  Recipe.create(newRecipes, function(err, result) {
    if (err) { throw err; }
    else {
      res.send(result)
    }
  })
}

function updateRecipe(req, res, next) {
  const { body = {}, params = {} } = req
  const {id} = params
  const {
    name,
    ingredients,
    instructions,
    author
  } = body
  const requestLogTemplate = `User tried to update recipe of id ${id} with
name: ${name},
ingredients: ${ingredients},
instructions: ${instructions},
author: ${author}
`

  const updatedRecipe = {
    name,
    ingredients,
    instructions,
    author
  }

  console.log('updateRecipe to be implemented\n');
  return null;
}

function deleteRecipe(err, req, res, next) {
  const { params = {} } = req
  const {id} = params

  console.log('deleteRecipe to be implemented\n');
  return null;
  //c((conn) => {
  //	r.table("recipes").get(id).delete()
  //		.run(conn, function(err, result) {
  //			if (err) { throw err }
  //			console.log(result)
  //			if (result.deleted) {
  //				return res.send({message: `You deleted recipe of id ${id}`, id})
  //			}
  //			else if (!result.deleted && result.skipped) {
  //				return res.send({message: `Unable to delete recipe of id ${id}`})
  //			}
  //		})
  //})

}

function seedRecipes(req, res, next) {
  Recipe.create(oldRecipes, function(err, newRecipes) {
    if (err) { console.log(err)}
    else {
      console.log(newRecipes)
      //res.send(newRecipes)
    }
  })
  res.send('')
}

function checkFieldsMissing(fields, errorTemplate) {
  const missingFields = Object.keys(fields).filter(fieldName => !newRecipe[field] && fieldName)
  if ( missingFields.length ) {
    return missingFields.reduce((accumulator, field) => accumulator + ' ' + field, errorTemplate) + '\n'
  }
  else {
    return null
  }
}
