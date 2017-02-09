/**
 * Created by karlpineau on 07/12/2016.
 */
function search(value, type) {
    initContent();
    $('#sectionContent').html('<h2 class="text-center" style="margin-top: 10%;"><i class="fa fa-spin fa-5x fa-circle-o-notch" aria-hidden="true"></i></h2>');

    $.ajax({
        url: 'http://zone47.com/tda/api/',
        data: {s: value, type: type},
        dataType: 'json',
        success: function(data) {
            console.log(data);
            loadData(value, data, 'search', null);
        },
        error: function(xhr, status, error) {
            console.log(status + '; ' + error);
        }
    });
}

function searchByQwt(qwt, dataType, type) {
    initContent();
    $('#sectionContent').html('<h2 class="text-center" style="margin-top: 10%;"><i class="fa fa-spin fa-5x fa-circle-o-notch" aria-hidden="true"></i></h2>');

    if(dataType == 'books' || dataType == 'movies') {
        var dataFormat = {q: qwt, type: dataType};
    } else {
        var dataFormat = {};
        dataFormat[dataType] = qwt;
        dataFormat.type = type;
    }

    $.ajax({
        url: 'http://zone47.com/tda/api/',
        data: dataFormat,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            loadData(qwt, data, 'get', dataType);
        },
        error: function(xhr, status, error) {
            console.log(status + '; ' + error);
        }
    });
}

function loadData(value, data, context, dataType) {
    if(data.length > 0) {
        initContent();

        if(value !== '' && context == 'search') {
            $('#sectionContent').append('' +
                '<div class="alert alert-info">' +
                '   <p>Votre recherche "'+value+'" a retourné '+data.length+' résultat(s)</p>' +
                '</div>' +
                '<div id="dataContent"></div>');
        } else if(context == 'get' && (dataType == 'books' || dataType == 'movies')) {
            loadDataForEntity(data[0]);
        } else if(context == 'get' && (dataType != 'books' && dataType != 'movies')) {
            /*$.ajax({
                url: 'https://www.wikidata.org/w/api.php',
                data: {'action': 'wbgetentities', 'ids': value, 'props': 'labels'},
                dataType: 'jsonp',
                success: function(data) {
                    context = 'search';

                    if(typeof data['entities'][0]['labels']['fr']['value'] !== 'undefined') {
                        value = data['entities'][0]['labels']['fr']['value'];
                    } else if(typeof data['entities'][0]['labels']['en']['value'] !== 'undefined') {
                        value = data['entities'][0]['labels']['en']['value'];
                    }

                    $('#sectionContent').append('' +
                        '<div class="alert alert-info">' +
                        '   <p>Votre recherche "'+value+'" a retourné '+data.length+' résultat(s)</p>' +
                        '</div>' +
                        '<div id="dataContent"></div>');

                    if(typeof data[0].books != 'undefined') {
                        loadDataMovie(value, data);
                    } else if(typeof data[0].movies != 'undefined') {
                        loadDataBook(value, data);
                    }
                },
                error: function(xhr, status, error) {
                    console.log(status + '; ' + error);
                }
            });*/
            context = 'search';
            $('#sectionContent').append('' +
                '<div class="alert alert-info">' +
                '   <p>Votre recherche "'+value+'" a retourné '+data.length+' résultat(s)</p>' +
                '</div>' +
                '<div id="dataContent"></div>');

        } else {
            $('#sectionContent').append('<div id="dataContent"></div>');
        }

        if(context == 'search') {
            if(typeof data[0].books != 'undefined') {
                loadDataMovie(value, data);
            } else if(typeof data[0].movies != 'undefined') {
                loadDataBook(value, data);
            }
        }
    } else {
        initContent();
        $('#sectionContent').html('' +
            '<div class="alert alert-warning">' +
            '   <p>Oups ... Votre recherche "'+value+'" ne retourne pas de résultat. Essayez autre chose.</p>' +
            '</div>');
    }
}

