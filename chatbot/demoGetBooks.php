<?php
/**
 * Created by PhpStorm.
 * User: karlpineau
 * Date: 02/12/2016
 * Time: 10:34
 */

    header("content-type:application/json");
    if(isset($_GET['idMovie']) AND !empty($_GET['idMovie'])) {
        $movies = json_decode(@file_get_contents('http://zone47.com/tda/api/?q='.$_GET['idMovie']));

        if(empty($movies)) {
            $messages = [
                "messages" => [
                    ["text" => "Aucun resultat retourné"],
                    [
                        "text" =>  "Essaie autre chose :)",
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
        } else {
            $arrayElements = array();
            foreach ($movies as $result) {
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
            }

            $messages = [
                "messages" => [
                    ["text" =>  "Textes d'Affiches va à présent retourner la liste des ouvrages liés à ce film :"],
                    [
                        "attachment" => [
                            "type" => "template",
                            "payload" => [
                                "template_type" => "generic",
                                "elements" => $arrayElements,
                            ]
                        ]
                    ],
                    ["text" =>  "Et voilà !"],
                    ["text" =>  "Nous ne pouvons que t'inviter à aller découvrir ces ouvrages sur Gallica"],
                    [
                        "text" =>  "Et en attendant, tu peux bien sûr continuer à naviguer entre les mondes du cinéma et de la littérature sur Textes d'Affiches",
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

