<?php

/*
  contact form
 */
require_once 'PHPMailer/PHPMailerAutoload.php';
$mail = new PHPMailer();

$email = $_POST['con_email'];
$name = $_POST['con_name'];
$mess = $_POST['con_msg'];

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'p3plcpnl0361.prod.phx3.secureserver.net';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'saiful@droitlab.com';                 // SMTP username
$mail->Password = '@Sai#ful12';                           // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; 

$mail->setFrom('saiful@droitlab.com', 'Droitlab');
$mail->isHTML(true);

$mail->Subject = 'faded User Query';
$mail->Body    = '<strong>Name : </strong>' . $name . '<br/><br/>';
$mail->Body  .= $mess . '<br/>';

if(!$mail->send()) 
{
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}
else
{
    echo 'Message has been sent';
}
