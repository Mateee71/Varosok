<?php

require './MySqlDB.php';

$mySql = new MySqlDB();

$adat = $_GET['nev'];

$varosok = array();
$result = $mySql->lekerdez("varos", "nev like '%".$adat."%'");


if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {

        $varosok[] = $row;
    }
    echo json_encode($varosok);
} else {
    echo "0 results";
}