function loadDataForEntity(entity) {
    var type,
        entities,
        description;

    if(typeof entity.books !== 'undefined') {
        type = 'movie';
        entities = entity.books;
    } else if(typeof entity.movies !== 'undefined') {
        type = 'book';
        entities = entity.movies;
    }

    if(type == 'movie') {
        description = ''+
            '<div class="list-group">'+
            '   <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-director">'+
            '       <dt>Réalisateur</dt>'+
            '       <dd class="templateAfficheInfoContainer-director"></dd>'+
            '   </dl>'+
            '   <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-starring">'+
            '       <dt>Distribution</dt>'+
            '       <dd class="templateAfficheInfoContainer-starring"></dd>'+
            '   </dl>'+
            '   <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-date">'+
            '       <dt>Date de réalisation</dt> ' +
            '       <dd class="templateAfficheInfoContainer-date"></dd>'+
            '   </dl>'+
            '   <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-language">'+
            '       <dt>Langue</dt>'+
            '       <dd class="templateAfficheInfoContainer-language"></dd>'+
            '   </dl>'+
            '   <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-country">'+
            '       <dt>Pays</dt>'+
            '       <dd class="templateAfficheInfoContainer-country"></dd>'+
            '   </dl>'+
            '   <dl class="list-group-item dl-horizontal templateAfficheInfoContainerDl-genre">'+
            '       <dt>Genre</dt>'+
            '       <dd class="templateAfficheInfoContainer-genre"></dd>'+
            '   </dl>'+
            '</div>';
    } else if(type == 'book') {
        description = ''+
            '<div class="list-group">'+
            '    <dl class="list-group-item dl-horizontal templateIllustrationInfoContainerDl-author">'+
            '       <dt>Auteur</dt>'+
            '       <dd class="templateIllustrationInfoContainer-author"></dd>'+
            '    </dl>'+
            '   <dl class="list-group-item dl-horizontal templateIllustrationInfoContainerDl-publication">'+
            '       <dt>Date de publication</dt>'+
            '       <dd class="templateIllustrationInfoContainer-publication"></dd>'+
            '   </dl>'+
            '   <dl class="list-group-item dl-horizontal templateIllustrationInfoContainerDl-genre">'+
            '       <dt>Genre</dt>'+
            '       <dd class="templateIllustrationInfoContainer-genre"></dd>'+
            '   </dl>'+
            '   <div class="list-group-item" style="padding: 0px;">'+
            '       <div class="btn-group btn-group-vertical"  style="width: 100%;">'+
            '           <a href="#" class="templateIllustrationInfoContainer-bnf btn btn-block btn-primary" style="margin: 0px; border-radius: 0px;" target="_blank">Lire sur Gallica</a>'+
            '       </div>'+
            '   </div>'+
            '</div>';
    }

    if (typeof entity.WPintro !== 'undefined' && entity.WPintro != "") {
        description += '<div>'+entity.WPintro+' <a href="https://fr.wikipedia.org/wiki/'+entity.WParticle+'" target="_blank">Lire la suite</a></div>';
    }

    $('#sectionContent').append('' +
        '<div class="jumbotron">' +
        '   <div class="row">' +
        '       <div class="col-sm-9">' +
        '           <h2>'+entity.title+'</h2>' +
        '       ' + description +
        '       </div>' +
        '       <div class="col-sm-3">' +
        '           <div class="thumbnail">' +
        '               <img class="affiche" src="'+entity.thumbnail+'"/>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</div>' +
        '<div id="dataContent"></div>');

    if(type == 'movie') {
        $('.templateAfficheInfoContainer-director').html(stringify(entity.director, true, 'director', 'movies'));
        $('.templateAfficheInfoContainer-starring').html(stringify(entity.starring, true, 'starring', 'movies'));
        $('.templateAfficheInfoContainer-date').html(entity.date);
        $('.templateAfficheInfoContainer-language').html(stringify(entity.language, true, 'language', 'movies'));
        $('.templateAfficheInfoContainer-country').html(stringify(entity.country, true, 'country', 'movies'));
        $('.templateAfficheInfoContainer-genre').html(stringify(entity.genre, true, 'genre', 'movies'));
        $('.rebondLink').on('click', function() {
            console.log($(this).attr('id'));
            searchByQwt($(this).attr('id'), $(this).attr('tdaDataType'), $(this).attr('tdaType'));
        });
    } else if(type == 'book') {
        $('.templateIllustrationInfoContainer-author').html(stringify(entity.author, true, 'author', 'books'));
        $('.templateIllustrationInfoContainer-publication').html(entity.publication);
        $('.templateIllustrationInfoContainer-genre').html(stringify(entity.genre, true, 'genre', 'books'));
        $('.templateIllustrationInfoContainer-bnf').attr('href', entity.thumbnail.replace('.highres', ''));
        $('.rebondLink').on('click', function() {
            console.log($(this).attr('id'));
            searchByQwt($(this).attr('id'), $(this).attr('tdaDataType'), $(this).attr('tdaType'));
        });
    }


    for(var entityKey in entities) {
        var thumbnail;
        if(type == 'book') {thumbnail = entities[entityKey].poster;}
        else if(type == 'movie') {thumbnail = entities[entityKey].thumbnail;}

        if($('#dataContent').children().length == 0 || $('#dataContent').children().last().children().length%4 == 0) {
            $('#dataContent').append('<div class="row"></div>');
        }

        $('#dataContent').children().last().append('' +
            '<div class="col-sm-3">'+
            '   <div class="itemContainer" id="'+entities[entityKey].id+'" key="'+entityKey+'" load="false">'+
            '       <div class="text-center">' +
            '           <img class="affiche" src="'+thumbnail+'" alt="" title="" />'+
            '       </div>'+
            '   </div>'+
            '</div>'
        );

        $('#'+entities[entityKey].id).on('click', function() {
            if($(this).attr('load') == 'false') {
                if(type == 'book') {loadCardMovie(entities, $(this));}
                else if(type == 'movie') {loadCardBook(entities, $(this));}
                $(this).attr('load', 'true');
            } else if($(this).attr('load') == 'true') {
                if(type == 'book') {removeTemplateInfoMovie($(this).attr('id'));}
                else if(type == 'movie') {removeTemplateInfoBook($(this).attr('id'));}
                $(this).attr('load', 'false');
            }
        });
    }
}

