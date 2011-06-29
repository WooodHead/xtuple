var language_code;
var country_code;
var current_width = 0;
var page_slice = 0;
var max_size = 0;
var after_slice = 0;
var before_slice = 0;
var context_pages = before_slice + ' to ' + 15;
var search = 0;
var replace = 0;
var searchitem = '';
var searchreplace = '';
var searchtype = '';
var max_contexts = 0;

var search_sources = null;
var search_consources = null;
var search_matchsource = null;
var search_translations = null;
var search_contexts = null;
var search_contextids = null;

var keepOffset = 0;
var newcontext = 0;
var newsource = 0;
var contextArray = new Array();
var sliced_array = null;
var tlength = 0;
var sindex = 0;
var tindex = 1;
var rindex = 1;
var cindex = 1;
var temp_contextid = 0;
var end_of_sources = 0;

var version = '';

Drupal.behaviors.xttranslate = function() {
	$.ajaxSetup( {
	//timeout: 5000
	});


	if ($('#edit-lang option:selected').val() == 'init')
     {
		$('#xttranslate-lang-submit').attr("disabled","disabled"); 
		$('#xttranslate-search-button').attr("disabled","disabled");
		$('#xttranslate-clearsearch').attr("disabled","disabled");
	}

	
	
		$('#xttranslate-find-button').attr("disabled","disabled");
          $('#xttranslate-find-next').attr("disabled","disabled");
          $('#xttranslate-tsubmit-button').attr("disabled","disabled");
          $('#xttranslate-all-button').attr("disabled","disabled");
		
	

	//get the current language select value
	var lang_temp = $('#edit-lang option:selected').val();
	lang_temp = lang_temp.split(':');

	language_code = lang_temp[0];
	country_code = lang_temp[1];

	$('#xttranslate-clearsearch').click( function ()
	{
		if ( search == 1 && lang_temp[1] != undefined)
		{
			search = 0;
			newcontext = 0;
               keepOffset = 0;
               cindex = 1;
               rindex = 1;
               sindex = 0;
               tindex = 1;
               end_of_sources = 0;
			search_contextids = null;

			//$.get('/xttranslate/context/' + lang_temp[0] + '/' + lang_temp[1] + '/' + page_slice, null, showContext);
		  $.post('/xttranslate/context/',{lang:lang_temp[0],country:lang_temp[1],version:version,slice:page_slice}, showContext);
			return false;	
		}
	});

	$('#xttranslate-view-source-table').serialScroll({
		items:'tr',
		next:'#xttranslate-find-next',
		force:true,
		stop:true,
		interval:1,
		lock:false,
		lazy:true
	});

	
	//alert (document.getElementById('xttranslate-view-source').offsetHeight);
	$('#xttranslate-next-context').click( function ()
	{
		if (search == 1)
		{
			max_size = max_contexts;
			newcontext = 0; 
			keepOffset = 0;
			cindex = 1;
			rindex = 1;
			sindex = 0;
			tindex = 1;
			end_of_sources = 0;
		}

		if ($('#edit-lang option:selected').val() != 'init' && lang_temp[1] != undefined)
		{
			//if the page slice you're on + 15 is larger than the max amount of contexts
			//if max_size == 0, page just loaded, add 15 as usual, else, just give last slice
			$('#edit-translation').empty();	
		
			if (search == 1)
			{
				page_slice = (page_slice+15 >= max_size) ? (max_size == 0) ? (page_slice+15) : (page_slice-15) : (page_slice+15);
				page_slice = (max_size-15 < 0) ? 0 : page_slice;
			}
			else
			{
				page_slice = (page_slice+15 >= max_size) ? (max_size == 0) ? (page_slice+15) : (max_size-15) : (page_slice+15);
				page_slice = (max_size-15 < 0) ? 0 : page_slice;
			}

			if (search == 1)
			{
				if (searchtype == 'source')
				{
					//$.get('/xttranslate/source/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, searchSetup);		
					$.post('/xttranslate/source/search/', {search:searchitem,lang:language_code,country:country_code,slice:page_slice,version:version}, searchSetup);		
				}
				if (searchtype == 'context')
				{
					//$.get('/xttranslate/context/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, showContext);	
				  $.post('/xttranslate/context/search/',{lang:lang_temp[0],country:lang_temp[1],version:version,slice:page_slice,search:searchitem}, showContext);
				}
				if (searchtype == 'translation')
				{
					$.get('/xttranslate/translation/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, searchSetup);		
				}
				if (searchtype == 'both')
				{
					//$.get('/xttranslate/default/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, searchSetup);		
					$.post("/xttranslate/default/search/", { term: searchitem, version: version, language: language_code, country: country_code, slice: page_slice }, searchSetup );
				}
			}
			else
			{
				//$.get('/xttranslate/context/' + lang_temp[0] + '/' + lang_temp[1] + '/' + page_slice, null, showContext);
			  $.post('/xttranslate/context/',{lang:lang_temp[0],country:lang_temp[1],version:version,slice:page_slice}, showContext);
			}
     		return false;	
		}
	});
	$('#xttranslate-prev-context').click( function ()
	{
		if (search == 1)
		{
			max_size = max_contexts;
			newcontext = 0; 
			keepOffset = 0;
			cindex = 1;
			rindex = 1;
			sindex = 0;
			tindex = 1;
			end_of_sources = 0;
		}

		if ($('#edit-lang option:selected').val() != 'init' && lang_temp[1] != undefined)
		{
			$('#edit-translation').empty();	

			page_slice = (page_slice-15 < 0) ? 0 : (page_slice-15);
			if (search == 1)
			{

				if (searchtype == 'source')
				{
					//$.get('/xttranslate/source/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, searchSetup);		
					$.post('/xttranslate/source/search/', {search:searchitem,lang:language_code,country:country_code,slice:page_slice,version:version}, searchSetup);		
				}
				if (searchtype == 'context')
				{
					//$.get('/xttranslate/context/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, showContext);
					$.post('/xttranslate/context/search/',{lang:lang_temp[0],country:lang_temp[1],version:version,slice:page_slice,search:searchitem}, showContext);
				}
				if (searchtype == 'translation')
				{
					$.get('/xttranslate/translation/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, searchSetup);		
				}
				if (searchtype == 'both')
				{
					//$.get('/xttranslate/default/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, searchSetup);		
					$.post("/xttranslate/default/search/", { term: searchitem, version:version, language: language_code, country: country_code, slice: page_slice }, searchSetup );
				}
			}
			else
			{
				//$.get('/xttranslate/context/' + lang_temp[0] + '/' + lang_temp[1] + '/' + page_slice, null, showContext);
				$.post('/xttranslate/context/',{lang:lang_temp[0],country:lang_temp[1],version:version,slice:page_slice}, showContext);
			}
     		return false;	
		}
	});

	$('#xttranslate-next-unfinished').click( function ()
	{

		if (search == 1)
		{
			max_size = max_contexts;
			newcontext = 0; 
			keepOffset = 0;
			cindex = 1;
			rindex = 1;
			sindex = 0;
			tindex = 1;
			end_of_sources = 0;
		}

		if ($('#edit-lang option:selected').val() != 'init' && lang_temp[1] != undefined)
		{
			if (search == 1)
			{
				page_slice = (page_slice+15 >= max_size) ? (max_size == 0) ? (page_slice+15) : (page_slice-15) : (page_slice+15);
				page_slice = (max_size-15 < 0) ? 0 : page_slice;
			}
			else
			{
				page_slice = (page_slice+15 >= max_size) ? (max_size == 0) ? (page_slice+15) : (max_size-15) : (page_slice+15);
				page_slice = (max_size-15 < 0) ? 0 : page_slice;
			}


			if (search == 1)
			{
				if (searchtype == 'source')
				{
					//$.get('/xttranslate/source/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice + '/true', null, searchSetup);		
					$.post('/xttranslate/source/search/', {search:searchitem,lang:language_code,country:country_code,slice:page_slice,version:version,unfinished:true}, searchSetup);		
				}
				if (searchtype == 'context')
				{
					//$.get('/xttranslate/context/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice + '/true', null, showContext);
					$.post('/xttranslate/context/search/',{lang:lang_temp[0],country:lang_temp[1],version:version,slice:page_slice,search:searchitem,unfinished:true}, showContext);
				}
				if (searchtype == 'translation')
				{
					$.get('/xttranslate/translation/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice + '/true', null, searchSetup);		
				}
				if (searchtype == 'both')
				{
					//$.get('/xttranslate/default/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice + '/true', null, searchSetup);		
					$.post("/xttranslate/default/search/", { term: searchitem, version:version, language: language_code, country: country_code, unfinished:true, slice: page_slice }, searchSetup );
				}
			}
			else
			{
				//$.get('/xttranslate/context/' + lang_temp[0] + '/' + lang_temp[1] + '/' + page_slice + '/true', null, showContext);
				$.post('/xttranslate/context/',{lang:lang_temp[0],country:lang_temp[1],version:version,slice:page_slice,unfinished:true}, showContext);
			}
		
     		return false;	
		}
	});
	$('#xttranslate-prev-unfinished').click( function ()
	{
		//$('#xttranslate-context-pages').empty();
		if (search == 1)
		{
			max_size = max_contexts;
			newcontext = 0; 
			keepOffset = 0;
			cindex = 1;
			rindex = 1;
			sindex = 0;
			tindex = 1;
			end_of_sources = 0;
		}

		if ($('#edit-lang option:selected').val() != 'init' && lang_temp[1] != undefined)
		{

			page_slice = (page_slice-15 < 0) ? 0 : (page_slice-15);
			if (search == 1)
			{
				if (searchtype == 'source')
				{
					//$.get('/xttranslate/source/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice + '/true', null, searchSetup);		
					$.post('/xttranslate/source/search/', {search:searchitem,lang:language_code,country:country_code,slice:page_slice,version:version,unfinished:true}, searchSetup);		
				}
				if (searchtype == 'context')
				{
					//$.get('/xttranslate/context/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice + '/true/', null, showContext);
					$.post('/xttranslate/context/search',{lang:lang_temp[0],country:lang_temp[1],version:version,slice:page_slice,search:searchitem,unfinished:true}, showContext);
				}
				if (searchtype == 'translation')
				{
					$.get('/xttranslate/translation/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice + '/true', null, searchSetup);		
				}
				if (searchtype == 'both')
				{
					//$.get('/xttranslate/default/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice + '/true', null, searchSetup);		
					$.post("/xttranslate/default/search/", { term: searchitem, version: version, language: language_code, country: country_code, slice: page_slice,unfinished:true}, searchSetup );
				}
			}
			else
			{
				//$.get('/xttranslate/context/' + lang_temp[0] + '/' + lang_temp[1] + '/' + page_slice + '/true', null, showContext);
				$.post('/xttranslate/context/',{lang:lang_temp[0],country:lang_temp[1],version:version,slice:page_slice,unfinished:true}, showContext);
			}
     		return false;	
		}
	});
	
	$(window).resize( function ()
	{
		 //var x = document.getElementById('xttranslate-context-table').offsetWidth;
	     //var f = new ScrollableTable(document.getElementById('xttranslate-context-table'), y, x);


     	//$('#xttranslate-context-table').scrollable({tableWidth:x, tableHeight:y});
     	var tempw = $('#xttranslate-context').width();
		var tempfull = $('#xttranslate-main').width();

     	//tempw = x-tempw;
     	//var tempsw = $('#xttranslate-right').width() - tempw;
		var tempsw = tempfull - tempw;

     	//$('#xttranslate-context').width(x);  
     	$('#xttranslate-right').width(tempsw-2);  

	});	

	$('#edit-lang').bind('change', function(){
	if ($('#edit-lang option:selected').val() == 'init')
	{
		$('#xttranslate-lang-submit').attr("disabled","disabled");
		$('#xttranslate-search-button').attr("disabled","disabled"); 
		$('#xttranslate-clearsearch').attr("disabled","disabled"); 
	}
	else
	{
		$('#xttranslate-lang-submit').removeAttr("disabled");
		$('#xttranslate-search-button').removeAttr("disabled");
		$('#xttranslate-clearsearch').removeAttr("disabled");

	}

	});


	$('#edit-version').bind('change', function() {
		version = $('#edit-version option:selected').val();
	});
	
  $('#xttranslate-lang-submit:not(.xttranslate-processed)').addClass('xttranslate-processed')
  .bind('click', function(){

	lang_temp = $('#edit-lang option:selected').val();
	lang_temp = lang_temp.split(':');

	language_code = lang_temp[0];
	country_code = lang_temp[1];

  version = $('#edit-version option:selected').val();  

	before_slice = 0;
	after_slice = 0;
	page_slice = 0;

	search = 0;
	replace = 0;
	newcontext = 0;      
     keepOffset = 0;
     cindex = 1;
     rindex = 1;
     sindex = 0;
     tindex = 1;
     end_of_sources = 0;  

	$('#xttranslate-find-button').removeAttr("disabled");
     $('#xttranslate-find-next').removeAttr("disabled");
     $('#xttranslate-tsubmit-button').removeAttr("disabled");
     $('#xttranslate-all-button').removeAttr("disabled");

    //$.get('/xttranslate/context/' + lang_temp[0] + '/' + lang_temp[1], null, showContext);
    $.post('/xttranslate/context/',{lang:lang_temp[0],country:lang_temp[1],version:version}, showContext);
	  allow_search = 1;
    return false;
  });

	// Ajax activity indicator bound 
	// to ajax start/stop document events
	$(window).ajaxStart(function(){ 
		$('#xttranslate-ajaxBusy').show(); 

	}).ajaxStop(function(){ 
	$('#xttranslate-ajaxBusy').hide();

	});

	if ( $('#xttranslate-search-context').attr('checked') == true)
	{
		$('#xttranslate-search-source').attr("disabled","disabled");
		$('#xttranslate-search-translation').attr("disabled","disabled");
		
	}
	else
	{
		$('#xttranslate-search-source').removeAttr("disabled");
		$('#xttranslate-search-translation').removeAttr("disabled");
	}
	

	if ( $('#xttranslate-search-source').attr('checked') == true || $('#xttranslate-search-translation').attr('checked') == true )
	{
		$('#xttranslate-search-context').attr("disabled","disabled");	
	}
	else
	{
		$('#xttranslate-search-context').removeAttr("disabled");
	}

	
	//code is in xttranslate.translation.js		
	$('#xttranslate-all-button').click( function () {
		search = 1;
	});

	$('#xttranslate-find-button').click( function () {
	if (lang_temp[1] != undefined)
	{ 
	
		search = 1;
		sindex = 0;
	        tindex = 1;
        	rindex = 1;
		cindex = 1;
		newcontext = 0;
		keepOffset = 0;

		before_slice = 0;
     		after_slice = 0;
     		page_slice = 0;

		searchitem = $('#xttranslate-find-term').val();
		searchitem = searchitem.replace(/&/g, '');

		//default
		searchtype = 'both';

		if (searchitem != '')
		{
	          	//$.get('/xttranslate/default/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, searchSetup);
			
			$.post("/xttranslate/default/search/", { term: searchitem, version:version, language: language_code, country: country_code, slice: page_slice }, searchSetup );
			max_size = max_contexts;
		}
		else
		{
			$('#xttranslate-warning').html('<b>Please enter a keyword first.</b>');
		}

	}
		
	});

	$('#xttranslate-find-next').click( function () {
	if (lang_temp[1] != undefined)
	{ 

		search = 1;

		searchitem = $('#xttranslate-find-term').val();
		searchitem = searchitem.replace(/&/g, '');

		//searchreplace = $('#xttranslate-replace-term').val();
		//searchreplace = searchreplace.replace(/&/g, '');
		
		//searchitem = encodeURIComponent( searchitem );              
          	//alert (searchitem);
		//alert(searchreplace);
		searchtype = 'both';
		//default
		if (search_contextids == null && keepOffset == 0)
		{
			if (searchitem != '')
			{
          		//$.get('/xttranslate/default/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + page_slice, null, searchSetup);
			$.post("/xttranslate/default/search/", { term: searchitem, version:version, language: language_code, country: country_code, slice: page_slice }, searchSetup );
				max_size = max_contexts;
			}
			else
			{
				$('#xttranslate-warning').html('<b>Please enter a keyword first.</b>');
			}
		}
		
		var temp_arr = new Array();

		if (search_contextids != null && keepOffset == 0)
		{
			var i = 0;
			for (var x in search_contextids)
			{
				temp_arr[i] = search_contextids[x];
				i++;
			}	
			contextArray = temp_arr;
			keepOffset = 1;
		}
		//var test = jQuery.makeArray( $('#xttranslate-view-source-table') );

		//alert(test);
		
		if (keepOffset == 1)
		{
			if (contextArray.length > 0)
			{
				//alert( contextArray.shift() );
				if (newcontext == 0)
				{
					if (end_of_sources == 1)
					{
						contextArray.shift();
						temp_contextid = contextArray.shift();
					}
					else
					{
						temp_contextid = contextArray.shift();
					}

					//alert(temp_contextid);
					//if ( $('#xttranslate-context-table tr').hasClass("shaded")) { $('#xttranslate-context-table tr').removeClass("shaded"); }
					//$('#xttranslate-context-table tr').eq(cindex).toggleClass("shaded");
					showSearchSources(search_sources, temp_contextid, search_consources, search_matchsource, search_translations);
					newcontext = 1;
					tlength = $('#xttranslate-view-source-table tr').length;
					sindex = 0;
					tindex = 1;
					rindex = 1;
					//alert ("first source row test, rindex might be " + getSourceTableIndex()  );
				}

				//evens are sources, odds are translations
				//alert ( "table length is " + $('#xttranslate-view-source-table tr').length );
				//alert( $('#xttranslate-view-source-table td').eq(0).html() );
			
				//loop through contents of the source/translation table
				if (newcontext == 1)
				{
					//if (newsource == 0)
					//{
						//alert("after find next, sindex: " + sindex + " tindex: " + tindex);

					var ts = $('#xttranslate-view-source-table td:eq(' + sindex + ')').html();
					var tt = $('#xttranslate-view-source-table td:eq(' + tindex + ')').html();
						//alert("in newcontext == 1, ts is " + ts + " and tt is " + tt);
						//alert (ts);
					if ( $('#xttranslate-context-table tr').hasClass("shaded")) { $('#xttranslate-context-table tr').removeClass("shaded"); }
					if ( $('#xttranslate-view-source-table tr').hasClass("shaded")) { $('#xttranslate-view-source-table tr').removeClass("shaded"); }
						//alert("in newcontext == 1, cindex is " + cindex);
					if (cindex != 0)
					{
						$('#xttranslate-context-table tr:eq(' + cindex + ')').toggleClass("shaded");
					}
					if (rindex != 0)
					{
						$('#xttranslate-view-source-table tr:eq(' + rindex + ')').toggleClass("shaded");
					}

					var tcid = find_consourceid( ts, temp_contextid );
					nextSource(tcid, ts, tt);
					
					//alert("in newcontext == 1, tlength is " + tlength + " cindex is " + cindex);
					if (tlength <= 1)
					{
						//alert ("in tlength less than, tlength is " + tlength);
						newcontext = 0;
						cindex++;
					}
					//while (var row in $('#xttranslate-view-source-table tr'))
					//{
					//	alert(row);
					//}					
				end_of_sources = 0;
						
				}


			}
			else
			{
				//alert('length 0');
				keepOffset = 0;
				sindex = 0;
                   		tindex = 1;
                    		rindex = 1;
				cindex = 1;
				
				//if (page_slice != 0)
				//{
					page_slice = (page_slice+15 > max_contexts) ? 0 : page_slice+15;
				//}

				var new_page = page_slice;
				//$.get('/xttranslate/default/search/' + searchitem + '/' + language_code + '/' + country_code + '/' + new_page, null, searchSetup);
				$.post("/xttranslate/default/search/", { term: searchitem, version:version, language: language_code, country: country_code, slice: page_slice }, searchSetup );
			}
		}
	
		//var x = jQuery.makeArray(search_contextids);
		//var s = jQuery.makeArray( x.shift() );

		//call new function
				
	}
		
	});

	
} //end of drupal behavior


function find_consourceid(source, contextid)
{
	source = source.replace(/amp;/g, '');
	source = source.replace(/<\/?[^>]+>/gi, '');

	for (var x in search_matchsource)
	{
		if (search_matchsource[x] == contextid)
		{
			var tmp_source = search_sources[x];
			tmp_source = tmp_source.replace(/<\/?[^>]+>/gi, '');

			//tmp_source = tmp_source.replace(/\\x26/g, '');
			//alert("In find_consourceid, tmp_source before replace is " + tmp_source + ", source is " + source);
			if( tmp_source == source )
			{
				return x;
			}
		}
	}
	//alert("not found: source is " + source + " contextid is " + contextid + " tmp_source is " + tmp_source);
	return 0;
}

function find_contextid_index(c_array, c_id)
{
	for (var x in c_array)
	{
		if (c_array[x] == c_id)
		{
			return x;
		}
	}
	return 0;
}

var showContext = function(data) {

	//alert(language_code);
 $('#edit-translation').empty();
 $('#xttranslate-warning').empty();	
 $('#xttranslate-suggest-box').empty();
 $('#xttranslate-display-source').empty();
 
  var result = Drupal.parseJson(data);
	max_size = result['max'];	
	var percent_done = result['complete'];
	$('#xttranslate-completed').empty();
	$('#xttranslate-completed').html('Completed: ' + percent_done[0] + ' sources finished, ' + percent_done[1] + ' total, ' + percent_done[2] + '%');
	/*
	$('#xttranslate-context').resizable( { containment: '#xttranslate-main', alsoResize: '#xttranslate-right',
		resize: function(event, ui) {
		
		if (ui.originalSize['width'] < ui.size['width'] )
		{
			//window grew
			var currwidth = ui.size['width'] - current_width;
			//var css = $('#xttranslate-main').width() - ui.size['width'];
			var sourcemargin = parseInt($('#xttranslate-view-source').css( 'margin-left' ));
			var css = Math.abs(Number(sourcemargin) + Number(currwidth));
			var sourcewidth = parseInt( $('#xttranslate-view-source').width() );
			sourcewidth = sourcewidth-current_width;
			$('#xttranslate-view-source').width(sourcewidth);
			//alert(css);
			//var css = ui.position['left'] +
			css = css + 'px';
			current_width = ui.size['width'];
			//alert( sourcemargin );

			
		}
		if (ui.originalSize['width'] > ui.size['width'] )
		{
			//window shrank
			var currwidth = ui.originalSize['width'] - ui.size['width'];
			//var css = $('#xttranslate-main').width() - ui.size['width'];
			//var sourcemargin = $('#xttranslate-view-source').offset();
			var sourcemargin = parseInt($('#xttranslate-view-source').css( 'margin-left' ));
			var css = Math.abs(sourcemargin - currwidth);
			css = css + 'px';

		}		
		//var nextwidth = $('#xttranslate-view-source-table').width()
		//alert(ui.originalSize['width']);
		//alert (sourcemargin.left);

		//$('#xttranslate-view-source').width( currwidth );

		$('#xttranslate-right').css( { 'width' : css } );
		//$('#xttranslate-view-source-table').width( currwidth );
		}, 
		start: function(event, ui) {
			//current_width = ui.originalSize['width'];		
		},
		stop: function(event, ui) {
			//current_width = ui.size['width'];		
		}
			
	 });
*/	
	
	$('#xttranslate-context-table tbody').empty();
	$('#xttranslate-view-source-table tbody').empty();
	$.each( result['items'], function(strIndex, objValue) {
		//alert (objValue);
		var contextid = result['contextids'][strIndex];
		var cellid = 'xttranslate-cid-' + contextid;
		$('#xttranslate-context-table').append( "<tr id='" + cellid + "'><td>" + strIndex + "</td><td>" + objValue + "</td></tr>");

	  	cellid = '#' + cellid + ':not(.xttranslate-processed)';
		$(cellid).addClass('xttranslate-processed')
  		.bind('click', function(){

		 $('#xttranslate-warning').empty();	
		/*		
		if (search == 1)
		{
			var i = 0;
			var temp_arr = new Array();

			var my_cid = this.id.split('-');
			my_cid = my_cid[2];
			//alert(my_cid);
          	for (var x in search_contextids)
          	{
          		temp_arr[i] = search_contextids[x];
               	i++;
          	}
               contextArray = temp_arr;
			var index = find_contextid_index(contextArray, contextid);
			contextArray = temp_arr.slice(index, temp_arr.length);
			newcontext = 0;
		}
		*/

   	 	//$.get('/xttranslate/source/' + language_code + '/' + country_code + '/' + contextid, null, showSource);
			$.post('/xttranslate/source/', {lang:language_code,country:country_code,cid:contextid,version:version}, showSource);		

     	//foo = new ScrollableTable(document.getElementById('xttranslate-view-source-table'), q, 80);

	//var y = document.getElementById('xttranslate-view-source').offsetHeight;
	//var x = document.getElementById('xttranslate-view-source').offsetWidth;

	//$('#xttranslate-view-source-table').scrollable({tableWidth:x, tableHeight:y});	



    		return false;
  		});



	} );


	

	//var context_width = $('#xttranslate-context-table').width();
	//var source_table_width = $('xttranslate-view-source-table').width();
	//$('xttranslate-view-source-table').width(source_table_width - context_width);

		
	var y = document.getElementById('xttranslate-context').offsetHeight;
	var x = document.getElementById('xttranslate-context-table').offsetWidth;
	//var f = new ScrollableTable(document.getElementById('xttranslate-context-table'), y, x);
	
	
	//$('#xttranslate-context-table').scrollable({tableWidth:x, tableHeight:y});
	var tempw = $('#xttranslate-context').width();
	tempw = x-tempw;
	var tempsw = $('#xttranslate-right').width() - tempw;
	
	$('#xttranslate-context').width(x);
	$('#xttranslate-right').width(tempsw);

	
	//$('#xttranslate-context-table tr').mouseover( function() original

	$('#xttranslate-context-table tr').click( function()
	{
		if ( $('#xttranslate-context-table tr').index(this) != 0) 
          {                

			if ( $('#xttranslate-context-table tr').hasClass("shaded")) { $('#xttranslate-context-table tr').removeClass("shaded"); }

			//toggleClass("white");
			$(this).toggleClass("shaded");
		}
	});

	$('#xttranslate-context-table tr').mouseover( function()
     {
		if ( $('#xttranslate-context-table tr').index(this) != 0)
          {
     		$(this).toggleClass("orange");     
		}
     }).mouseout( function()
     {
     	if ( $('#xttranslate-context-table tr').index(this) != 0)
          {
			$(this).toggleClass("orange");              
		}
     });

	
	


	//$('#xttranslate-context-table').fadeIn('slow');
  //$('div.field-type-image div.field-item').html(result['image']);
  //$('#xttranslate-context').hide().fadeIn('slow').html(result['contexts']);
  //$('#xttranslate-items').html(result.items);
		if (search == 1)
		{
			var counter = 0;
	          for (var props in result['items']) {
     	          counter++;
          	}

			if (page_slice == 0)
        		{
				var result = (max_size == 1) ? "result" : "results";

          		$('#xttranslate-context-pages').html('Contexts: 0 to ' + counter + ', ' + max_size + ' ' + result);
        		}
        		else
        		{
          		var after = page_slice+counter;
                	$('#xttranslate-context-pages').html('Contexts: ' + page_slice + ' to ' + after + ', ' + max_size + ' ' + result);
     		}
			
		}
		else
		{
			if (page_slice == 0)
			{
				$('#xttranslate-context-pages').html('Contexts: 0 to 14 of ' + max_size + ' total');
			}
			else
			{
				var after = page_slice+14;
				$('#xttranslate-context-pages').html('Contexts:' + page_slice + ' to ' + after + ' of ' + max_size + ' total');			
			}
		}

	
}

var maketable = 0;
var showSource = function(data) {

	 $('#xttranslate-suggest-box').empty();
	 $('#xttranslate-display-source').empty();

	var sourceresult = Drupal.parseJson(data);
	$('#xttranslate-view-source-table tbody').empty();
	$.each( sourceresult['sources'], function(strIndex, objValue) {
	var transid = sourceresult['consources'][strIndex];
	//var transid = objValue;
	//var transid = strIndex;
	$('#xttranslate-tconsource').val('');
	$('#xttranslate-view-source-table').append( "<tr><td>" + strIndex + "</td><td>" + objValue + "</td></tr>");
		$('#xttranslate-view-source-table tr:not(.xttranslate-processed)').addClass('xttranslate-processed')
  		.bind('click', function(){
		 $('#xttranslate-warning').empty();
		//alert(transid);
		$('#xttranslate-display-source').html(strIndex);	
		$('#edit-translation').empty();	
		$('#edit-translation').html( objValue );
		$('#edit-translation').val( objValue );			
		//alert( $('#edit-translation').val() );
		$('#xttranslate-tconsource').val(transid);
		//alert($('#xttranslate-tconsource').val());

		var sourcesuggest = strIndex.replace(/&/g, '');
    sourcesuggest = sourcesuggest.replace(/<\/?[^>]+(>|$)/g, "");
		//sourcesuggest = sourcesuggest.replace(/ /g, ' & ');
		
		//alert (sourcesuggest);
   	 	//$.get('/xttranslate/suggest/' + language_code + '/' + country_code + '/' + sourcesuggest, null, showSuggestions);
	    	$.post("/xttranslate/suggest/", { suggest: sourcesuggest, language: language_code, country: country_code }, showSuggestions );
		return false;

		});

		
     	//x = x-20;
     	//y = y-20;            
     	//alert (x);
     	//var t = new ScrollableTable(document.getElementById('xttranslate-view-source-table'), y, 80);
	//if (maketable == 0)
	//{
		//$('#xttranslate-view-source-table').scrollable();	
		//maketable = 1;
	//}

		
	
	});

	$('#xttranslate-view-source-table').serialScroll({
		items:'tr',
		next:'#xttranslate-find-next',
		force:true,
		stop:true,
		interval:1,
		lock:false,
		lazy:true
	});


 	$('#xttranslate-view-source-table tr').click( function()
     {
		if ($('#xttranslate-view-source-table tr').index(this) != 0)
          {
          	 if ( $('#xttranslate-view-source-table tr').hasClass("shaded")) { $('#xttranslate-view-source-table tr').removeClass("shaded"); }

          	//toggleClass("white");
          	$(this).toggleClass("shaded");
		}
     });

	
	$('#xttranslate-view-source-table tr').not('[th]').mouseover( function()
	{
		if ($('#xttranslate-view-source-table tr').index(this) != 0)
          {
			$(this).toggleClass("orange");
		}
	}).mouseout( function()
	{
		if ($('#xttranslate-view-source-table tr').index(this) != 0)
          {
			$(this).toggleClass("orange");
		}
	});

}


var showSuggestions = function(data)
{
	var result = Drupal.parseJson(data);
	$('#xttranslate-suggest-box').empty();

	$.each( result['suggestions'], function (strIndex, objValue) {
		$('#xttranslate-suggest-box').append("<span>" + objValue + "</span>").append("<br>");
	});
	
	$('#xttranslate-suggest-box span').bind( 'click', function ()
	{
		$('#edit-translation').empty();
		$('#edit-translation').html( $(this).text() );
		$('#edit-translation').val( $(this).text() );
	});

	$('#xttranslate-suggest-box span').mouseover( function()
	{
		$(this).toggleClass("orange");
	}).mouseout( function()
	{
		$(this).toggleClass("orange");
	});

}

function make_new_contextArray( my_cid )
{
	var temp_arr = new Array();

	for (var x in search_contextids)
     {
     	temp_arr[i] = search_contextids[x];
          i++;    
     }
     contextArray = temp_arr;
     var index = 0;  
     index = find_contextid_index(contextArray, my_cid);
     //alert (index);         
     var end = contextArray.length-1;
     contextArray = jQuery.makeArray( contextArray.slice(index, end) );
}

var searchSetup = function(data) {

        //alert(language_code);
 $('#edit-translation').empty();
 $('#xttranslate-warning').empty();
 $('#xttranslate-suggest-box').empty();
 $('#xttranslate-display-source').empty();
 
  var result = Drupal.parseJson(data);
        max_size = result['max'];
  max_contexts = result['max_contexts'];

	   sources = result['sources'];
	   consources = result['consources'];
	   matchsource = result['match_source'];
	   translations = result['translations'];

	   search_sources = sources;
	   search_consources = consources;
        search_matchsource = matchsource;
        search_translations = translations;
        search_contexts = result['contexts'];
	   search_contextids = result['contextids'];

		var counter = 0;
		for (var props in result['items']) {
         	     counter++;
 		}

		//alert( counter );
        var percent_done = result['complete'];
        $('#xttranslate-completed').empty();
        $('#xttranslate-completed').html('Completed: ' + percent_done[0] + ' sources finished, ' + percent_done[1] + ' total, ' + percent_done[2] + '%');
        $('#xttranslate-context-table tbody').empty();
        $('#xttranslate-view-source-table tbody').empty();
	var firstcontextid = '';

        $.each( result['items'], function(strIndex, objValue) {
                if (firstcontextid == '')
		{
			firstcontextid = result['contextids'][strIndex];
		}
                var contextid = result['contextids'][strIndex];
                var cellid = 'xttranslate-cid-' + contextid;
                $('#xttranslate-context-table').append( "<tr id='" + cellid + "'><td>" + strIndex + "</td><td>" + objValue + "</td></tr>");

                cellid = '#' + cellid + ':not(.xttranslate-processed)';
                $(cellid).addClass('xttranslate-processed')

                .bind('click', function(){
			
                 $('#xttranslate-warning').empty();

			if (search == 1)                     
               {
              	   	var i = 0;              
               	var temp_arr = new Array();

               	var my_cid = this.id.split('-');   
               	my_cid = my_cid[2];
               	//alert(my_cid);
               	for (var x in search_contextids)
               	{
                    	temp_arr[i] = search_contextids[x];
                    	i++;
               	}
               	contextArray = temp_arr;
				var index = 0;
               	index = find_contextid_index(contextArray, my_cid);
				//alert (index);
				var end = contextArray.length-1;
               	contextArray = jQuery.makeArray( contextArray.slice(index, end) );
               	newcontext = 0;
				keepOffset = 1;
				cindex = parseInt(index) + 1;
				end_of_sources = 0;
				//alert ("in searchsetup, cindex is " + cindex);
          	}

                showSearchSources(sources, contextid, consources, matchsource, translations);
 
                return false;
                });

		//showSearchSources(sources, firstcontextid, consources, matchsource, translations);

        } );

	$('#xttranslate-view-source-table').serialScroll({
		items:'tr',
		next:'#xttranslate-find-next',
		force:true,
		stop:true,
		interval:1,
		lock:false,
		lazy:true
	});


        var y = document.getElementById('xttranslate-context').offsetHeight;
        var x = document.getElementById('xttranslate-context-table').offsetWidth;
        
        var tempw = $('#xttranslate-context').width();
        tempw = x-tempw;
        var tempsw = $('#xttranslate-right').width() - tempw;

        $('#xttranslate-context').width(x);
        $('#xttranslate-right').width(tempsw);


        

        $('#xttranslate-context-table tr').click( function()
        {
                 //if ( $(this).hasClass("shaded")) { $(this).removeClass("shaded"); }
			
			if ( $('#xttranslate-context-table tr').index(this) != 0)
			{
				//alert($('#xttranslate-context-table tr').index(this));
				if ( $('#xttranslate-context-table tr').hasClass("shaded")) { $('#xttranslate-context-table tr').removeClass("shaded"); }
               	 //toggleClass("white");
                	$(this).toggleClass("shaded");
			}
        });

        $('#xttranslate-context-table tr').not('[th]').mouseover( function() 
	   {   
			if ( $('#xttranslate-context-table tr').index(this) != 0)
               {
        			$(this).toggleClass("orange");      
			}
        }).mouseout( function()   
        {   
			if ( $('#xttranslate-context-table tr').index(this) != 0)
               {
          		$(this).toggleClass("orange");      
			}
        });   

	   var result = (max_size == 1) ? "result" : "results";
         var c = (max_size == 1) ? "context" : "contexts";

        if (page_slice == 0)
        {
        	$('#xttranslate-context-pages').html('Contexts: 0 to ' + counter + ', ' + max_size + ' ' + result + ' in ' + max_contexts + ' ' + c);
        }
        else
        {
        	var after = page_slice+counter;
                $('#xttranslate-context-pages').html('Contexts: ' + page_slice + ' to ' + after + ', ' + max_size + ' results in ' + max_contexts + ' ' + c);
	}

}


function showSearchSources (sources, contextid, consources, matchsource, translations) {

         $('#xttranslate-suggest-box').empty();
         $('#xttranslate-display-source').empty();
		//alert ("showSearchSources called");
        //alert(matchsource);
        $('#xttranslate-view-source-table tbody').empty();
        $.each( sources, function(strIndex, objValue) {
	
	   if (matchsource[strIndex] == contextid)
	   {
			var transid = strIndex;
        		$('#xttranslate-tconsource').val('');
        		$('#xttranslate-view-source-table').append( "<tr><td>" + objValue + "</td><td>" + translations[strIndex] + "</td></tr>");
               $('#xttranslate-view-source-table tr:not(.xttranslate-processed)').addClass('xttranslate-processed').not('[th]')
               .bind('click', function(){
			
			if ($('#xttranslate-view-source-table tr').index(this) != 0)
               {
                 	$('#xttranslate-warning').empty();
        			//alert(transid);

                	$('#xttranslate-display-source').html(objValue);
                	$('#edit-translation').empty();
                	$('#edit-translation').html( translations[strIndex] );
                	$('#edit-translation').val( translations[strIndex] );
                	//alert( $('#edit-translation').val() );
                	$('#xttranslate-tconsource').val(transid);

				//if ( $(this).hasClass("shaded")) 
				//{ 
					var i = $('#xttranslate-view-source-table tr').index(this);
					sindex = i + i;
					tindex = (i+1) + i;	
					rindex = i+1;
					tlength = $('#xttranslate-view-source-table tr').length - i;
					/*
					if (newcontext == 0 && tlength == 1)
					{
						cindex--;
					}
					*/
					newcontext = ( parseInt(tlength) == 1) ? 0 : 1;
					if ( parseInt(tlength) == 1)
					{
						cindex++;
						end_of_sources = 1;
						make_new_contextArray(contextid);
					}
					else
					{
						end_of_sources = 0;	
					}

					//alert( "in showSearchSources, sindex is " + sindex + " tindex is " + tindex + " rindex is " + rindex + " tlength is " + tlength + " cindex is " + cindex + " newcontext is " + newcontext);
					//alert("sindex: " + sindex + " tindex: " + tindex);
					//alert( $('#xttranslate-tconsource').val() );
				//}


                	var sourcesuggest = objValue.replace(/&/g, '');

                	//alert (sourcesuggest);
                	//$.get('/xttranslate/suggest/' + language_code + '/' + country_code + '/' + sourcesuggest, null, showSuggestions);
                	$.post("/xttranslate/suggest/", { suggest: sourcesuggest, language: language_code, country: country_code }, showSuggestions );
			return false;
			}

               });
		}
	
        });

	$('#xttranslate-view-source-table').serialScroll({
		items:'tr',
		next:'#xttranslate-find-next',
		force:true,
		stop:true,
		interval:1,
		lock:false,
		lazy:true
	});


        $('#xttranslate-view-source-table tr').click( function()
     {
		if ($('#xttranslate-view-source-table tr').index(this) != 0)
		{     
      		if ( $('#xttranslate-view-source-table tr').hasClass("shaded")) { $('#xttranslate-view-source-table tr').removeClass("shaded"); }
		

          	//toggleClass("white");
          	$(this).toggleClass("shaded");
		}
     });


        $('#xttranslate-view-source-table tr').not('[th]').mouseover( function()
        {
			if ($('#xttranslate-view-source-table tr').index(this) != 0)                  
          	{
               	 $(this).toggleClass("orange");
			}
        }).mouseout( function()
        {
			if ($('#xttranslate-view-source-table tr').index(this) != 0)                  
          	{
                	$(this).toggleClass("orange");
			}
        });

}


function next_result(contextid, source, consourceid, translation)
{

	//$.each(temp_contexts, function(strIndex, objValue) {
	if (newcontext == 1)
	{
		nextSource(consourceid, source, translation);
	}
		
	//});
}

function nextSource(consourceid, source, translation)
{
	$('#xttranslate-warning').empty();

     $('#xttranslate-display-source').html(source);
     $('#edit-translation').empty();
     $('#edit-translation').html( translation );
     $('#edit-translation').val( translation );
     $('#xttranslate-tconsource').val(consourceid);

	//alert ("in nextSource, consourceid is" + $('#xttranslate-tconsource').val() );
     //alert ("in nextSource, edit-translation is " + $('#edit-translation').val() );
     //var sourcesuggest = encodeURI( source.replace(/&/g, '') );
     var sourcesuggest = source.replace(/&/g, '');

     //$.get('/xttranslate/suggest/' + language_code + '/' + country_code + '/' + sourcesuggest, null, showSuggestions);
	$.post("/xttranslate/suggest/", { suggest: sourcesuggest, language: language_code, country: country_code }, showSuggestions );
	newsource = 1;
	tlength = tlength - 1;
	sindex = sindex + 2;
	tindex = tindex + 2;
	rindex++;

     return false;
	
}

