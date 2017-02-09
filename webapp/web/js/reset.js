function initContent() {
    $('#sectionContent').html('');
}

function resetCard() {
    $.each($('div[id^="templateAfficheInfoContainer-"]'), function() { $(this).remove();});
    $.each($('div[id^="templateIllustrationInfoContainer-"]'), function() { $(this).remove();});
}
