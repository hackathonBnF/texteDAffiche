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
                        <a class="btn btn-lg btn-primary active"><i class="fa fa-video-camera" aria-hidden="true"></i> <i class="fa fa-chevron-right" aria-hidden="true"></i> <i class="fa fa-book" aria-hidden="true"></i></a>
                        <a class="btn btn-lg btn-primary"><i class="fa fa-book" aria-hidden="true"></i> <i class="fa fa-chevron-right" aria-hidden="true"></i> <i class="fa fa-video-camera" aria-hidden="true"></i></a>
                    </div>
                </nav>
                <div class="col-md-6 col-md-offset-3">
                    <div id="divSearchBar" class="text-right">
                        <input type="search" class="form-control input-lg" placeholder="Text input" />
                    </div>
                </div>
            </div>

            <div class="row">
                <section class="col-sm-12">
                    <div class="col-sm-3">
                        <div class="afficheContainer">
                            <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="afficheContainer">
                            <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="afficheContainer">
                            <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="afficheContainer">
                            <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="afficheContainer">
                            <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="afficheContainer">
                            <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="afficheContainer">
                            <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="afficheContainer">
                            <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="afficheContainer">
                            <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                        </div>
                    </div>
                </section>
            </div>
        </section>

        <div id="templaceAfficheInfoContainer" class="hidden">
            <div class="col-sm-6">
                <h2>Titre film</h2>
                <ul>
                    <li>Réalisateur</li>
                    <li>Distribution</li>
                    <li>Date de réalisation</li>
                    <li>Langue</li>
                    <li>Pays</li>
                    <li>Genre</li>
                </ul>
            </div>
            <div class="col-sm-6" id="placeForTemplateBooksForAffiche">

            </div>
        </div>

        <div id="templateBooksForAffiche" class="hidden">
            <div class="afficheContainer">
                <img class="affiche thumbnail" src="web/images/afficheTest.png" alt="" title="" />
                <div>
                    <div class="col-sm-6">Auteur</div>
                    <div class="col-sm-6">Date</div>
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
    </body>
</html>