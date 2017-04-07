module.exports = function(app) {
  app.get('/test', function(req,res) { res.send('success\n') })

  app.get('/recipes', loadRecipes);

  app.post('/recipes', /*isLoggedIn,*/ createRecipe )
  app.put('/recipes/:id', /*isLoggedIn,*/ updateRecipe )
  app.delete('/recipes/:id', /*isLoggedIn,*/ deleteRecipe)

}

function loadRecipes(req, res, next) {
  console.log('loadRecipes reached');
  res.send('loadRecipes to be implemented\n');
  return null;
}

function createRecipe(req, res, next) {
  const { body = {}, params = {} } = req
  const { name, ingredients, instructions, author } = body
  const { id } = params

  if (!name || !name.trim()) {
    return res.send('Unable to create recipe, no recipe name was supplied')
  }
  res.send('createRecipe to be implemented\n');
  return null;

  const insertObject = {}
  insertObject.hideIngredients = true
  if (name) { insertObject.name = name}
  if (ingredients) { insertObject.ingredients = ingredients}
  if (instructions) { insertObject.instructions = instructions}
  if (author) { insertObject.author = author}

  //c((conn) => {
  //	r.table('recipes').insert(insertObject)
  //		.run(conn, function(err, result) {
  //			if (err) { throw err }
  //			const newId = result && result.generated_keys && result.generated_keys[0]
  //			console.log(newId)
  //			r.table('recipes').get(newId).run(conn, function(err, resultFetch) {
  //				if (err) { throw err }
  //				console.log('new recipe:')
  //				console.log(JSON.stringify(resultFetch))
  //				const newRecipe = Object.assign({}, resultFetch, {id: newId})
  //				return res.send(JSON.stringify(newRecipe))
  //			})
  //		})
  //})
}

function updateRecipe(req, res, next) {
  const { body = {}, params = {} } = req
  const {id} = params
  const { name, ingredients, instructions, author } = body
  const requestLogTemplate = `User tried to update recipe of id ${id} with
name: ${name},
ingredients: ${ingredients},
instructions: ${instructions},
author: ${author}
`

  const updateObject = {}
  if (name) { updateObject.name = name}
  if (ingredients) { updateObject.ingredients = ingredients}
  if (instructions) { updateObject.instructions = instructions}
  if (author) { updateObject.author = author}

  console.log('updateRecipe to be implemented\n');
  return null;


  //  c((conn) => {
  //    r.table('recipes').get(id).update(updateObject)
  //      .run(conn, function(err, result) {
  //        if (err) { throw err }
  //        console.log(result)
  //        r.table('recipes').get(id).run(conn, function(err, resultFetch) {
  //          if (err) { throw err }
  //          console.log(JSON.stringify(resultFetch))
  //          return res.send(JSON.stringify(resultFetch))
  //        })
  //      })
  //  })
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


