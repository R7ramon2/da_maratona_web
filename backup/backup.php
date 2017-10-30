<?php
echo '
<html>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.6.0/firebase.js"></script>
    <script>
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
    </script>
';

echo "
    <script>

        function enviarJson(data){
            $.ajax({
                url: 'salvar_arquivo.php',
                type:'POST',
                data: 'json='+data,
                success: function(ret){
                    console.log(ret);
                }
            });
        }

        firebase.database().ref().on('value', snap => {
            var dados = JSON.stringify(snap.val());
            alert(dados);
            enviarJson(dados);
        });
    </script>
</head>

</html>
";
?>