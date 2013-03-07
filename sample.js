var http = require('http');
var fs = require('fs');
var microtime = require('microtime');

if(process.argv.length < 3) {
	console.log('Usage: node sample.js <query>')
	process.exit(1);
}

var startTime = microtime.now();
var endTime;

var responseCode = null;
var options = {
	host: 'ajax.googleapis.com',
	port: 80,
	path: '/ajax/services/search/images?v=1.0&q='+process.argv[2]
};

http.get(options, function(res) {
	var jsonResults = '';
	res.on('data', function(d) {
		jsonResults += d;
	});
	res.on('end', function(d) {
		if(d) { jsonResults += d; }
		var obj = JSON.parse(jsonResults);
		obj.responseData.results.forEach(function(item) {
			console.log(item.url);
			downloadImage(item.url,item.imageId+'.jpg');
		});
		obj.responseData.cursor.pages.forEach(function(item) {
			optionsClone = JSON.parse(JSON.stringify(options));
			optionsClone.path += '&start='+item.start;
			console.log(optionsClone.path);
			http.get(optionsClone, function(res) {
				var jsonResults = '';
				res.on('data', function(d) {
					jsonResults += d;
				});
				res.on('end', function(d) {
					if(d) { jsonResults += d; }
					var obj = JSON.parse(jsonResults);
					obj.responseData.results.forEach(function(item) {
						console.log(item.url);
						downloadImage(item.url,item.imageId+'.jpg');
					});
				});
			}).on('error', function(e) {
				console.error(e);
			});

		})
	});
}).on('error', function(e) {
	console.error(e);
});

function downloadImage(url,name) {
	http.get(url,function(res) {
		var data = '';
		res.setEncoding('binary');

		res.on('data',function(d) {
			if(d) { data += d; }
		});
		res.on('end',function(d) {
			if(d) { data += d; }
			fs.writeFile('pictures/'+name, data, 'binary', function(err){
				if (err) throw err;
				//console.log('File saved.');
				var nowTime = microtime.now();
				console.log("Elapsed Time: "+(nowTime-startTime)/1000000);
			});
		});
	});
}
