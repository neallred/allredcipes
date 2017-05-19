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
  const { body={} } = req;
  const { author, name, ingredients, instructions } = body;
  const newRecipe = {
    author,
    name,
    ingredients,
    instructions
  }
  const expectedFields = [
    'author',
    'name',
    'ingredients',
    'instructions'
  ]

  const missingFieldsTemplate = 'Unable to add recipe, these fields are missing:'
  const missingFieldsError = checkFieldsMissing(newRecipe, expectedFields, missingFieldsTemplate);
  if (missingFieldsError) { res.send(missingFieldsError); return null }

  Recipe.create(newRecipe, function(err, result) {
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

  Recipe.find({_id: id})
    .limit(1)
    .exec(function(err, recipeToEdit) {
      if (err) {
        return next(err);
      }
      if (!recipeToEdit) {
        return res.status(404).send('Not found\n')
      }
      console.log(requestLogTemplate)
      console.log(`matched recipe is: ${JSON.stringify(recipeToEdit)}`)


      res.send(recipeToEdit);
      //next();

    })
  return null;
}
//function find(conditions, projection, options, callback) {
//  if (typeof conditions === 'function') {
//    callback = conditions;
//    conditions = {};
//    projection = null;
//    options = null;
//  } else if (typeof projection === 'function') {
//    callback = projection;
//    projection = null;
//    options = null;
//  } else if (typeof options === 'function') {
//    callback = options;
//    options = null;
//  }
//
//  var mq = new this.Query({}, {}, this, this.collection);
//  mq.select(projection);
//  mq.setOptions(options);
//  if (this.schema.discriminatorMapping && mq.selectedInclusively()) {
//    mq.select(this.schema.options.discriminatorKey);
//  }
//
//  if (callback) {
//    callback = this.$wrapCallback(callback);
//  }
//
//  return mq.find(conditions, callback);
//}
//function update(conditions, doc, options, callback) {
//  return _update(this, 'update', conditions, doc, options, callback);
//}


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

function checkFieldsMissing(requestObject, expectedFields, errorTemplate) {
  const missingFields = Object.keys(requestObject).filter(fieldName => !requestObject[fieldName])
  if ( missingFields.length ) {
    return missingFields.reduce((accumulator, field) => accumulator + ' ' + field, errorTemplate) + '\n'
  }
  else {
    return null
  }
}
