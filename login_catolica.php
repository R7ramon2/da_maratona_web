<?php

/*
 * Retornos de erros   -- Ramon Ranieri e Tiago Emerencino
 * -1 --> erro de internet e ou no servidor
 *  0 --> erro ao logar (dados vazios ou todos incorretos)
 *  1 --> sucesso ao logar
 *  2 --> erro de matricula
 *  3 --> erro do digito verificador
 *  4 --> senha incorreta
 * */


error_reporting(0);
$cond = 1;

if (isset($_GET['matricula']) && $_GET['matricula'] != "") {
    $matricula = $_GET['matricula'];
} else {
    $cond = 0;
}

if (isset($_GET['digito']) && $_GET['digito'] != "") {
    $digito = $_GET['digito'];
} else {
    $cond = 0;
}

if (isset($_GET['senha']) && $_GET['senha'] != "") {
    $senha = $_GET['senha'];
} else {
    $cond = 0;
}

/*Debugs*/
/*
echo $matricula;
echo "<br />";
echo $digito;
echo "<br />";
echo $senha;
echo "<br />";
*/


$notMatricula = array(

    0 => "Matricula",
    1 => "incorreta"
);

if ($cond) {
    try {
        $content = http_build_query(array(

            'rotina' => '1',

            'Matricula' => $matricula,

            'Digito' => $digito,

            'Senha' => $senha,

        ));

        $context = stream_context_create(array(

            'http' => array(

                'method' => 'POST',

                'header' => 'Content-type: application/x-www-form-urlencoded',

                'content' => $content,

            )

        ));

        $url = "http://www.unicap.br/PortalGraduacao/AlunoGraduacao;jsessionid=D449FC6E80C58ED1C8B0D15740F96324";
        $url = preg_replace("/ /", "%20", $url);
        $result = file_get_contents($url, null, $context);

        /*Recuperar matricula, senha e nome*/
        $nome = explode('<div class="container info-aluno">', $result);

        if (!empty($nome[1])) {
            $nome = $nome[1];
        }
        $nome = explode('<div class="mensagem-inicial">', $nome);
        if (!empty($nome[0])) {
            $nome = $nome[0];
        }

        $verificaUsuario = explode('<div class="mensagem-inicial">', $result);
        if (!empty($verificaUsuario[1])) {
            $verificaUsuario = $verificaUsuario[1];
        }
        $verificador = explode(".", $verificaUsuario);
        if (!empty($verificador[0])) {
            $verificador = $verificador[0];
            $qtdString = strlen($verificador);
        } else {
            $qtdString = 0;
        }
        if ($qtdString == 148) {
            echo 1;
        }
        else {
            $erroDados = explode("<h5 class=\"center\">",$result);
            if(!empty($erroDados[1])){
                $erroDados = $erroDados[1];
            }
            $erroDados = explode("<div class=\"modal-footer\">",$erroDados);
            if(!empty($erroDados[0])){
                $erroDados = $erroDados[0];
            }
            if(strlen($erroDados) == 72){
                echo 2;
            }
            else if (strlen($erroDados) == 64){
                echo 3;
            }
            else if(strlen($erroDados) == 44){
                echo 4;
            }

        }

    }
    catch (Exception $e){
        echo "-1";
    }
} else {
    echo "0";
}

?>
