<?php
if(count($argv) < 2) {
	echo("Usage: php sample.php <query>'");
	exit;
}
$time_start = microtime(true);

$host = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='.$argv[1];
$contents = file_get_contents( $host );
$json = json_decode($contents);
processURL($json);

foreach($json->responseData->cursor->pages as $key => $value) {
	$contents = file_get_contents( $host.'&start='.$value->start );
	$json = json_decode($contents);
	processURL($json);
}

function processURL($json) {
	foreach($json->responseData->results as $key => $value) {
		echo($value->url.PHP_EOL);
		downloadImage($value->imageId.".jpg",$value->url);
	}
}

function downloadImage($filename,$url) {
	global $time_start;
	file_put_contents('pictures/'.$filename,file_get_contents($url));
	$time_end = microtime(true);
	$time = ($time_end - $time_start);

	echo "Elapsed Time: $time seconds\n";
}
?>
