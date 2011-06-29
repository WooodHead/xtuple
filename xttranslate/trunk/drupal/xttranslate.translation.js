var source;
var translation;
var passed_validate = true;
var searchreplace = '';
var searchsource = '';

Drupal.behaviors.translationxttranslate = function() {

$('#xttranslate-translation-submit:not(.xttranslate-processed)').addClass('xttranslate-processed')
     .bind('click', function(){ 
     //put proper translation checking here
	$(this).attr('disabled', 'disabled');	
	var symbols = ['&','!','?',':','...', '%'];
	var consource = $('#xttranslate-tconsource').val();
	var version = $('#xttranslate-version').val();
	
	//alert ("for submit button consource is" + consource);

	var lang_temp = $('#edit-lang option:selected').val();
     lang_temp = lang_temp.split(':');

     var language_code = lang_temp[0];
     var country_code = lang_temp[1];

	
	//var regex = "/((\!)|(\:)|(\&)|(\.{3})|(\.))/";
	
	source = $('#xttranslate-display-source').text().replace(/&/g, '%26');
	//translation = $('#edit-translation').val().replace(/&/g, '%26');
	translation = $('#edit-translation').val(); 
  	translation = encodeURIComponent(translation);
 	//alert(consource);

	var dataString = 't=' + translation + '&cs=' + consource + '&v=' + version + '&lc=' + language_code + '&cc=' + country_code;  
	
	//translation.replace(/&/g, '%26');
	
	//alert(translation);
	if ( $('#xttranslate-override').attr('checked') == false && search == 1) //if override warnings not checked
	{
		//alert ("NOT CHECKED");
	
		if (source == '' || source == null || source == 'undefined')
		{
			$('#xttranslate-warning').html('<b>Please select a source before submitting</b>');
			passed_validate = false;
			return false;
		}
		$.each( symbols, function( strIndex, mysymbol ) {
			var checksource = checkSymbol( mysymbol, source );
			if (checksource == 1) //if it's found for the source
			{
				//alert ("FOUND IN SOURCE");
				var checktrans = checkSymbol( mysymbol, translation ); //check transltion for same symbol
				if (checksource == 1 && checktrans == 0)
				{
					symbolMessage(mysymbol);
					passed_validate = false;
					return false;
				}
				else
				{
					//alert("FOUND IN TRANSLATION?" + checktrans + " " + translation);
					passed_validate = true;
					$('#xttranslate-warning').html('Please wait...');
				}
			}
		});

		

	}
	else
	{
		if (search == 1)
		{
			passed_validate = true;
		}
	}
		//not found for source, passed_validate should still be true
		if (passed_validate == true)
		{
			$('#xttranslate-warning').html('Please wait...');
		}
	
	
 		//$.get('/xttranslate/translation/' + source + '/' + translation, null, processTranslation);

		if (passed_validate == true)
		{
			//alert(dataString);	
			$.ajax({  
   			type: "POST",  
			data: dataString,  
			url: "/xttranslate/translation/",  
   			success: function() 
			{  
					$('#xttranslate-translation-submit').removeAttr('disabled');
     			$('#xttranslate-warning').html('Submitted.');  
   			},
			error: function()
			{
				alert("An Error Occured with submission.");
			}  

 			});  
		}

	
	return false;
	
     });


$('#xttranslate-tsubmit-button:not(.xttranslate-processed)').addClass('xttranslate-processed')
     .bind('click', function(){ 
     //put proper translation checking here
	
	var symbols = ['&','!','?',':','...', '%'];
	var consource = $('#xttranslate-tconsource').val();
	//alert("for xttranslate button, consource is" + consource);
	var version = $('#xttranslate-version').val();

	var lang_temp = $('#edit-lang option:selected').val();
     lang_temp = lang_temp.split(':');

     var language_code = lang_temp[0];
     var country_code = lang_temp[1];

	
	//var regex = "/((\!)|(\:)|(\&)|(\.{3})|(\.))/";
	
	source = $('#xttranslate-display-source').text().replace(/&/g, '%26');
	translation = $('#xttranslate-replace-term').val().replace(/&/g, '%26');


	var dataString = 't=' + translation + '&cs=' + consource + '&v=' + version + '&lc=' + language_code + '&cc=' + country_code;  

	//alert("in tsubmit button, dataString is " + dataString);	
	//translation.replace(/&/g, '%26');
	
	//alert(translation);
	if ( $('#xttranslate-override').attr('checked') == false ) //if override warnings not checked
	{
		//alert ("NOT CHECKED");
	
		if (source == '' || source == null || source == 'undefined')
		{
			$('#xttranslate-warning').html('<b>Please select a source before submitting</b>');
			passed_validate = false;
			return false;
		}
		$.each( symbols, function( strIndex, mysymbol ) {
			var checksource = checkSymbol( mysymbol, source );
			if (checksource == 1) //if it's found for the source
			{
				//alert ("FOUND IN SOURCE");
				var checktrans = checkSymbol( mysymbol, translation ); //check transltion for same symbol
				if (checksource == 1 && checktrans == 0)
				{
					symbolMessage(mysymbol);
					passed_validate = false;
					return false;
				}
				else
				{
					//alert("FOUND IN TRANSLATION?" + checktrans + " " + translation);
					passed_validate = true;
					$('#xttranslate-warning').html('Please wait...');
				}
			}
		});

		

	}
	else
	{
		passed_validate = true;
	}
		//not found for source, passed_validate should still be true
		if (passed_validate == true)
		{
			$('#xttranslate-warning').html('Please wait...');
		}
	
	
 		//$.get('/xttranslate/translation/' + source + '/' + translation, null, processTranslation);

		if (passed_validate == true)
		{
			//alert(dataString);	
			$.ajax({  
   			type: "POST",  
			data: dataString,  
			url: "/xttranslate/translation/",  
   			success: function() 
			{  
     			$('#xttranslate-warning').html('Submitted.');  
   			},
			error: function()
			{
				alert("An Error Occured with submission.");
			}  

 			});  
		}
		else
		{
			//alert('failed validate');
		}

	
	return false;
	
     });



	$('#xttranslate-all-button').click( function () {
          search = 1;

          searchitem = $('#xttranslate-find-term').val();
          searchitem = searchitem.replace(/&/g, '');

          searchreplace = $('#xttranslate-replace-term').val();
          searchreplace = searchreplace.replace(/&/g, '');

		searchsource = searchitem;

          //searchitem = encodeURIComponent( searchitem );
          //alert (searchitem);
          //alert(searchreplace);

		if (searchitem != '')
		{	
			//$.get('/xttranslate/default/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, xttranslateAll);
			$.post("/xttranslate/default/search/", { term: searchitem, language: language_code, version: version, country: country_code, slice: page_slice }, xttranslateAll );
		}
		else
		{
			$('#xttranslate-warning').html('<b>Please enter a keyword to search for first.</b>');
		}

     });

	$('#xttranslate-replace-whole').click( function ()
	{
		 $('#xttranslate-replace-part').attr("checked", false);
	});

	$('#xttranslate-replace-part').click( function ()
	{
		 $('#xttranslate-replace-whole').attr("checked", false);
	});

} 


