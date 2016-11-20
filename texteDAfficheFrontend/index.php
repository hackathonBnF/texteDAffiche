<!DOCTYPE html>
<html lang="fr">
    <head>
        <?php include('meta.html'); ?>

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="web/css/main.css" type="text/css" />
        <link rel="stylesheet" href="web/font-awesome/css/font-awesome.min.css" type="text/css" />

        <!-- Le fav and touch icons -->
        <link rel="shortcut icon" href="../web/images/logo-big.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../web/images/logo-big.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../web/images/logo-big.png">
        <link rel="apple-touch-icon-precomposed" href="../web/images/logo-big.png">
    </head>

    <body>
        <header class="navbar navbar-inverse navbar-fixed-top" role="navigation" style="">
            <nav class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.php" id="home-logo"><h1>Textes d'Affiches</h1></a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul id="divNavBar" class="nav navbar-nav navbar-right">
                        <li><a href="#">Menu</a></li>
                    </ul>
                </div>
            </nav>
        </header>

        <section class="container-fluid" style="margin-top: 70px; margin-bottom: 50px;">
            <div class="row">
                <nav class="col-md-3">
                    <div class="btn-group">
                        <button id="btnMovieTOBook" class="btn btn-lg btn-primary active"><i class="fa fa-video-camera" aria-hidden="true"></i> <i class="fa fa-chevron-right" aria-hidden="true"></i> <i class="fa fa-book" aria-hidden="true"></i></button>
                        <button id="btnBookTOMovie" class="btn btn-lg btn-primary"><i class="fa fa-book" aria-hidden="true"></i> <i class="fa fa-chevron-right" aria-hidden="true"></i> <i class="fa fa-video-camera" aria-hidden="true"></i></button>
                    </div>
                </nav>
                <div class="col-md-6 col-md-offset-3">
                    <div id="divSearchBar" class="text-right">
                        <div class="input-group">
                            <input id="searchInput" type="search" class="form-control input-lg" placeholder="Search for ..." />
                            <span class="input-group-btn">
                                <button id="searchButton" class="btn btn-lg btn-default" type="button"><i class="fa fa-search" aria-hidden="true"></i></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <section class="col-sm-12" id="sectionContent">
                </section>
            </div>
        </section>

        <div id="templateAfficheInfoContainer" class="hidden">
            <div class="row templateAfficheInfoContainerRow">
                <div class="pull-right" style=""><button class="btn btn-sm btn-default btn-remove-templateAfficheInfoContainerRow"><i class="fa fa-times" aria-hidden="true"></i></button></div>
                <div class="col-sm-6 containerForCartelContainer">
                    <h2 class="templateAfficheInfoContainer-title">Titre film</h2>
                    <div class="list-group">
                        <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-director">
                            <dt>Réalisateur</dt>
                            <dd class="templateAfficheInfoContainer-director"></dd>
                        </dl>
                        <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-starring">
                            <dt>Distribution</dt>
                            <dd class="templateAfficheInfoContainer-starring"></dd>
                        </dl>
                        <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-date">
                            <dt>Date de réalisation</dt>
                            <dd class="templateAfficheInfoContainer-date"></dd>
                        </dl>
                        <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-language">
                            <dt>Langue</dt>
                            <dd class="templateAfficheInfoContainer-language"></dd>
                        </dl>
                        <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-country">
                            <dt>Pays</dt>
                            <dd class="templateAfficheInfoContainer-country"></dd>
                        </dl>
                        <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-genre">
                            <dt>Genre</dt>
                            <dd class="templateAfficheInfoContainer-genre"></dd>
                        </dl>
                    </div>
                </div>
                <div class="col-sm-6">

                </div>
            </div>
        </div>

        <div id="templateBooksForAffiche" class="hidden">
            <div class="bookContainerForMovie">
                <div class="row">
                    <div class="col-sm-6" style="padding-right: 2px;">
                        <img class="affiche-little thumbnail" style="margin-bottom: 0px;" src="" alt="" title="" />
                    </div>
                    <div class="col-sm-6" style="padding-left: 0px;">
                        <div class="list-group">
                            <dl class="list-group-item">
                                <dt>Titre</dt>
                                <dd class="templateBooksForAffiche-title"></dd>
                            </dl>
                            <dl class="list-group-item">
                                <dt>Auteur</dt>
                                <dd class="templateBooksForAffiche-author"></dd>
                            </dl>
                            <dl class="list-group-item">
                                <dt>Date de publication</dt>
                                <dd class="templateBooksForAffiche-publication"></dd>
                            </dl>
                            <div class="list-group-item" style="padding: 0px;">
                                <div class="btn-group btn-group-vertical"  style="width: 100%;">
                                    <a href="#" class="templateBooksForAffiche-bnf btn btn-block btn-primary" style="margin: 0px; border-radius: 0px;">Lire sur Gallica</a>
                                    <a href="#" class="templateBooksForAffiche-rebond btn btn-block btn-primary" style="margin: 0px; border-radius: 0px;">Voir les films sur cet ouvrage</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="templateIllustrationInfoContainer" class="hidden">
            <div class="row templateIllustrationInfoContainerRow">
                <div class="pull-right" style=""><button class="btn btn-sm btn-default btn-remove-templateIllustrationInfoContainerRow"><i class="fa fa-times" aria-hidden="true"></i></button></div>
                <div class="col-sm-6 containerForCartelContainer">
                    <h2 class="templateIllustrationInfoContainer-title">Titre film</h2>
                    <div class="list-group">
                        <dl class="list-group-item dl-horizontal templateIllustrationInfoContainerDl-author">
                            <dt>Auteur</dt>
                            <dd class="templateIllustrationInfoContainer-author"></dd>
                        </dl>
                        <dl class="list-group-item dl-horizontal templateIllustrationInfoContainerDl-publication">
                            <dt>Date de publication</dt>
                            <dd class="templateIllustrationInfoContainer-publication"></dd>
                        </dl>
                    </div>
                </div>
                <div class="col-sm-6">

                </div>
            </div>
        </div>

        <div id="templateMoviesForIllustration" class="hidden">
            <div class="movieContainerForBook">
                <div class="row">
                    <div class="col-sm-6" style="padding-right: 2px;">
                        <img class="illustration-little thumbnail" style="margin-bottom: 0px;" src="" alt="" title="" />
                    </div>
                    <div class="col-sm-6" style="padding-left: 0px;">
                        <div class="list-group">
                            <dl class="list-group-item">
                                <dt>Titre</dt>
                                <dd class="templateMoviesForIllustration-title"></dd>
                            </dl>
                            <dl class="list-group-item">
                                <dt>Réalisateur</dt>
                                <dd class="templateMoviesForIllustration-director"></dd>
                            </dl>
                            <dl class="list-group-item">
                                <dt>Distruction</dt>
                                <dd class="templateMoviesForIllustration-starring"></dd>
                            </dl>
                            <dl class="list-group-item">
                                <dt>Date</dt>
                                <dd class="templateMoviesForIllustration-date"></dd>
                            </dl>
                            <dl class="list-group-item">
                                <dt>Langue</dt>
                                <dd class="templateMoviesForIllustration-language"></dd>
                            </dl>
                            <dl class="list-group-item">
                                <dt>Pays</dt>
                                <dd class="templateMoviesForIllustration-country"></dd>
                            </dl>
                            <dl class="list-group-item">
                                <dt>Genre</dt>
                                <dd class="templateMoviesForIllustration-genre"></dd>
                            </dl>
                            <div class="list-group-item" style="padding: 0px;">
                                <div class="btn-group btn-group-vertical"  style="width: 100%;">
                                    <a href="#" class="templateMoviesForIllustration-imdb btn btn-block btn-primary" style="margin: 0px; border-radius: 0px;">Lire sur IMBD</a>
                                    <a href="#" class="templateMoviesForIllustration-rebond btn btn-block btn-primary" style="margin: 0px; border-radius: 0px;">Voir les ouvrages qui ont inspiré ce film</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="navbar navbar-inverse navbar-fixed-bottom">
            <div class="container-fluid">
                Footer
            </div>
        </footer>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

        <script type="text/javascript">
            function initContent() {
                $('#sectionContent').html('');
            }
        </script>
        <script src="web/js/movieTObook.js" type="text/javascript"></script>
        <script src="web/js/bookTOmovie.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(document).ready(function() {
                var bool = 'book';

                $('#btnBookTOMovie').on('click', function() {
                    $('#btnMovieTOBook').removeClass('active');
                    $(this).addClass('active');
                    bool = 'book';
                    search('*');
                });

                $('#btnMovieTOBook').on('click', function() {
                    $('#btnBookTOMovie').removeClass('active');
                    $(this).addClass('active');
                    bool = 'movie';
                    search('*');
                });

                function search(value) {
                    if(bool == 'book') {
                        $.ajax({
                            dataType: "json",
                            url: 'data2.json',
                            success: function (data) {
                                loadDataBook(data);
                            },
                            error: function (error) {
                                console.log(dump(error));
                            }
                        });
                    }
                    else if(bool == 'movie') {
                        $.ajax({
                            dataType: "json",
                            url: 'data.json',
                            success: function (data) {
                                loadDataMovie(data);
                            },
                            error: function (error) {
                                console.log(dump(error));
                            }
                        });
                    }
                }

                $('#searchButton').on('click', function() {
                    search($('#searchInput'));
                });

                search('*');
            });
        </script>
    </body>
</html>