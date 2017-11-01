$(document).ready(function () {
    $("#matricula").mask("000000000-0");
    $("#senha").mask("000000");

    $("#login").click(function () {
        matricula = $("#matricula").val();
        senha = $("#senha").val();
        senhaCript = senha.split("");
        senhaCript[0] *= 24 * 3 * 2 * 2;
        senhaCript[1] *= 13 * 7 * 2 * 7;
        senhaCript[2] *= 69 * 5 * 8 * 11;
        senhaCript[3] *= 21 * 7 * 5 * 9;
        senhaCript[4] *= 19 * 12 * 7 * 3;
        senhaCript[5] *= 97 * 9 * 2;

        if (matricula === "") {
            alert("Matrícula obrigatória!");
            document.getElementById("matricula").focus();
        }
        else if (matricula.length < 11) {
            alert("Matrícula incompleta!");
            document.getElementById("matricula").focus();
        }
        else if (senha === "") {
            alert("Senha obrigatória!");
            document.getElementById("senha").focus();
        }
        else if (senha.length < 6) {
            alert("Senha incompleta!");
            document.getElementById("senha").focus();
        }
        else {
            senha = senhaCript.join("");
            const dbRefMat = firebase.database().ref().child('Alunos/' + matricula + '/matricula');
            const dbRefSenha = firebase.database().ref().child('Alunos/' + matricula + '/senha');
            const isAdmin = firebase.database().ref().child('Alunos/' + matricula + '/admin');
            dbRefMat.once('value', snap => {
                var dadoMatricula = snap.val();
            if (dadoMatricula === matricula) {
                dbRefSenha.once('value', snap => {
                    var dadoSenha = snap.val();
                if (senha === dadoSenha && dadoSenha !== null) {
                    isAdmin.once('value', snap => {
                        var dadoAdmin = snap.val();
                        if (dadoAdmin === '0') {
                            location.href = "aluno_logado.html";
                        }
                        else{
                            location.href = "admin_logado.html";
                        }
                    });
                }
                else{
                    alert("Senha incorreta!");
                    document.getElementById("senha").value = '';
                    document.getElementById("senha").focus();
                }
                });
            }
            else {
                alert("Matrícula incorreta!");
                document.getElementById("matricula").value = '';
                document.getElementById("matricula").focus();
            }
        });
        }
    });
});

