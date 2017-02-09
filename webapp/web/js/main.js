$('#searchButton').on('click', function() {
    $('#sectionContent').html('<h2 class="text-center" style="margin-top: 10%;"><i class="fa fa-spin fa-5x fa-circle-o-notch" aria-hidden="true"></i></h2>');
    search($('#searchInput').val(), 'movies');
});

$('#searchInput').on('submit', function() {
    $('#sectionContent').html('<h2 class="text-center" style="margin-top: 10%;"><i class="fa fa-spin fa-5x fa-circle-o-notch" aria-hidden="true"></i></h2>');
    search($('#searchInput').val(), 'movies');
});

$('#sectionContent').html('<h2 class="text-center" style="margin-top: 10%;"><i class="fa fa-spin fa-5x fa-circle-o-notch" aria-hidden="true"></i></h2>');
search('', 'movies');
