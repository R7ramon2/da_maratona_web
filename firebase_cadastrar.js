$(document).ready(function () {
    $("#matricula").mask("000000000-0");
    $("#periodo").mask("00");
    $("#senha").mask("000000");


    $("#adm").click(function () {
        if ($(this).val() === "0") {
            $(this).val("1");
        }
        else {
            $(this).val("0");
        }
    });


    $("#inserir").click(function () {
        nome = $("#nome_completo").val();
        matricula = $("#matricula").val();
        senha = $("#senha").val();
        periodo = $("#periodo").val();
        periodo = parseInt(periodo);
        adm = $("#adm").val();
        faltas = 0;
        imagem = "0";
        pontuacao = 0;
        verificado = false;
        nome_completo = nome.split(" ");
        primeiro_nome = nome_completo[0];
        ultimo_nome = nome_completo[nome_completo.length - 1];
        senhaCript = senha.split("");
        senhaCript[0] *= 24 * 3 * 2 * 2;
        senhaCript[1] *= 13 * 7 * 2 * 7;
        senhaCript[2] *= 69 * 5 * 8 * 11;
        senhaCript[3] *= 21 * 7 * 5 * 9;
        senhaCript[4] *= 19 * 12 * 7 * 3;
        senhaCript[5] *= 97 * 9 * 2;


        if (nome === "") {
            alert("Nome obrigatório!");
            document.getElementById("nome_completo").focus();
            // $("#nome_completo").focus();
        }
        else if (matricula === "") {
            alert("Matrícula obrigatória!");
            document.getElementById("matricula").focus();
            // $("#matricula").focus();
        }
        else if (matricula.length < 11) {
            alert("Matrícula incompleta!");
            document.getElementById("matricula").focus();
            // $("matricula").focus();
        }
        else if (senha === "") {
            alert("Senha obrigatória!");
            document.getElementById("senha").focus();
            // $("senha").focus();
        }
        else if (senha.length < 6) {
            alert("Senha incompleta!");
            document.getElementById("senha").focus();
            // $("senha").focus();
        }
        else {
            senha = senhaCript.join("");
            const dbRef = firebase.database().ref().child('Alunos/' + matricula + '/matricula');
            dbRef.once('value', snap => {
                const dadoMatricula = snap.val();
                if (matricula !== dadoMatricula) {
                    firebase.database().ref('Alunos/' + matricula).set({
                        nome: nome,
                        matricula: matricula,
                        senha: senha,
                        periodo: periodo,
                        admin: adm,
                        faltas: faltas,
                        imagem: imagem,
                        pontuacao: pontuacao,
                        verificado: verificado,
                        primeiroNome: primeiro_nome,
                        ultimoNome: ultimo_nome
                    });
                    alert("Aluno cadastrado com sucesso!");
                    document.getElementById('nome_completo').value = '';
                    document.getElementById('matricula').value = '';
                    document.getElementById('senha').value = '';
                    document.getElementById('periodo').value = '';
                    document.getElementById('adm').checked = false;
                }
                else {
                    alert("Matrícula já cadastrada!");
                    document.getElementById('matricula').value = '';
                }
            });
        }
    });
});