var processTranslation = function(data)
{
	var result = Drupal.parseJson(data);

	/*
	if (result['status'] == 'valid' && result['status'] != null && result['status'] != "undefined")
	{
		
	}
	else
	{
		$('#xttranslate-warning').html(result['status']);
	}
	*/
}

function checkSymbol( symbol, tempstr )
{
	var iChars = ":?!%&."; 
	/*
	if (symbol == '%')
	{
		var regex = "/\\" + symbol + "[0-9]/i";
	}
	else if (symbol == '...')
	{
		var regex = "/\.{3}/i";
	}
	else
	{
		var regex = "/\\" + symbol + "/i";
	}
	*/
	//alert (regex);	
	//alert ("SOURCE: " + tempstr + " " + tempstr.search(regex));
	
	for (var i = 0; i < tempstr.length; i++)
	{
  		if (iChars.indexOf(tempstr.charAt(i)) != -1)
		{
  	  		//alert ("Your string has special characters. \nThese are not allowed.");
  			//return false;
			if (tempstr.charAt(i) == symbol)
			{
				return 1;	
			}
  		}
		
	}

	//if (tempstr.search(regex) != -1)
	//{
	//	return 1;
	//}
	//else
	//{
	return 0;
	//}
}

function symbolMessage( symbol )
{
	//alert ("SYMBOL MESSAGE CALLED");
	switch (symbol)
	{
		case "...":
		$('#xttranslate-warning').html('Your translation does not end in an elipsis. Are you sure you want to submit this?');
		break;

		case "&":
		$('#xttranslate-warning').html('Your translation does not contain an accelerator. Are you sure you want to submit this?');
		break;
		
		case "%":
		$('#xttranslate-warning').html('Your translation has missing or differing place markers. Are you sure you want to submit this?');
		break;

		default:
		$('#xttranslate-warning').html('Your translation does not end in the same punctuation as its source. Are you sure you want to submit this?');		
	}
}


var xttranslateAll = function (data) {
	
var symbols = ['&','!','?',':','...', '%'];
var version = $('#xttranslate-version').val();

var lang_temp = $('#edit-lang option:selected').val();
lang_temp = lang_temp.split(':');

var language_code = lang_temp[0];
var country_code = lang_temp[1];

var result = Drupal.parseJson(data); 
var consources = result['sources'];
consources = $.toJSON(consources);

//$.each( consources, function(objValue, source) {
consources = encodeURIComponent(consources);
var dataString = 't=' + searchreplace + '&sm=' + searchsource + '&cs=' + consources + '&v=' + version + '&lc=' + language_code + '&cc=' + country_code;

//new - replacement type. default to replace whole source matches
var rt = 'whole';
	
if ($('#xttranslate-replace-part').is(':checked'))
{
	//replace part of source string
	rt = 'part';
}
dataString += '&rt=' + rt;	
	
/*
var smatch = source.replace(/&/g, '');
if (source == '' || source == null || source == 'undefined')
{
     $('#xttranslate-warning').html('<b>Source not found</b>');
     passed_validate = false;
     return false;
}

if (searchsource.toLowerCase() == smatch.toLowerCase() )
{

$.each( symbols, function( strIndex, mysymbol ) {
     var checksource = checkSymbol( mysymbol, source );
     if (checksource == 1) //if it's found for the source
     {
          var checktrans = checkSymbol( mysymbol, searchreplace ); //check transltion for same symbol
          if (checksource == 1 && checktrans == 0)
          {
               symbolMessage(mysymbol);
               passed_validate = false;
               return false;
          }
          else
          {
                         //alert("FOUND IN TRANSLATION?" + checktrans + " " + translation);
               passed_validate = true;               
          }
     }
});
*/

passed_validate = true;

if (passed_validate == true)
{
     $.ajax({
          type: "POST",
          data: dataString,
          url: "/xttranslate/translation/all",
          success: function()
          {
               //$('#xttranslate-warning').html('Submitted.');
          },
          error: function()
          {
               alert("An Error Occured with submission.");
          }
     });
}          


//}

//});

//$.get('/xttranslate/default/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, searchSetup);
$.post("/xttranslate/default/search/", { term: searchitem, language: language_code, version: version, country: country_code, slice: page_slice }, searchSetup );
return false;	

}
