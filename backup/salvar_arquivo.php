<?php

$data = date("d_m_Y_h_i_s");
$arq = "backup_diario/backup_".$data.".json";

$dados_json = $_POST['json'];

$fp = fopen($arq, "a");
$escreve = fwrite($fp, $dados_json);
fclose($fp);



require('PHPMailer/class.phpmailer.php');
$mail = new PHPMailer(); //instancia a classe

$mail->IsMail();//define função

//autenticação
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'unicap.dacomp@gmail.com';
$mail->Password = 'unicapdebugs';
$mail->Port = '465';

$mail->IsHTML(true);
$mail->Subject = utf8_decode("Backup do dia ". date('d/m/Y'));//assunto do email
$mail->From = "unicap.dacomp@gmail.com";//email do remetente
$mail->FromName ='Ramon Ranieri';//nome do remetente

$mail->Body = utf8_decode("Backup diário banco de dados Firebase. <br /> DA-Maratona");
$mail->AddAddress('r.ranieri@netmake.com.br');//email do destinatario
$mail->AddAddress('unicap.dacomp@gmail.com');
$mail->AddAddress('emerenciano.tiago@gmail.com');
$mail->AddAttachment($arq);//anexa o arquivo

$verifica = $mail->Send();//envia o email

if($verifica){
    echo "Enviou";
}
else{
    echo "Não enviou!" . $mail->ErrorInfo;
}

?>