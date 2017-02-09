<?php
/**
 * Created by PhpStorm.
 * User: karlpineau
 * Date: 02/12/2016
 * Time: 10:34
 */

    header("content-type:application/json");
    if(isset($_GET['search']) AND !empty($_GET['search'])) {
        $movies = json_decode(@file_get_contents('http://zone47.com/tda/api/?s='.urlencode($_GET['search'])));
        $search = $_GET['search'];

        $messages = [
            "messages" => [
                ["text" => "Aucun resultat retourné"],
                [
                    "text" => "Essaie autre chose :)",
                    "quick_replies" => [
                        [
                            "title" => "Nouvelle recherche ?",
                            "block_names" => ["1-Search-Intro"]
                        ],
                        [
                            "title" => "Pas d'idée ?",
                            "block_names" => ["2-getTitles"]
                        ]
                    ]
                ]
            ]
        ];

        if(count($movies) > 0) {
            $totalMovies = count($movies);
            $extractMovies = false;
            $arrayElements = array();
            if(count($movies) > 5) {
                $extractMovies = true;
                shuffle($movies);
                $movies = [$movies[0], $movies[1], $movies[2], $movies[3], $movies[4]];
            }

            foreach ($movies as $result) {
                $description = 'Un film';
                if(count($result->director) > 0) {
                    foreach($result->director as $keyDirector => $director) {
                        if($keyDirector == 0) {$description .= ' de';} else {$description .= ',';}
                        $description .= ' '.$director->label;
                    }
                }
                if(count($result->genre) > 0) {
                    foreach($result->genre as $keyGenre => $genre) {
                        if($keyGenre == 0) {$description .= ' -';} else {$description .= ',';}
                        $description .= ' '.$genre->label;
                    }
                }

                $arrayElements[] =
                    [
                        "title" => $result->label,
                        "image_url" => $result->poster,
                        "subtitle" => $description,
                        "buttons" => [
                            [
                                "type" => "web_url",
                                "url" => "http://www.imdb.com/title/".$result->imdb,
                                "title" => "Voir sur IMBD"
                            ],
                            [
                                "url" => "http://karlpine.cluster014.ovh.net/textesdaffiches/chatbot/demoGetBooks.php?idMovie=".$result->qwd,
                                "type" => "json_plugin_url",
                                "title" => "Ouvrages associés"
                            ]
                        ]
                    ];
            }

            if(count($arrayElements) == 0) {
                $arrayElements[] =
                    [
                        "title" => 'Oups, aucun résultat pour cette recherche :(',
                        "image_url" => "",
                        "subtitle" => ""
                    ];
            }
            $messages = [
                "messages" => [
                    [
                        "attachment" => [
                            "type" => "template",
                            "payload" => [
                                "template_type" => "generic",
                                "elements" => $arrayElements,
                            ]
                        ]
                    ]
                ]
            ];
            if($extractMovies == true) {
                array_unshift($messages['messages'], ["text" => "En voici 5 parmi ".$totalMovies.":"]);
                array_unshift($messages['messages'], ["text" => "Ta recherche semble retourner beaucoup de résultats !"]);
            }
            //$messages = $_GET['search'];
        }
    } else {
        $messages = [
            "messages" => [
                ["text" => "Oups ... Il semble qu'il y ait une erreur ..."],
                [
                    "text" => "Essayez plus tard :)",
                    "quick_replies" => [
                        [
                            "title" => "Nouvelle recherche ?",
                            "block_names" => ["1-Search-Intro"]
                        ],
                        [
                            "title" => "Pas d'idée ?",
                            "block_names" => ["2-getTitles"]
                        ]
                    ]
                ]
            ]
        ];
    }

    echo json_encode($messages);

