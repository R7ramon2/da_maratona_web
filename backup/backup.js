function include(file_path) {

    var j = document.createElement("script");
    /* criando um elemento script: </script><script></script> */

    j.type = "text/javascript";
    /* informando o type como text/javacript: <script type="text/javascript"></script>*/

    j.src = file_path;
    /* Inserindo um src com o valor do parâmetro file_path: <script type="javascript" src="+file_path+"></script>*/

    document.body.appendChild(j);
    /* Inserindo o seu elemento(no caso o j) como filho(child) do  BODY: <html><body><script type="javascript" src="+file_path+"></script></body></html> */

}
include("https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
include("https://www.gstatic.com/firebasejs/4.6.0/firebase.js");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFRg6eJ7rzzJUiucA0iKb0fztub3y7KGs",
    authDomain: "da-maratona.firebaseapp.com",
    databaseURL: "https://da-maratona.firebaseio.com",
    projectId: "da-maratona",
    storageBucket: "da-maratona.appspot.com",
    messagingSenderId: "540810449848"
};
firebase.initializeApp(config);


function enviarJson(data) {
    $.ajax({
        url: 'salvar_arquivo.php',
        type: 'POST',
        data: 'json=' + data,
        success: function (ret) {
            console.log(ret);
        }
    });
}

firebase.database().ref().once('value', snap => {
    var dados = JSON.stringify(snap.val());
    alert(dados);
    enviarJson(dados);
});