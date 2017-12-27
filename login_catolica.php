<?php

error_reporting(E_ERROR | E_PARSE);
$matricula = "----";
$digito = "-";
$senha = "------";


$content = http_build_query(array(
	'rotina' => '1',
	'Matricula' => $matricula,
	'Digito' => $digito,
	'Senha' => $senha,
));

$context = stream_context_create(array(
	'http' => array(
		'method'  => 'POST',
		'header'  => 'Content-type: application/x-www-form-urlencoded',
		'content' => $content,
	)
));
  
$result = file_get_contents('http://www.unicap.br/PortalGraduacao/AlunoGraduacao;jsessionid=D449FC6E80C58ED1C8B0D15740F96324', null, $context);


//var_dump($result);

$nome = explode('<div class="container info-aluno">',$result);
if(!empty($nome[1])){
	$nome = $nome[1];
}

$nome = explode('<div class="mensagem-inicial">',$nome);
if(!empty($nome[0])){
	$nome = $nome[0];
}


$test = explode('<div class="mensagem-inicial">',$result);

if(!empty($test[1])){
	$test = $test[1];
}


$verificador = explode(".",$test);

if(!empty($verificador[0])){
	$verificador = $verificador[0];
	$qtdString = strlen($verificador);
}
else{
	$qtdString = 0;
}

if($qtdString == 148){
	echo "Usuário logado com sucesso<br />";
	echo $nome;
}
else{
	echo "Não foi possível efetuar o login";
}
?>