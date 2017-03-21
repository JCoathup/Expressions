<?php
if(!isset($_POST['formEmail']))
{
 //This page should not be accessed directly. Need to submit the form.
 echo "error; you need to submit the form!";
}
$emailAddress = $_POST['emailAddress'];
$emailSubject = $_POST['emailSubject'];
$emailMessage = $_POST['emailMessage'];
$emailImage = $_POST['imageData'];
$filewrite = file_put_contents('tester.txt', $emailImage);
$emailImage = str_replace('data:image/jpeg;base64,', '', $emailImage);
$emailImage = str_replace(' ', '+', $emailImage);
$data = base64_decode($emailImage);
$file = "emailUploads/".mktime().".jpg";
$success = file_put_contents($file, $data);
//Validate first
if(empty($emailAddress))
{
    echo "Name and email are mandatory!";
    exit;
}
if(IsInjected($emailAddress))
{
    echo "Bad email value!";
    exit;
}
//populate email fields
$email_from = 'expressions@thewebassassin.com';
$email_subject = $emailSubject;
$email_body = "<p>You have received a new message from the user</p>.\n".
    "<p style="color:red; font-size:20px; width:90%;">\n $emailMessage\n\n</p>".'<img style="width:90%;" src="http://thewebassassin.com/'.$file.'">';

$to = $emailAddress;//<== update the email address
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $email_from \r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
//Send the email!
mail($to,$email_subject,$email_body,$headers);
// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}

?>
