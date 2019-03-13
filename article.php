<?php

if (isset($_GET['query'])) {
    $qry = urldecode(htmlentities($_GET['query']));
    $qry = explode(' OR ', $qry);

    //print_r($qry);

    $array = array();

    for ($i = 0; $i < count($qry); $i++) {
        $array[explode(':', $qry[$i])[0]] = explode(':', $qry[$i])[1];
    }

    $db = new mysqli("localhost", "root", "", "local_api");

    if ($db->connect_error) {
        echo $db->connect_error;
        exit;
    }
    $qryString = "SELECT * FROM articles WHERE title LIKE '%{$array['title']}%' OR description LIKE '%{$array['description']}%' OR bodytext LIKE '%{$array['bodytext']}%'";

    $qry = $db->query($qryString);

    $output = array();

    while($row = $qry->fetch_assoc()) {
        array_push($output, $row);
    }

    echo json_encode($output);
}