
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load customers route
var customers = require('./routes/customers');
var customersweb = require('./routes/customersweb'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: '172.30.44.183', // host mysql service
        user: 'dbadmin',
        password : 'dbpassword',
        port : 3306, // port mysql service
        database:'marketing'

    },'pool') // pool or single

);


// Base API
app.get('/', routes.index);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.get('/customers/details/:id', customers.details);
app.get('/customers/name/:id', customers.getname);
app.get('/customers/address/:id', customers.getaddress);
app.get('/customers/phone/:id', customers.getphone);
app.get('/customers/email/:id', customers.getemail);
app.post('/customers/edit/:id',customers.save_edit);

// Web application
app.get('/', routes.index);
app.get('/customersweb', customers.list);
app.get('/customersweb/add', customers.add);
app.post('/customersweb/add', customers.save);
app.get('/customersweb/delete/:id', customers.delete_customer);
app.get('/customersweb/edit/:id', customers.edit);
app.get('/customersweb/details/:id', customers.details);
app.get('/customersweb/name/:id', customers.getname);
app.get('/customersweb/address/:id', customers.getaddress);
app.get('/customersweb/phone/:id', customers.getphone);
app.get('/customersweb/email/:id', customers.getemail);
app.post('/customersweb/edit/:id',customers.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
