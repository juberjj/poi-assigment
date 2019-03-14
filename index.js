'use strict'

require('dotenv').config();
require('./app/models/db');

const Hapi = require('hapi');
const server = Hapi.server({
	port: process.env.PORT || 3000,
	host: 'localhost'
});


// debug .env file
/*const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}*/
// server.bind({
//   donations: [],
//   users:[],
// });

async function init(){
	await server.register(require('inert'));
	await server.register(require('hapi-auth-cookie'));
	await server.register(require('vision'));  //initialize plugin

//initialize handlebars

	server.views({
		engines:{
			hbs: require('handlebars')
		},
		relativeTo: __dirname,
		path: './app/views',
		layoutPath: './app/views/layouts',
		partialsPath: './app/views/partials',
		layout: true,
		isCached: false
	})

// initialize auth-cookie
	server.auth.strategy('standard','cookie',{
		password: process.env.COOKIE_PASS,
		cookie:process.env.COOKIE_NAME,
		isSecure: false,
		ttl: 24 * 60 * 60 * 1000,
		redirectTo: '/'
	})	


	server.auth.default({
		mode:'required',
		strategy:'standard',
	})

	server.route(require('./routes'))
	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err=>{
	console.log(err);
	process.exit(1);
});

init();

