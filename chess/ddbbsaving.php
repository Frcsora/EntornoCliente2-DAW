<?php
require_once('connection.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    header("Content-type: application/json");

    $datos = json_decode(file_get_contents("php://input"));
    $fechaInicio = $datos->fecha;
    $fechaFin = $datos->fechaFinal;
    $ganador = $datos->ganador;
    $turnos = $datos->listaTurnos;
    $fecha1 = strtotime($fechaInicio);
    $fecha2 = strtotime($fechaFin);
    $nuevaFechaInicio = DateTime::createFromFormat('d/m/Y, H:i:s', $fechaInicio);

    $nuevaFechaFin = DateTime::createFromFormat('d/m/Y, H:i:s', $fechaFin);
    $fechaInicioFormateada = $nuevaFechaInicio->format('Y-m-d H:i:s');
    $fechaFinFormateada = $nuevaFechaFin->format('Y-m-d H:i:s');
    $diferencia = $fecha2 - $fecha1;
    $diferenciaHoras = intval($diferencia / (3600 * 1000));
    $diferencia %= 3600;
    $diferenciaMinutos = intval($diferencia / (60* 1000));
    $diferenciaSegundos = $diferencia % 60;
    $diferencia = sprintf('%02d:%02d:%02d', $diferenciaHoras, $diferenciaMinutos, $diferenciaSegundos);

    $pdo = new connection();
    $pdo->insertPartida($pdo->connect(), $fechaInicioFormateada, $fechaFinFormateada, $diferencia, $ganador);
    $ultimaid = $pdo->getUltimaID();

    foreach ($turnos as $turno) {
        $pdo->insertTurno($pdo->connect(), $ultimaid, $turno->numero, $turno->color, $turno->movimiento);
    }
}