var r = require('rethinkdb');

const config = {
  "rethinkdb": {
    "host": "localhost",
    "port": 28015,
    "db": "chekkit_out"
  },
  "express": {
    "host": "localhost",
    "port": 3000
  },
  "buildDirectory": "build"
}
let DATABASE = config.rethinkdb.db || 'chekkit_out';
let TABLES = ['dude']; 
let TABLES_RECIPES = ['dude']; 

//CREATE DB
//r.dbCreate('chekkit_out').run(conn

//CREATE TABLES
//r.db('chekkit_out').tableCreate('dude').run(connection, callbackConnect);
//r.db('chekkit_out').tableCreate('recipes').run(connection, callbackConnect);

//INSERT DATA
//
//
// r.table('recipes').insert({
//    recipeId: 0,
//    hideIngredients: true,
//    name: 'Bubbly Pies',
//    ingredients: 'CRUST:\n1/2 c. butter or margarine\n2 Tbsp. granulated sweetening\n2 1/2 c. flour\n1/2 teaspoon salt\n1/2 c. ice water\n FILLING:\n5 c. blueberrie     s (or one 20-ounce package, frozen)\n1 c. granulated sweetening\n1/4 teaspoon powdered klah bark (cinnamon)\n2 tsp. citrus juice\n1-2 Tbsp. butter or margerine',
//    instructions: 'Cut the butter into chunks.\nCombine the dry ingredients into a bowl.\nWork the butter gently into the dry mixture with a fork until pieces the s     ize of peas form.\nSprinkle the water over and work in. (do not overwork the dough).\nForm the dough into a ball.\nGently toss berries with sweetening and klah bark      in a large bowl.\nSprinkle citrus juice over mixture.\nSpoon berries into crust and dot with butter.\nBake in oven at 350 deg. F. for 30 min.\nMakes 1 Bubbly Pie :     )',
//    author: 'violet2flame'
//  }).run(connection,callbackConnect);
// 
// r.table('dude').insert([
//   {
//     myNumber: 1,
//     myName: 'Nathaniel',
//     myQuest: 'lernding',
//     myGoal: 'lernding RethinkDB',
//     myPrincipal: 'superNintendoSpalmers'
//   },
//   {
//     myNumber: 2,
//     myName: 'le-bro',
//     myQuest: 'carpenting',
//     myGoal: 'tables',
//     myPrincipal: 'jer-eh-mee'
//   }
// ]).run(connection, callbackConnect);

// TYPICAL CALLBACKS FOR .run
var callbackConnect = function(err, result) {
  if (err) throw err;
  console.log(JSON.stringify(result, null, 2));
}
var callbackReadAll = function (err, cursor) {
  if (err) throw err;
  cursor.toArray(function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  });
}
var initialRecipes;
var callbackReadAll2 = function (err, cursor) {
  if (err) throw err;
  cursor.toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    initialRecipes = result;
      console.log(initialRecipes);
    module.exports = initialRecipes;
    return result;
  });
}



// TYPICAL CONNECTION
var connection = null;
r.connect( {host: 'localhost', port: 28015, db: 'chekkit_out'}, function(err, conn) {
  if (err) throw err;
  connection = conn;
}).then((connection) => {
  r
    .table('recipes')
    .run(connection,callbackReadAll2)
    .finally(() => {
      //console.log(initialRecipes);
      connection.close()});
});


//READ DATA
//const initialRecipes = r.table('recipes').run(connection,callbackReadAll);


//console.log('do you reach me?');
//console.log(initialRecipes);
//console.log('do you reach me?');
