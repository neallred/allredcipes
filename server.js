var express = require('express');
var path = require('path');
var webpack = require('webpack');
var app = express();
var compress = require('compression');
app.use(compress());

var isDevelopment = (process.env.NODE_ENV !== 'production')
var static_path = path.join(__dirname, 'dist');

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("rethinkdb", puts);


var r = require('rethinkdb');

// 2. Create a connection.
var connection = null;
const connectionConfig = {
	host: 'localhost',
	port: 28015
};
let c = (callback) => { r.connect(connectionConfig, (err, conn) => { callback(conn) }) }
//r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
//	if (err) throw err;
//	connection = conn;
//});


//console.log(connection);
// 5. Queries
//r.table('recipes').filter(r.row('name').eq("Bubbly Pies")).
//	run(connection, function(err, cursor) {
//		if (err) throw err;
//		cursor.toArray(function(err, result) {
//			if (err) throw err;
//			console.log(JSON.stringify(result, null, 2));
//		});
//	});


//const trumm = c((conn) => {
//	r.table('recipes').
//		run(conn, function(err, cursor) {
//			if (err) throw err;
//			cursor.toArray(function(err, result) {
//				if (err) throw err;
//				console.log(JSON.stringify(result[0], null, 2));
//				return(JSON.stringify(result));
//			});
//		});
//});


//console.log(trumm);





app.use(express.static(static_path))
	.get('/', function (req, res) {
		res.sendFile('index.html', {
			root: static_path
		});
	}).listen(process.env.PORT || 8000, function (err) {
		if (err) {console.log(err) };
		console.log('Listening at localhost:8000');
	});

app.get('/recipes', function findByGenre(req, res, next) {
	c((conn) => {
		r.table('recipes').
			run(conn, function(err, cursor) {
				if (err) throw err;
				cursor.toArray(function(err, result) {
					if (err) throw err;
					console.log(JSON.stringify(result[0], null, 2));
					return res.send(JSON.stringify(result));
				});
			});
	});
});

   
if (isDevelopment) {
	var config = require('./webpack.config');
	var WebpackDevServer = require('webpack-dev-server');

	new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		hot: true
	}).listen(process.env.PORT || 3000, 'localhost', function (err, result) {
		if (err) { console.log(err) }
		console.log('Listening at localhost:3000');
	});
}
