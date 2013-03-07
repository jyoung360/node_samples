<?php
$fileExists = false;
$fileExists = file_exists('blah.txt');
if(fileExists) {
	echo('File exists!'.PHP_EOL);
}
else {
	echo('File does not exists :('.PHP_EOL);
}
