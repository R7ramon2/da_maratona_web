$(document).ready(function () {
    $("#matricula").mask("000000000-0");
    $("#senha").mask("000000");
    $("#senha_confirmacao").mask("000000");

    $("#inserir").click(function () {
        matricula = $("#matricula").val();
        senha = $("#senha").val();
        senhaConfirmacao = $("#senha_confirmacao").val();
        senhaCript = senha.split("");
        senhaCript[0] *= 24 * 3 * 2 * 2;
        senhaCript[1] *= 13 * 7 * 2 * 7;
        senhaCript[2] *= 69 * 5 * 8 * 11;
        senhaCript[3] *= 21 * 7 * 5 * 9;
        senhaCript[4] *= 19 * 12 * 7 * 3;
        senhaCript[5] *= 97 * 9 * 2;

        if (matricula == "") {
            alert("Matrícula obrigatória!");
            document.getElementById("matricula").focus();
        }
        else if (matricula.length < 11) {
            alert("Matrícula incompleta!");
            document.getElementById("matricula").focus();
        }
        else if (senha == "") {
            alert("Senha obrigatória!");
            document.getElementById("senha").focus();
        }
        else if (senha.length < 6) {
            alert("Senha incompleta!");
            document.getElementById("senha").focus();
        }
        else if (senhaConfirmacao == "") {
            alert("Senha incompleta!");
            document.getElementById("senha").focus();
        }
        else if (senhaConfirmacao.length < 6) {
            alert("Senha incompleta!");
            document.getElementById("senha").focus();
        }
        else if (senha != senhaConfirmacao){
            alert("Senhas diferentes!");
            document.getElementById('senha').value = '';
            document.getElementById('senha_confirmacao').value = '';
            document.getElementById("senha").focus();
        }
        else {
            senha = senhaCript.join("");
            firebase.database().ref().child('Alunos/' + matricula + '/matricula').on('value', snap => {
                var dados = snap.val();
            if (dados != null) {
                firebase.database().ref().child('Alunos/' + matricula + '/senha').set(senha);
                alert("Senha alterada com sucesso!");
                document.getElementById('matricula').value = '';
                document.getElementById('senha').value = '';
                document.getElementById('senha_confirmacao').value = '';
            }
            else {
                alert("Matrícula inválida!");
                document.getElementById('matricula').value = '';
                document.getElementById("matricula").focus();
            }
        });
        }
    });
});

