    function removeTemplateInfoMovie(movieId) {
        $('#templateAfficheInfoContainer-'+movieId).remove();
    }

    function loadDataMovie(data) {
        initContent();
        for(var itemKey in data) {
            console.log("HERE 1 " + itemKey + " test : " + $('#sectionContent').children().length);
            if($('#sectionContent').children().length == 0 || $('#sectionContent').children().length%4 == 0) {
		console.log($('#sectionContent').children().length); $('#sectionContent').append('<div class="row"></div>');
		}

            dateElement = data[itemKey];
            imageName = dateElement.poster || "web/images/noImage.jpg";
            $('#sectionContent').children().last().append('' +
                '<div class="col-sm-3">'+
                '   <div class="afficheContainer" id="'+dateElement.id+'" key="'+itemKey+'">' +
                '       <div class="text-center">' +
                '       <img class="affiche" src="'+ imageName +'" alt="" title="" />'+
                '       </div>'+
                '   </div>'+
                '</div>'
            );

            $('#'+dateElement.id).on('click', function() {
                var fItemKey = $(this).attr('key');
                var afficheContainer = $(this);

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
                $('.templateAfficheInfoContainer-title').text(data[fItemKey].label);
                $('.templateAfficheInfoContainer-director').text(data[fItemKey].director);
                $('.templateAfficheInfoContainer-starring').text(data[fItemKey].starring);
                $('.templateAfficheInfoContainer-date').text(data[fItemKey].date);
                $('.templateAfficheInfoContainer-language').text(data[fItemKey].language);
                $('.templateAfficheInfoContainer-country').text(data[fItemKey].country);
                $('.templateAfficheInfoContainer-genre').text(data[fItemKey].genre);

                for(var keyBook in data[fItemKey].books) {
                    if(keyBook > 0) {$('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).append('<hr />');}
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).append($('#templateBooksForAffiche').html());
	            element = $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).children().last().children().first().children().first().children().first().children().first();
	            thumbnail = data[fItemKey].books[keyBook].thumbnail;
	            console.log("thumbnail : " + thumbnail + " test : " + thumbnail != null);
		    if(thumbnail != null){
                        element.attr('src', +'.thumbnail');
		    }else{
                        element.addClass("hidden");
		    }
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).children().last()
                        .attr('id', 'placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook);

                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-title').text(data[fItemKey].books[keyBook].title);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-author').text(data[fItemKey].books[keyBook].author);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-publication').text(data[fItemKey].books[keyBook].publication);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-bnf').attr('href', data[fItemKey].books[keyBook].thumbnail);
                }
            });
        }
    }
