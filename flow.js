var fs = require('fs');

var lineCount = 0;
console.log('Before I open file');

fs.readFile('blah.txt','UTF-8',function(err,data) {
	var lines = data.split('\n');
	console.log('File open and lines read.')
	lines.forEach(function(line){
		console.log("Line contents %s",line);
		lineCount++;
	});
	console.log('All done with lines');
	console.log(lineCount);
});

console.log('All done with file');
console.log('Total Lines: %s',lineCount);
