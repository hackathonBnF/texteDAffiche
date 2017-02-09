//$('#searchInput').on('change', function() {console.log($('#searchInput').val());});
//$( function() {
    $('#searchInput').autoComplete({
        minChars: 1,
        source: function (request, response) {
            $.ajax({
                url: 'http://zone47.com/tda/api/autocompletion.php',
                type: 'GET',
                data: {"keyword": request},
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.label,
                            value: item.label
                        };
                    }));
                },
                error: function (data) {
                    console.log("error");
                    $('#searchInput').removeClass('ui-autocomplete-loading');
                }
            });
        },
        _renderItem: function( ul, item) {
            console.log(item);
            return $( "<li></li>" )
                .data( "item.autocomplete", item )
                .append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )
                .appendTo( ul );
        }
    });
    $('#searchInput').keyup(function(e){
         if(e.keyCode == 13)
         if ($(".selected" ).length)
         document.location.href=$(".selected").attr("data-val");
    });
//});