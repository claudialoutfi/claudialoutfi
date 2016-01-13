$(document).ready () ->
    $.backstretch 'background.jpg', { fade : 750 }
    $.ajax
        url     : 'contact.html'
        success : (data) ->
            $('#mail').tooltip
                title     : data,
                placement : 'right'
            $('#mail').click () ->
                window.location = 'mailto:' + data
                return false;