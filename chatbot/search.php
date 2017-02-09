<?php
/**
 * Created by PhpStorm.
 * User: karlpineau
 * Date: 02/12/2016
 * Time: 10:34
 */

    header("content-type:application/json");

    if(isset($_GET['search']) AND !empty($_GET['search']) and isset($_GET['type']) AND !empty($_GET['type'])) {
        $entities = json_decode(@file_get_contents('http://zone47.com/tda/api/?s='.urlencode($_GET['search']).'&type='.urlencode($_GET['type'])));
        $search = $_GET['search'];

        if($_GET['type'] == "movies") {$block = "1-Search-Intro";}
        elseif($_GET['type'] == "books") {$block = "1-Search-Intro";}

        $messages = [
            "messages" => [
                ["text" => "Aucun resultat retourné"],
                [
                    "text" => "Essaie autre chose :)",
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

        if(count($entities) > 0) {
            $totalEntities = count($entities);
            $extractEntities = false;
            $arrayElements = array();
            if(count($entities) > 5) {
                $extractEntities = true;
                shuffle($entities);
                $entities = [$entities[0], $entities[1], $entities[2], $entities[3], $entities[4]];
            }

            foreach ($entities as $result) {
                $label = ''; $thumbnail = ''; $description = ''; $buttonMore = ''; $buttonEntitiesLinked = '';
                if($_GET['type'] == "movies") {
                    $label = $result->label;
                    $thumbnail = $result->poster;
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

                    $buttonMore = [
                        "type" => "web_url",
                        "url" => "http://www.imdb.com/title/".$result->imdb,
                        "title" => "Voir sur IMBD"
                    ];

                    $buttonEntitiesLinked = [
                        "url" => "http://karlpine.cluster014.ovh.net/textesdaffiches/chatbot/getEntities.php?idEntity=".$result->qwd."&type=".$_GET['type'],
                        "type" => "json_plugin_url",
                        "title" => "Ouvrages associés"
                    ];

                } elseif($_GET['type'] == "books") {
                    $label = $result->title;
                    $thumbnail = $result->thumbnail;
                    $description = 'Un ouvrage';
                    if(count($result->author) > 0) {
                        foreach($result->author as $keyAuthor => $author) {
                            if($keyAuthor == 0) {$description .= ' de';} else {$description .= ',';}
                            $description .= ' '.$author->label;
                        }
                    }
                    if($result->publication != null) {
                        $description .= ' publié en '.$result->publication;
                    }
                    if(count($result->genre) > 0) {
                        foreach($result->genre as $keyGenre => $genre) {
                            if($keyGenre == 0) {$description .= ' |';} else {$description .= ',';}
                            $description .= ' '.$genre->label;
                        }
                    }

                    $buttonMore = [
                        "type" => "web_url",
                        "url" => str_replace(".highres", "", $result->thumbnail),
                        "title" => "Lire sur Gallica"
                    ];

                    $buttonEntitiesLinked = [
                        "url" => "http://karlpine.cluster014.ovh.net/textesdaffiches/chatbot/getEntities.php?idEntity=".$result->qwd."&type=".$_GET['type'],
                        "type" => "json_plugin_url",
                        "title" => "Films associés"
                    ];

                }

                $arrayElements[] =
                    [
                        "title" => $label,
                        "image_url" => $thumbnail,
                        "subtitle" => $description,
                        "buttons" => [
                            $buttonMore,
                            $buttonEntitiesLinked
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
                    ],
                    [
                        "text" => "Lancer une nouvelle recherche ?",
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
            if($extractEntities == true) {
                array_unshift($messages['messages'], ["text" => "En voici 5 parmi ".$totalEntities.":"]);
                array_unshift($messages['messages'], ["text" => "Ta recherche semble retourner beaucoup de résultats !"]);
            }
            //$messages = $_GET['search'];
        }
    } else {
        $messages = [
            "messages" => [
                ["text" => "Oups ... Il semble qu'il y ait une erreur ..."],
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

