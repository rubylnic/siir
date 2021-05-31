<?php
$method = $_SERVER['REQUEST_METHOD'];
$c = true;

$admin_email  = 'ksenia.bolshako@mail.ru';
$form_subject = 'Заявка с сайта СИИР';
$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);

foreach ( $_POST as $key => $value ) {
  if ( is_array($value) ) {
    $value = implode(", ", $value);
  }
  if ( $value != "" && $key != "name" && $key != "phone") {
    $message .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e2dddd 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e2dddd 1px solid;'>$value</td>
    </tr>
    ";
  } else if ($value != "" && $key == "name") {
    $message .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e2dddd 1px solid;'><b>ИМЯ</b></td>
      <td style='padding: 10px; border: #e2dddd 1px solid;'>$value</td>
    </tr>
    ";
  } else if ($value != "" && $key == "phone") {
    $message .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e2dddd 1px solid;'><b>Телефон для связи</b></td>
      <td style='padding: 10px; border: #e2dddd 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
    return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;
    mail($admin_email, $form_subject, $message, $headers);
if (mail($admin_email, adopt($form_subject), $message, $headers )) {
    http_response_code(200);
    echo "Данные отправлены.";

} else {
    http_response_code(400);
    echo "Ошибка. Данные не отправлены.";
};
