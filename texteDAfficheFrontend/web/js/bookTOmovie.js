    function removeTemplateInfoBook(bookId) {
        $('#templateIllustrationInfoContainer-'+bookId).remove();
    }

    function loadDataBook(data) {
        initContent();
        for(var itemKey in data) {
            if($('#sectionContent').children().length == 0 || $('#sectionContent').children().length%4 == 0) {$('#sectionContent').append('<div class="row"></div>');}

            $('#sectionContent').children().last().append('' +
                '<div class="col-sm-3">'+
                '   <div class="illustrationContainer" id="'+data[itemKey].id+'" key="'+itemKey+'">'+
                '       <div class="text-center">' +
                '       <img class="affiche" src="'+data[itemKey].thumbnail+'" alt="" title="" />'+
                '       </div>'+
                '   </div>'+
                '</div>'
            );

            $('#'+data[itemKey].id).on('click', function() {
                var fItemKey = $(this).attr('key');
                var illustrationContainer = $('#'+data[fItemKey].id);

                $.each($('div[id^="templateIllustrationInfoContainer-"]'), function() {
                    removeTemplateInfoBook($(this).attr('bookId'));
                });

                illustrationContainer.parent().parent().after($('#templateIllustrationInfoContainer').html());
                illustrationContainer.parent().parent().next()
                    .attr('id', 'templateIllustrationInfoContainer-'+illustrationContainer.attr('id'))
                    .attr('bookId', illustrationContainer.attr('id'));
                $('#templateIllustrationInfoContainer-'+illustrationContainer.attr('id')).children().first()
                    .attr('id', 'templateIllustrationInfoContainerDelete-'+illustrationContainer.attr('id'));
                $('#templateIllustrationInfoContainerDelete-'+illustrationContainer.attr('id')).on('click', function() {
                    removeTemplateInfoBook(illustrationContainer.attr('id'));
                });

                $('#templateIllustrationInfoContainer-'+illustrationContainer.attr('id')).children().last().attr('id', 'placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id'));
                $('.templateIllustrationInfoContainer-title').text(data[fItemKey].title);
                $('.templateIllustrationInfoContainer-author').text(data[fItemKey].author);
                $('.templateIllustrationInfoContainer-publication').text(data[fItemKey].publication);
                $('.templateIllustrationInfoContainer-bnf').attr('href', data[fItemKey].bnf);

                for(var keyMovie in data[fItemKey].movies) {
                    if(keyMovie > 0) {$('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).append('<hr />');}
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).append($('#templateMoviesForIllustration').html());

                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).children().last().children().first().children().first().children().first().children().first()
                        .attr('src', data[fItemKey].movies[keyMovie].poster);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).children().last()
                        .attr('id', 'placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie);

                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-title').text(data[fItemKey].movies[keyMovie].label);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-director').text(data[fItemKey].movies[keyMovie].director);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-starring').text(data[fItemKey].movies[keyMovie].starring);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-imdb').attr('href', data[fItemKey].movies[keyMovie].imdb);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-date').text(data[fItemKey].movies[keyMovie].date);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-genre').text(data[fItemKey].movies[keyMovie].genre);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-language').text(data[fItemKey].movies[keyMovie].language);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-country').text(data[fItemKey].movies[keyMovie].country);
                }
            });
        }
    }
