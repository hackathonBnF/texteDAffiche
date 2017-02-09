<!DOCTYPE html>
<html lang="fr">
    <head>
        <?php include("templates/head.php"); ?>
    </head>

    <body>
        <?php include("templates/header.php"); ?>

        <section class="container-fluid" style="margin-top: 70px; margin-bottom: 50px;">
            <div class="row">
                <section class="col-sm-12" id="sectionContent">
                </section>
            </div>
        </section>

        <?php include("templates/templateAfficheInfoContainer.php"); ?>
        <?php include("templates/templateBooksForAffiche.php"); ?>
        <?php include("templates/templateIllustrationInfoContainer.php"); ?>
        <?php include("templates/templateMoviesForIllustration.php"); ?>

        <footer class="navbar-inverse navbar-fixed-bottom">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="text-center">
                            <a href="#" class="text-muted" data-toggle="modal" data-target="#footerModal">À propos</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <?php include("templates/footer.php"); ?>

        <script src="web/jquery-ui-2/jquery.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

        <script src="web/jquery-ui-2/jquery-ui.min.js"></script>
        <script src="web/jquery-ui-2/jquery.auto-complete.js"></script>

        <script src="web/js/reset.js" type="text/javascript"></script>
        <script src="web/js/stringify.js" type="text/javascript"></script>
        <script src="web/js/autocomplete.js" type="text/javascript"></script>
        <script src="web/js/searchFunctions.js" type="text/javascript"></script>
        <script src="web/js/main.js" type="text/javascript"></script>
    </body>
</html>
