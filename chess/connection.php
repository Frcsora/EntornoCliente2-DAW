<?php
class connection
{
    private $tipo;
    private $port;
    private $host;
    private $database;
    private $username;
    private $password;
    private static $ultimaid;
    function __construct($tipo = "mysql", $host = "localhost", $port = 3307, $database = "chess", $username = "root", $password = ""){
        $this->tipo = $tipo;
        $this->host = $host;
        $this->port = $port;
        $this->database = $database;
        $this->username = $username;
        $this->password = $password;
    }
    function connect(){
        try{
            $pdo = new PDO("$this->tipo:host=$this->host;port=$this->port;dbname=$this->database", $this->username, $this->password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        }catch(PDOException $e){
            echo json_encode([ "error" => $e->getMessage()]);
            exit;
        }
    }
    function insertPartida($pdo, $inicio, $final, $duracion, $ganador){
        try{
            $stmt = $pdo->prepare("INSERT INTO partidas(FechaInicio, FechaFin, Duracion, Ganador)
                                VALUES (:inicio, :final,:duracion, :ganador)");
            $stmt->bindParam(":inicio", $inicio);
            $stmt->bindParam(":final", $final);
            $stmt->bindParam(":duracion", $duracion);
            $stmt->bindParam(":ganador", $ganador);
            $stmt->execute();

            self::$ultimaid = $pdo->lastInsertId();
        }catch (Exception $e){
            echo json_encode($e->getMessage());
            exit;
        }
    }
    function insertTurno($pdo, $idpartida, $turno, $color, $movimiento){
        try{
            $stmt = $pdo->prepare("INSERT INTO turnos(idpartida, turno, color, movimiento)
                                    VALUES (:id_partida, :turno, :color, :movimiento)");
            $stmt->bindParam(":id_partida", $idpartida);
            $stmt->bindParam(":turno", $turno);
            $stmt->bindParam(":color", $color);
            $stmt->bindParam(":movimiento", $movimiento);
            $stmt->execute();

        }catch (Exception $e){
            echo json_encode([ "error" => "insertarturno"]);
            exit;
        }
    }
    function seleccionarPartida($pdo, $idpartida){
        try{
            $stmt = $pdo->prepare("SELECT movimiento FROM turnos WHERE idpartida = :idpartida");
            $stmt->bindParam(":idpartida", $idpartida);
            $stmt->execute();
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }catch (Exception $e){
            echo json_encode([ "error" => $e->getMessage()]);
            exit;
        }
    }
    function totalPartidas($pdo){
        $stmt = $pdo->prepare("SELECT * FROM partidas");
        $stmt -> execute();
        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }
    function getUltimaID(){
        return self::$ultimaid;
    }
}
