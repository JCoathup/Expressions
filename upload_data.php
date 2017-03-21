<?php
$filename = $_POST['test'];
$temp = "text.txt";
$success2 = file_put_contents($temp, $filename, FILE_APPEND);
$success3 = file_get_contents($temp);
$upload_dir = "upload/";
$img = $_POST['hidden_data'];
$img = str_replace('data:image/jpeg;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$newstring = substr($success3, -13);
$file = "$upload_dir$newstring.jpg";
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';
?>
