$(document).ready(function () {
    $("#matricula").mask("000000000-0");

    $("#inserir").click(function () {
        matricula = $("#matricula").val();

        if (matricula === "") {
            alert("Matrícula obrigatória!");
            document.getElementById("matricula").focus();
        }
        else if (matricula.length < 11) {
            alert("Matrícula incompleta!");
            document.getElementById("matricula").focus();
        }
        else {
            const dbRefMat = firebase.database().ref().child('Alunos/' + matricula + '/matricula');
            dbRefMat.once('value', snap => {
                const dados = snap.val();
            if (dados !== null) {
                firebase.database().ref().child('Alunos/' + matricula + '/verificado').set(false);
                alert("Aluno poderá alterar sua senha no próximo login!");
                document.getElementById('matricula').value = '';
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

