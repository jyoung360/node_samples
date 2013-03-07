var socket = io.connect(window.location.origin);
socket.on('news', function (data) {
	$('#socket_data').append('<li>'+data.message+'<span class="iconic star" data-id="'+data.index+'"></span><span id="like_'+data.index+'" class="likes"></span></li>');
	$('.star').unbind('click').bind('click',likeHandler);
	socket.emit('my other event', { my: 'data' });
});
socket.on('like', function(data) {
	$('#like_'+data.messageId).html('+'+data.likes);
	$('#like_'+data.messageId).addClass('likes sizeit');
});

$().ready(function(){
	$('#start_process').bind('click',function(event){
		sendMessage($('#message').val());
	});
	$(window).bind('keydown',function(event){
		if(event.which === 13) {
			sendMessage($('#message').val());
		}
		//console.log(event);
		//socket.emit('message',{ message : event.which });
	});
	$(window).bind('keyup',function(event){
		//console.log("keyup: %j",event);
	});
});

function likeHandler(event,obj) {
	socket.emit('like',{ "messageId" : $(this).attr('data-id') });
}
function sendMessage(msg) {
	if(typeof msg != 'undefined' && $.trim(msg).length > 0) {
		socket.emit('message',{ "message" : msg });
	}
	$('#message').val('');	
}
