/**
 * Created by karlpineau on 19/11/2016.
 */
$(document).ready(function() {
    function loadTemplateInfoMovie(afficheContainer) {
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
                $('.templateAfficheInfoContainer-title').text(data[0].label);
                $('.templateAfficheInfoContainer-director').text(data[0].director);
                $('.templateAfficheInfoContainer-starring').text(data[0].starring);
                $('.templateAfficheInfoContainer-date').text(data[0].date);
                $('.templateAfficheInfoContainer-language').text(data[0].language);
                $('.templateAfficheInfoContainer-country').text(data[0].country);
                $('.templateAfficheInfoContainer-genre').text(data[0].genre);

                for(keyBook in data[0].books) {
                    if(keyBook > 0) {$('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).append('<hr />');}
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).append($('#templateBooksForAffiche').html());

                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).children().last().children().first().children().first().children().first()
                        .attr('src', data[0].books[keyBook].thumbnail);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')).children().last()
                        .attr('id', 'placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook);

                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-title').text(data[0].books[keyBook].title);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-author').text(data[0].books[keyBook].author);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-publication').text(data[0].books[keyBook].publication);
                    $('#placeForTemplateBooksForAffiche-'+afficheContainer.attr('id')+'-'+keyBook).find('.templateBooksForAffiche-bnf').attr('href', data[0].books[keyBook].bnf);
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

    function loadData(data) {
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
                loadTemplateInfoMovie($('#'+data[itemKey].id));
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