<?php
/**
 * Created by PhpStorm.
 * User: karlpineau
 * Date: 02/12/2016
 * Time: 10:34
 */

    header("content-type:application/json");
    if(isset($_GET['idEntity']) AND !empty($_GET['idEntity']) and isset($_GET['type']) AND !empty($_GET['type'])) {
        $entities = json_decode(@file_get_contents('http://zone47.com/tda/api/?q='.$_GET['idEntity'].'&type='.$_GET['type']));

        if($_GET['type'] == "movies") {$block = "1-Search-Intro";}
        elseif($_GET['type'] == "books") {$block = "2-Search-Intro";}
        
        if(empty($entities)) {
            $messages = [
                "messages" => [
                    ["text" => "Aucun resultat retourné"],
                    [
                        "text" =>  "Essaie autre chose :)",
                        "quick_replies" => [
                            [
                                "title" => "Nouvelle recherche ?",
                                "block_names" => [$block]
                            ],
                            [
                                "title" => "Pas d'idée ?",
                                "block_names" => ["2-getTitles"]
                            ]
                        ]
                    ]
                ]
            ];
        } else {
            $label = "";
            $arrayElements = array();
            foreach ($entities as $result) {
                if($_GET['type'] == "movies") {
                    $label = $result->label;

                    foreach($result->books as $book) {
                        $description = 'Un ouvrage';
                        if(count($book->author) > 0) {
                            foreach($book->author as $keyAuthor => $author) {
                                if($keyAuthor == 0) {$description .= ' de';} else {$description .= ',';}
                                $description .= ' '.$author->label;
                            }
                        }
                        if($book->publication != null) {
                            $description .= ' publié en '.$book->publication;
                        }
                        if(count($book->genre) > 0) {
                            foreach($book->genre as $keyGenre => $genre) {
                                if($keyGenre == 0) {$description .= ' |';} else {$description .= ',';}
                                $description .= ' '.$genre->label;
                            }
                        }

                        $arrayElements[] =
                            [
                                "title" => $book->title,
                                "image_url" => $book->thumbnail,
                                "subtitle" => $description,
                                "buttons" => [
                                    [
                                        "type" => "web_url",
                                        "url" => str_replace(".highres", "", $book->thumbnail),
                                        "title" => "Lire sur Gallica"
                                    ]
                                ]
                            ];
                    }
                } elseif($_GET['type'] == "books") {
                    $label = $result->title;
                    foreach($result->movies as $movie) {

                        $description = 'Un film';
                        if(count($movie->director) > 0) {
                            foreach($movie->director as $keyDirector => $director) {
                                if($keyDirector == 0) {$description .= ' de';} else {$description .= ',';}
                                $description .= ' '.$director->label;
                            }
                        }
                        if(count($movie->genre) > 0) {
                            foreach($movie->genre as $keyGenre => $genre) {
                                if($keyGenre == 0) {$description .= ' -';} else {$description .= ',';}
                                $description .= ' '.$genre->label;
                            }
                        }

                        $arrayElements[] =
                            [
                                "title" => $movie->label,
                                "image_url" => $movie->poster,
                                "subtitle" => $description,
                                "buttons" => [
                                    [
                                        "type" => "web_url",
                                        "url" => "http://www.imdb.com/title/".$movie->imdb,
                                        "title" => "Voir sur IMDB"
                                    ]
                                ]
                            ];
                    }
                }
            }

            $tooManyItems = false;
            if(count($arrayElements) > 5) {
                $tooManyItems = true;
                shuffle($arrayElements);
                $arrayElements = [$arrayElements[0],$arrayElements[1],$arrayElements[2],$arrayElements[3],$arrayElements[4]];
            }

            if($tooManyItems == false) {
                if ($_GET['type'] == "movies") {
                    $announcementText = "Voici les ouvrages associés au film ".$label." :";
                } elseif ($_GET['type'] == "books") {
                    $announcementText = "Voici les films associés à l'ouvrage ".$label." :";
                }
            } elseif($tooManyItems == true) {
                if ($_GET['type'] == "movies") {
                    $announcementText = "Le film ".$label." est lié à de nombreux ouvrages, en voici 5 :";
                } elseif ($_GET['type'] == "books") {
                    $announcementText = "L'ouvrage ".$label." est lié à de nombreux films, en voici 5 :";
                }
            }


            $messages = [
                "messages" => [
                    [ "text" =>  $announcementText],
                    [
                        "attachment" => [
                            "type" => "template",
                            "payload" => [
                                "template_type" => "generic",
                                "elements" => $arrayElements,
                            ]
                        ]
                    ],
                    [
                        "text" =>  "Lancer une nouvelle recherche ?",
                        "quick_replies" => [
                            [
                                "title" => "Nouvelle recherche ?",
                                "block_names" => [$block]
                            ],
                            [
                                "title" => "Pas d'idée ?",
                                "block_names" => ["2-getTitles"]
                            ]
                        ]
                    ]
                ]
            ];
            //$messages = $results;
        }
    } else {
        $messages = [
            "messages" => [
                ["text" => "Oups ... Il semble qu'il y ait un problème ..."],
                [
                    "text" => "Essaie plus tard :)",
                    "quick_replies" => [
                        [
                            "title" => "Nouvelle recherche ?",
                            "block_names" => [$block]
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

