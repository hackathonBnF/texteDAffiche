    function loadTemplateInfoMovie(afficheContainer, itemKey) {
        $.each($('div[id^="templateAfficheInfoContainer-"]'), function() {
            removeTemplateInfoMovie($(this).attr('movieId'));
        });

        afficheContainer.parent().parent().after($('#templateAfficheInfoContainer').html());
        afficheContainer.parent().parent().next()
            .attr('id', 'templateAfficheInfoContainer-'+afficheContainer.attr('id'))
            .attr('movieId', afficheContainer.attr('id'));
        $('#templateAfficheInfoContainer-'+afficheContainer.attr('id')).children().first()
            .attr('id', 'templateAfficheInfoContainerDelete-'+afficheContainer.attr('id'));
        $('#templateAfficheInfoContainerDelete-'+afficheContainer.attr('id')).on('click', function() {
            removeTemplateInfoMovie(afficheContainer.attr('id'));
        });

        $('#templateAfficheInfoContainer-'+afficheContainer.attr('id')).children().last().attr('id', 'placeForTemplateBooksForAffiche-'+afficheContainer.attr('id'));
        $.ajax({
            dataType: "json",
            url: 'data.json',
            success: function (data) {
                $('#templateAfficheInfoContainer-'+itemKey).children[1].find('.templateAfficheInfoContainer-title').text(data[itemKey].label);
                $('#templateAfficheInfoContainer-'+itemKey).children().find('.templateAfficheInfoContainer-director').text(data[itemKey].director);
                $('#templateAfficheInfoContainer-'+itemKey).children().find('.templateAfficheInfoContainer-starring').text(data[itemKey].starring);
                $('#templateAfficheInfoContainer-'+itemKey).children().find('.templateAfficheInfoContainer-date').text(data[itemKey].date);
                $('#templateAfficheInfoContainer-'+itemKey).find('.templateAfficheInfoContainer-language').text(data[itemKey].language);
                $('#templateAfficheInfoContainer-'+itemKey).find('.templateAfficheInfoContainer-country').text(data[itemKey].country);
                $('#templateAfficheInfoContainer-'+itemKey).find('.templateAfficheInfoContainer-genre').text(data[itemKey].genre);

                for(keyBook in data[itemKey].books) {
                    if(keyBook > 0) {$('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).append('<hr />');}
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).append($('#templateBooksForAffiche').html());

                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).children().last().children().first().children().first().children().first()
                        .attr('src', data[itemKey].books[keyBook].thumbnail);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).children().last()
                        .attr('id', 'placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook);

                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-title').text(data[itemKey].books[keyBook].title);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-author').text(data[itemKey].books[keyBook].author);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-publication').text(data[itemKey].books[keyBook].publication);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-bnf').attr('href', data[itemKey].books[keyBook].bnf);
                }
            },
            error: function (error) {
                console.log(dump(error));
            }
        });
    }

    function removeTemplateInfoMovie(movieId) {
        $('#templateAfficheInfoContainer-'+movieId).remove();
    }

    function loadDataMovie(data) {
        initContent();
        for(itemKey in data) {
            if($('#sectionContent').children().length == 0 || $('#sectionContent').children().length%4 == 0) {$('#sectionContent').append('<div class="row"></div>');}

            $('#sectionContent').children().last().append('' +
                '<div class="col-sm-3">'+
                '   <div class="afficheContainer" id="'+data[itemKey].id+'">'+
                '       <img class="affiche thumbnail" src="'+data[itemKey].poster+'" alt="" title="" />'+
                '   </div>'+
                '</div>'
            );

            $('#'+data[itemKey].id).on('click', function() {
                loadTemplateInfoMovie($('#'+data[itemKey].id), itemKey);
            });
        }
    }
