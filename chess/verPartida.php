<?php
require_once "connection.php";
header("Content-type: application/json");

$dato = json_decode(file_get_contents("php://input"));
$id = $dato->id;
$pdo = new connection();
$conn = $pdo->connect();
$movimientos = $pdo->seleccionarPartida($conn, $id);
echo json_encode($movimientos);