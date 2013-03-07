var fs = require('fs');
var fileExists = false;
fs.exists('blah.txt',function(state){
	fileExists = state;
});

if(fileExists) {
	console.log("File exists!");
}
else {
	console.log("File does not exist :(")
}
