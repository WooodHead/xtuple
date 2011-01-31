$(document).ready(function() {

    //table action
        var knownbases = [ "edit","all","matches" ];
        var currenturl = window.location.href;
        if(verify_action_by_location(knownbases,currenturl) != -1) {
            $('table tr[class!="table-header-row"]').each(function() {
                var id = $(this).attr('id');
                $(this).click(function() {
                    //window.location.href=base+'/'+id;
                    window.location.href=baseurl+'/edit/'+id;
                });
                var lastcolor;
                $(this).hover(function() {
                    lastcolor = $(this).css('background-color');
                    $(this).css('background-color','#fff');
                    $(this).css('cursor','default');
                },
                function() {
                    $(this).css('background-color',lastcolor);
                });
            });
        }

    //form input type text selection-replace
    var lastTextValue;
    $('input[type=text]').each(function() {
        $(this).focus(function() {
            lastTextValue=$(this).attr('value');
            $(this).attr('value','');
        });
        $(this).blur(function() {
            if($(this).attr('value') == '')
              $(this).attr('value',lastTextValue);
        });
    });

});


function verify_action_by_location(knowns,url) {
    var split = url.split('/');
    var elem = split[split.length-1];
    return (jQuery.inArray(elem,knowns));
}
