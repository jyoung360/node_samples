var net = require('net');
var sockets = [];
var s = net.Server(function(socket){
	sockets.push(socket);
	socket.on('data',function(d){
		sockets.forEach(function(s,index){
			if(index != sockets.indexOf(socket)) {
				s.write('User '+index+': '+d);
			}
		});
	});
	socket.on('end', function() {
		delete sockets[sockets.indexOf(socket)];
	});
});

s.listen(8000);