function loadDataMovie(value, data) {
    for(var itemKey in data) {
        if($('#dataContent').children().length == 0 || $('#dataContent').children().last().children().length%4 == 0) {
            $('#dataContent').append('<div class="row"></div>');
        }

        var dataElement = data[itemKey];
        var imageName = dataElement.poster || "web/images/noImage.jpg";
        $('#dataContent').children().last().append('' +
            '<div class="col-sm-3">'+
            '   <div class="afficheContainer" id="'+dataElement.id+'" key="'+itemKey+'" load="false">' +
            '       <div class="text-center">' +
            '       <img class="affiche" src="'+ imageName +'" alt="" title="" />'+
            '       </div>'+
            '   </div>'+
            '</div>'
        );

        $('#'+dataElement.id).on('click', function() {
            if($(this).attr('load') == 'false') {
                loadCardMovie(data, $(this));
                $(this).attr('load', 'true');
            } else if($(this).attr('load') == 'true') {
                resetCard();
                $(this).attr('load', 'false');
            }
        });
    }
}

function loadDataBook(value, data) {
    for(var itemKey in data) {
        if($('#dataContent').children().length == 0 || $('#dataContent').children().last().children().length%4 == 0) {
            $('#dataContent').append('<div class="row"></div>');
        }

        $('#dataContent').children().last().append('' +
            '<div class="col-sm-3">'+
            '   <div class="illustrationContainer" id="'+data[itemKey].id+'" key="'+itemKey+'" load="false">'+
            '       <div class="text-center">' +
            '           <img class="affiche" src="'+data[itemKey].thumbnail+'" alt="" title="" />'+
            '       </div>'+
            '   </div>'+
            '</div>'
        );

        $('#'+data[itemKey].id).on('click', function() {
            if($(this).attr('load') == 'false') {
                loadCardBook(data, $(this));
                $(this).attr('load', 'true');
            } else if($(this).attr('load') == 'true') {
                resetCard();
                $(this).attr('load', 'false');
            }
        });
    }
}

function loadCardBook(data, element) {
    resetCard();
    var fItemKey = element.attr('key');
    var illustrationContainer = $('#'+data[fItemKey].id);

    illustrationContainer.parent().parent().after($('#templateIllustrationInfoContainer').html());
    illustrationContainer.parent().parent().next()
        .attr('id', 'templateIllustrationInfoContainer-'+illustrationContainer.attr('id'))
        .attr('bookId', illustrationContainer.attr('id'));
    $('#templateIllustrationInfoContainer-'+illustrationContainer.attr('id')).children().first()
        .attr('id', 'templateIllustrationInfoContainerDelete-'+illustrationContainer.attr('id'));
    $('#templateIllustrationInfoContainerDelete-'+illustrationContainer.attr('id')).on('click', function() {
        removeTemplateInfoBook(illustrationContainer.attr('id'));
        $('#'+illustrationContainer.attr('id')).attr('load', 'false');
    });

    $('#templateIllustrationInfoContainer-'+illustrationContainer.attr('id')).children().last().attr('id', 'placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id'));
    $('.templateIllustrationInfoContainer-title').html(data[fItemKey].title);
    $('.templateIllustrationInfoContainer-author').html(stringify(data[fItemKey].author, true, 'author', 'books'));
    $('.templateIllustrationInfoContainer-publication').html(data[fItemKey].publication);
    $('.templateIllustrationInfoContainer-bnf').attr('href', data[fItemKey].thumbnail.replace('.highres', ''));

    if(typeof data[fItemKey].movies !== 'undefined') {
        for(var keyMovie in data[fItemKey].movies) {
            if(keyMovie > 0) {$('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).append('<hr />');}
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).append($('#templateMoviesForIllustration').html());

            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).children().last().children().first().children().first().children().first().children().first()
                .attr('src', data[fItemKey].movies[keyMovie].poster);
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).children().last()
                .attr('id', 'placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie);

            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-title').html(data[fItemKey].movies[keyMovie].label);
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-director').html(stringify(data[fItemKey].movies[keyMovie].director, true, 'director', 'movies'));
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-starring').html(stringify(data[fItemKey].movies[keyMovie].starring, true, 'starring', 'movies'));
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-imdb').attr('href', data[fItemKey].movies[keyMovie].imdb);
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-date').html(data[fItemKey].movies[keyMovie].date);
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-genre').html(stringify(data[fItemKey].movies[keyMovie].genre, true, 'genre', 'movies'));
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-language').html(stringify(data[fItemKey].movies[keyMovie].language, true, 'language', 'movies'));
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-country').html(stringify(data[fItemKey].movies[keyMovie].country, true, 'country', 'movies'));
            $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-rebond').attr('id', data[fItemKey].movies[keyMovie].qwd).on('click', function() {
                var qwt = $(this).attr('id');
                searchByQwt(qwt, 'movies');
            });
        }
    } else {
        $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).append('<div>'+data[fItemKey].WPintro+' <a href="https://fr.wikipedia.org/wiki/'+data[fItemKey].WParticle+'" target="_blank">Lire la suite</a></div>');
    }

    $('.rebondLink').on('click', function() {
        console.log($(this).attr('id'));
        searchByQwt($(this).attr('id'), $(this).attr('tdaDataType'), $(this).attr('tdaType'));
    });
}

