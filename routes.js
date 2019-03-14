'use sctrict';

const Pois = require('./app/controllers/poi.js');
const Accounts = require('./app/controllers/accounts.js');

module.exports = [
{ method: 'GET', path: '/', config: Accounts.index },
{ method: 'GET', path: '/signup', config: Accounts.showSignup },
{ method: 'GET', path: '/login', config: Accounts.showLogin },
{ method: 'GET', path: '/logout', config: Accounts.logout },
{ method: 'POST', path: '/signup', config: Accounts.signup },
{ method: 'POST', path: '/login', config: Accounts.login },
{ method: 'GET', path: '/settings', config: Accounts.showSettings },
{ method: 'POST', path: '/settings', config: Accounts.updateSettings },

{ method: 'GET', path: '/home', config: Pois.home },
{ method: 'GET', path: '/report', config: Pois.report },
{ method: 'POST', path: '/addpoi', config: Pois.addpoi },

{
	method:'GET',
	path: '/{param*}',
	options:{auth:false},
	handler:{
		directory:{
			path:'./public'
		}
	}
}
];