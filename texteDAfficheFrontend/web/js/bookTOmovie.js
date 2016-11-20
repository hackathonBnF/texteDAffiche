$(document).ready(function() {
    function loadTemplateInfoBook(illustrationContainer) {
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

        $('#templateIllustrationInfoContainer-'+illustrationContainer.attr('id')).children().last().attr('id', 'placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id'));
        $.ajax({
            dataType: "json",
            url: 'data.json',
            success: function (data) {
                $('.templateIllustrationInfoContainer-title').text(data[0].label);
                $('.templateIllustrationInfoContainer-director').text(data[0].director);
                $('.templateIllustrationInfoContainer-starring').text(data[0].starring);
                $('.templateIllustrationInfoContainer-date').text(data[0].date);
                $('.templateIllustrationInfoContainer-language').text(data[0].language);
                $('.templateIllustrationInfoContainer-country').text(data[0].country);
                $('.templateIllustrationInfoContainer-genre').text(data[0].genre);

                for(keyBook in data[0].books) {
                    if(keyBook > 0) {$('#placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id')).append('<hr />');}
                    $('#placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id')).append($('#templateBooksForIllustration').html());

                    $('#placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id')).children().last().children().first().children().first().children().first()
                        .attr('src', data[0].books[keyBook].thumbnail);
                    $('#placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id')).children().last()
                        .attr('id', 'placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id')+'-'+keyBook);

                    $('#placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id')+'-'+keyBook).find('.templateBooksForIllustration-title').text(data[0].books[keyBook].title);
                    $('#placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id')+'-'+keyBook).find('.templateBooksForIllustration-author').text(data[0].books[keyBook].author);
                    $('#placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id')+'-'+keyBook).find('.templateBooksForIllustration-publication').text(data[0].books[keyBook].publication);
                    $('#placeForTemplateBooksForIllustration-'+illustrationContainer.attr('id')+'-'+keyBook).find('.templateBooksForIllustration-bnf').attr('href', data[0].books[keyBook].bnf);
                }
            },
            error: function (error) {
                console.log(dump(error));
            }
        });
    }

    function removeTemplateInfoBook(bookId) {
        $('#templateIllustrationInfoContainer-'+bookId).remove();
    }

    function loadData(data) {
        initContent();
        for(itemKey in data) {
            if($('#sectionContent').children().length == 0 || $('#sectionContent').children().length%4 == 0) {$('#sectionContent').append('<div class="row"></div>');}

            $('#sectionContent').children().last().append('' +
                '<div class="col-sm-3">'+
                '   <div class="illustrationContainer" id="'+data[itemKey].id+'">'+
                '       <img class="affiche thumbnail" src="'+data[itemKey].poster+'" alt="" title="" />'+
                '   </div>'+
                '</div>'
            );

            $('#'+data[itemKey].id).on('click', function() {
                loadTemplateInfoBook($('#'+data[itemKey].id));
            });
        }
    }

    function initContent() {
        $('#sectionContent').html('');
    }

    function search(value) {
        $.ajax({
            dataType: "json",
            url: 'data.json',
            success: function (data) {
                loadData(data);
            },
            error: function (error) {
                console.log(dump(error));
            }
        });
    }

    $('#searchButton').on('click', function() {
        search($('#searchInput'));
    });

    search('*');
});