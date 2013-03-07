
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes');

var sockets = [];
var messageId = 0;
var messageLikes = {};

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);
var chat = io.sockets.on('connection', function (socket) {
	sockets.push(socket);
	//socket.emit('news', "<b>Connected to server!</b>");
	socket.on('message', function (data) {
		messageId++;
		sockets.forEach(function(s,index){
			if(index != sockets.indexOf(socket)) {
				sockets[index].emit('news',{ message: 'User '+index+' says :: '+data.message, "index" : messageId });
			}
			else {
				sockets[index].emit('news',{ message: "I said :: "+data.message, "index" : messageId });
			}
		});
	});
	socket.on('like', function(data) {
		if(typeof messageLikes[data.messageId] === 'undefined') {
			messageLikes[data.messageId] = 1;
		} 
		else {
			messageLikes[data.messageId]++;
		}

		var packet = { "messageId": data.messageId, "likes" : messageLikes[data.messageId] };

		sockets.forEach(function(s,index){
			sockets[index].emit('like',packet);
		});
	});
	socket.on('disconnect', function() {
		delete sockets[sockets.indexOf(socket)];
	});
});

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.compress());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(express.cookieParser());
	app.use(app.router);
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

app.listen(8080, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
