<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess</title>
    <link rel='stylesheet' href='styles.css'>
</head>
<body>
<?php
    require_once "connection.php";
    $pdo = new connection();
    $conn = $pdo->connect();
    if($_SERVER["REQUEST_METHOD"] != "POST"){
        $partidas = $pdo->totalPartidas($conn);
        ?>
            <form id='formulario' method='POST' action='visor.php'>
                <select id='select' name='partida'>
        <?php foreach($partidas as $partida){
            echo "<option value=\"". $partida["id"] ."\">". $partida["id"] . " " . $partida["Duracion"] ."</option>";
        }?>
            </select>
                  <input type='submit' value='Enviar' id='ver'>
            </form>";
    <?php } ?>

    <div id='tablero' class='tablero'></div>
    <script src='crearTablero.js'></script>
    <script src='scriptsvisor.js'></script>
</body>
</html>