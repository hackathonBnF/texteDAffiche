
    function loadTemplateInfoBook(illustrationContainer, itemKey, entity) {

    }

    function removeTemplateInfoBook(bookId) {
        $('#templateIllustrationInfoContainer-'+bookId).remove();
    }

    function loadDataBook(data) {
        initContent();
        for(var itemKey in data) {
            if($('#sectionContent').children().length == 0 || $('#sectionContent').children().length%4 == 0) {$('#sectionContent').append('<div class="row"></div>');}

            $('#sectionContent').children().last().append('' +
                '<div class="col-sm-3">'+
                '   <div class="illustrationContainer" id="'+data[itemKey].id+'">'+
                '       <img class="affiche thumbnail" src="'+data[itemKey].thumbnail+'" alt="" title="" />'+
                '   </div>'+
                '</div>'
            );

            $('#'+data[itemKey].id).on('click', function() {
                var illustrationContainer = $('#'+data[itemKey].id);
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
                $('.templateIllustrationInfoContainer-title').text(data[itemKey].title);
                $('.templateIllustrationInfoContainer-author').text(data[itemKey].author);
                $('.templateIllustrationInfoContainer-publication').text(data[itemKey].publication);

                for(var keyMovie in data[itemKey].movies) {
                    if(keyMovie > 0) {$('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).append('<hr />');}
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).append($('#templateMoviesForIllustration').html());

                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).children().last().children().first().children().first().children().first()
                        .attr('src', data[itemKey].movies[keyMovie].poster);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')).children().last()
                        .attr('id', 'placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie);

                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-title').text(data[itemKey].movies[keyMovie].label);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-director').text(data[itemKey].movies[keyMovie].director);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-starring').text(data[itemKey].movies[keyMovie].starring);
                    $('#placeForTemplateMoviesForIllustration-'+illustrationContainer.attr('id')+'-'+keyMovie).find('.templateMoviesForIllustration-imdb').attr('href', data[itemKey].movies[keyMovie].imdb);
                }
            });
        }
    }
