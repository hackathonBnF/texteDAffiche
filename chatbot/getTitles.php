<?php
/**
 * Created by PhpStorm.
 * User: karlpineau
 * Date: 02/12/2016
 * Time: 10:34
 */

    header("content-type:application/json");

    $movies = json_decode(@file_get_contents('http://zone47.com/tda/api/'));

    $labels = array();
    for($count = 0; $count < 10; $count++) {
        $labels[] = ["text" =>  $movies[$count]->label];
    }

    $messages = [
        "messages" => $labels
    ];

    echo json_encode($messages);