function loadCardMovie(data, element) {
    resetCard();
    var fItemKey = element.attr('key');
    var afficheContainer = element;

    afficheContainer.parent().parent().after($('#templateAfficheInfoContainer').html());
    afficheContainer.parent().parent().next()
        .attr('id', 'templateAfficheInfoContainer-'+afficheContainer.attr('id'))
        .attr('movieId', afficheContainer.attr('id'));
    $('#templateAfficheInfoContainer-'+afficheContainer.attr('id')).children().first()
        .attr('id', 'templateAfficheInfoContainerDelete-'+afficheContainer.attr('id'));
    $('#templateAfficheInfoContainerDelete-'+afficheContainer.attr('id')).on('click', function() {
        resetCard();
        $('#'+afficheContainer.attr('id')).attr('load', 'false');
    });

    $('#templateAfficheInfoContainer-'+afficheContainer.attr('id')).children().last().attr('id', 'placeForTemplateBooksForAffiche-'+afficheContainer.attr('id'));
    $('.templateAfficheInfoContainer-title').html(data[fItemKey].label);
    $('.templateAfficheInfoContainer-director').html(stringify(data[fItemKey].director, true, 'director', 'movies'));
    $('.templateAfficheInfoContainer-starring').html(stringify(data[fItemKey].starring, true, 'starring', 'movies'));
    $('.templateAfficheInfoContainer-date').html(data[fItemKey].date);
    $('.templateAfficheInfoContainer-language').html(stringify(data[fItemKey].language, true, 'language', 'movies'));
    $('.templateAfficheInfoContainer-country').html(stringify(data[fItemKey].country, true, 'country', 'movies'));
    $('.templateAfficheInfoContainer-genre').html(stringify(data[fItemKey].genre, true, 'genre', 'movies'));

    if(typeof data[fItemKey].books !== 'undefined') {
        for(var keyBook in data[fItemKey].books) {
            if(keyBook > 0) {$('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).append('<hr />');}

            $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).append($('#templateBooksForAffiche').html());

            var element = $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).children().last().children().first().children().first().children().first().children().first();
            var thumbnail = data[fItemKey].books[keyBook].thumbnail;
            var link = thumbnail.replace(".highres", "");

            if(thumbnail != null){ element.attr('src', thumbnail);
            } else{  element.addClass("hidden"); }

            $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).children().last()
                .attr('id', 'placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook);

            $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-title').html(data[fItemKey].books[keyBook].title);
            $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-author').html(stringify(data[fItemKey].books[keyBook].author, true, 'author', 'books'));
            $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-publication').html(data[fItemKey].books[keyBook].publication);
            $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-bnf').attr('href', link);
            $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-rebond').attr('id', data[fItemKey].books[keyBook].qwd).on('click', function() {
                var qwt = $(this).attr('id');
                searchByQwt(qwt, 'books');
            });
        }
    } else {
        $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).append('<div>'+data[fItemKey].WPintro+' <a href="https://fr.wikipedia.org/wiki/'+data[fItemKey].WParticle+'" target="_blank">Lire la suite</a></div>');
    }

    $('.rebondLink').on('click', function() {
        console.log($(this).attr('id'));
        searchByQwt($(this).attr('id'), $(this).attr('tdaDataType'), $(this).attr('tdaType'));
    });
}