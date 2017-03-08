$(".btn-shorten").on('click', function(){
    //ajax call 
    $.ajax({
        url: '/api/shorten',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val()},
        success: function(data){
            var resultHTML = '<a class="result" href="' + data.generatedUrl + '">'
            + data.generatedUrl + '</a>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
        }
    });
})