var oTable = null;
var oCache = {
	iCacheLower: -1
};
var sData = {};
var test = '';

function fnDataTablesPipeline ( sSource, aoData, fnCallback ) {
	//alert("pipelines called");
	var iPipe = 10; // Ajust the pipe size 
	
	var bNeedServer = false;
	var sEcho = fnGetKey(aoData, "sEcho");
	var iRequestStart = fnGetKey(aoData, "iDisplayStart");
	var iRequestLength = fnGetKey(aoData, "iDisplayLength");
	var iRequestEnd = iRequestStart + iRequestLength;
	oCache.iDisplayStart = iRequestStart;
	
	// outside pipeline? 
	if ( oCache.iCacheLower < 0 || iRequestStart < oCache.iCacheLower || iRequestEnd > oCache.iCacheUpper )
	{
		bNeedServer = true;
	}
	
	// sorting etc changed? 
	if ( oCache.lastRequest && !bNeedServer )
	{
		for( var i=0, iLen=aoData.length ; i<iLen ; i++ )
		{
			if ( aoData[i].name != "iDisplayStart" && aoData[i].name != "iDisplayLength" && aoData[i].name != "sEcho" )
			{
				if ( aoData[i].value != oCache.lastRequest[i].value )
				{
					bNeedServer = true;
					break;
				}
			}
		}
	}
	
	// Store the request for checking next time around 
	oCache.lastRequest = aoData.slice();
	
	if ( bNeedServer )
	{
		if ( iRequestStart < oCache.iCacheLower )
		{
			iRequestStart = iRequestStart - (iRequestLength*(iPipe-1));
			if ( iRequestStart < 0 )
			{
				iRequestStart = 0;
			}
		}
		
		oCache.iCacheLower = iRequestStart;
		oCache.iCacheUpper = iRequestStart + (iRequestLength * iPipe);
		oCache.iDisplayLength = fnGetKey( aoData, "iDisplayLength" );
		fnSetKey( aoData, "iDisplayStart", iRequestStart );
		fnSetKey( aoData, "iDisplayLength", iRequestLength*iPipe );
		
		$.getJSON( sSource, aoData, function (json) { 
			// Callback processing 
			oCache.lastJson = jQuery.extend(true, {}, json);
			
			if ( oCache.iCacheLower != oCache.iDisplayStart )
			{
				json.aaData.splice( 0, oCache.iDisplayStart-oCache.iCacheLower );
			}
			json.aaData.splice( oCache.iDisplayLength, json.aaData.length );
			
			fnCallback(json)
		} );
	}
	else
	{
		json = jQuery.extend(true, {}, oCache.lastJson);
		json.sEcho = sEcho; // Update the echo for each response 
		json.aaData.splice( 0, iRequestStart-oCache.iCacheLower );
		json.aaData.splice( iRequestLength, json.aaData.length );
		fnCallback(json);
		return;
	}
}


$.fn.dataTableExt.oApi.fnStandingRedraw = function(oSettings) {
	if(oSettings.oFeatures.bServerSide === false){
		var before = oSettings._iDisplayStart;
		oSettings.oApi._fnReDraw(oSettings);
		//iDisplayStart has been reset to zero - so lets change it back
		oSettings._iDisplayStart = before;
		oSettings.oApi._fnCalculateEnd(oSettings);
	}
	
	//draw the 'current' page
	oSettings.oApi._fnDraw(oSettings);
};

Drupal.behaviors.translate_manager = function()
{	
	  sData['tid'] = {};
		
		oTable = $('#container').dataTable( {
			"bProcessing": true,
			"bServerSide": true,
			"fnServerData": fnDataTablesPipeline,
			"sPaginationType": "full_numbers",
			"sAjaxSource": "/xttranslate/manage/list",
			"aoColumns": [
			{"sType": "string"},
			{"sType": "html"},
			{"sType": "string"},
			{"sType": "string"},
			{"sType": "string"},
			{"sType": "html", "bSortable": false}]
		});
  	refresh_footer_filters();  
		

  $('input[type=checkbox]').livequery( 'click', function() {
    if ($(this).hasClass('xttranslate-yes') || $(this).hasClass('xttranslate-no'))
		{ 
    	if ($(this).attr('checked') == true)
			{
				sData['tid'][this.id] = $(this).val();
				if ($(this).hasClass('xttranslate-yes'))
				{
					var split = this.id.split('-');
					var x = '#xttranslate-' + split[1] + '-no';
					$(x).attr('disabled', 'disabled');
				}
			
				if ($(this).hasClass('xttranslate-no'))
				{
					var split = this.id.split('-');
					var x = '#xttranslate-' + split[1] + '-yes';
					$(x).attr('disabled', 'disabled');
				}
			}
    	else if (sData != undefined && sData['tid'][this.id] != undefined)
  		{	
				delete sData['tid'][this.id];
				if ($(this).hasClass('xttranslate-yes'))
        {
          var split = this.id.split('-');
          var x = '#xttranslate-' + split[1] + '-no';
          $(x).removeAttr('disabled');
        }
        if ($(this).hasClass('xttranslate-no'))                                                                                                                                                                                
        {
          var split = this.id.split('-');
          var x = '#xttranslate-' + split[1] + '-yes';
          $(x).removeAttr('disabled');
        }
			}
		}
	});

  $('#xttranslate-yes-all').livequery( 'click', function() {
    if ($(this).attr('checked') == true)
    {
			$('.xttranslate-yes').each( function () {
				$(this).attr('checked', 'checked');
				sData['tid'][this.id] = $(this).val();  
			});
			$('.xttranslate-no').attr('disabled', 'disabled');
			$('#xttranslate-no-all').attr('disabled', 'disabled');
		}
		else
		{
			$('.xttranslate-yes').each( function () {
				$(this).removeAttr('checked');  			
				if (sData != undefined && sData['tid'][this.id] != undefined)
					delete sData['tid'][this.id]
			});
			$('.xttranslate-no').removeAttr('disabled');
			$('#xttranslate-no-all').removeAttr('disabled');
		}
  });

  $('#xttranslate-no-all').livequery( 'click', function() {
    if ($(this).attr('checked') == true)
    {
			$('.xttranslate-no').each( function () {
				$(this).attr('checked', 'checked');
				sData['tid'][this.id] = $(this).val();  
			});
			$('.xttranslate-yes').attr('disabled', 'disabled');
			$('#xttranslate-yes-all').attr('disabled', 'disabled');
		}
		else
		{
			$('.xttranslate-no').each( function () {
				$(this).removeAttr('checked');  			
				if (sData != undefined && sData['tid'][this.id] != undefined)
					delete sData['tid'][this.id]
			});
			$('.xttranslate-yes').removeAttr('disabled');
			$('#xttranslate-yes-all').removeAttr('disabled');
		}
  });

	$('#dt_example span').livequery( 'click', function () {
  	sData = {};
		sData['tid'] = {};
	});

	$('#test-button').livequery( 'click', function () {
		var code = $('#xttranslate-languages').val();
		code = code.split(":");
		var url = test + "&lang_code=" + code[0] + "&country_code=" + code[1];
		sData.language = code[0];
		sData.country = code[1];
		$.post('/xttranslate/manage/submit', { data: JSON.stringify(sData)}, function(data) {
			oTable.fnStandingRedraw();	
		});
		return false;
	});


	$('.xttranslate-user').livequery('click', function ()
	{
		var id = null;
		var nNodes = oTable.fnGetNodes();
		
		for (var i=0; i<nNodes.length; i++)
		{
			var row = false;
			
			var test = $(nNodes[i]).children('td');
				if ($(this).parents('tr').html() == $(nNodes[i]).html())
				{
						var children = $(test[5]).children();
						for (var k=1; k<children.length; k++)
						{
							var tid = children[k].id;
							var split = tid.split('-');
							id = split[1];
						}
				}			
		}
				
		$(this).editable("/xttranslate/manage/edit/submit", {
			"submitdata": function (value, settings) { return {"tid": id, "lang": lang_code, "country": country_code}; }		
		});
	});

  $('#xttranslate-languages').livequery('change', function() {
				$('#dt_example').empty();
				$('#container').empty();
				sData = {};
				sData['tid'] = {};
 				oCache = {iCacheLower: -1};

				var code = $(this).val();
				code = code.split(":");
				lang_code = code[0];
				country_code = code[1];
				var version = $('#edit-version option:selected').val();
				if (lang_code == 'init')
					return;
          var my_html = set_table();
          $('#dt_example').html(my_html);
					oTable = null;
					oTable = $('#container').dataTable( {
      			"bProcessing": true,
      			"bServerSide": true,
      			"sPaginationType": "full_numbers",
      			"sAjaxSource": "/xttranslate/manage/list/"+lang_code+"/"+country_code+"/"+version,
      			"aoColumns": [
      				{"sType": "string"},
      				{"sType": "html"},
      				{"sType": "string"},
					    {"sType": "string", "sClass": "xttranslate-user"},
      				{"sType": "string"},
      				{"sType": "html", "bSortable": false}]
    			});
    			refresh_footer_filters();
		$('.xttranslate-users').attr('style', 'cursor: pointer');
});
  $('#edit-version').livequery('change', function() {
				$('#dt_example').empty();
				$('#container').empty();
				sData = {};
				sData['tid'] = {};
 				oCache = {iCacheLower: -1};

				var code = $('#xttranslate-languages option:selected').val();
				code = code.split(":");
				lang_code = code[0];
				country_code = code[1];
				if (lang_code == undefined)
				return false;

				var version = $('#edit-version option:selected').val();
				if (lang_code == 'init')
					return;
          var my_html = set_table();
          $('#dt_example').html(my_html);
					oTable = null;
					oTable = $('#container').dataTable( {
      			"bProcessing": true,
      			"bServerSide": true,
      			"sPaginationType": "full_numbers",
      			"sAjaxSource": "/xttranslate/manage/list/"+lang_code+"/"+country_code+"/"+version,
      			"aoColumns": [
      				{"sType": "string"},
      				{"sType": "html"},
      				{"sType": "string"},
					    {"sType": "string", "sClass": "xttranslate-user"},
      				{"sType": "string"},
      				{"sType": "html", "bSortable": false}]
    			});
    			refresh_footer_filters();
		$('.xttranslate-users').attr('style', 'cursor: pointer');
});

}

function refresh_footer_filters()      
{
        asInitVals = new Array();

        $("tfoot input").keyup( function () {
                // Filter on the column (the index) of this element 
                //alert($("tfoot input").index(this));
                oTable.fnFilter( this.value, $("tfoot input").index(this) );
        } );

        //
         // Support functions to provide a little bit of 'user friendlyness' to the textboxes in
         // the footer
         //
        $("tfoot input").each( function (i) {
                asInitVals[i] = this.value;
        } );

        $("tfoot input").focus( function () {
                if ( this.className == "search_init" )
                {
                        this.className = "";
                        this.value = "";
                }
        } );

        $("tfoot input").blur( function (i) {
                if ( this.value == "" )
                {
                        this.className = "search_init";
                        this.value = asInitVals[$("tfoot input").index(this)];
                }
        } );
}


function fnSetKey( aoData, sKey, mValue )
{
	for ( var i=0, iLen=aoData.length ; i<iLen ; i++ )
	{
		if ( aoData[i].name == sKey )
		{
			aoData[i].value = mValue;
		}
	}
}

function fnGetKey( aoData, sKey )
{
	if (aoData != null)
	{
		for ( var i=0, iLen=aoData.length ; i<iLen ; i++ )
		{
			if ( aoData[i].name == sKey )
			{
				return aoData[i].value;
			}
		}
	}
	return null;
}




function set_table()
{
  var html = "<form id='xttranslate-manager-form'>"
  + "<table id='container' style='width: 100%'>"
  + "<thead><tr>"
  + "<th style='cursor: pointer'>Context</th><th style='cursor: pointer'>Source</th><th style='cursor: pointer'>Active</th><th style='cursor: pointer'>Pending</th><th style='cursor: pointer'>Submitted By</th>"
  + "<th><input id='xttranslate-yes-all' type='checkbox'>Y</input>&nbsp;&nbsp;<input id='xttranslate-no-all' type='checkbox'>N</input></th>"
  + "</tr></thead>"
  + "<tbody>"
  + "</tbody>"
  + "<tfoot>"
  + "<tr>"
  + "<th><input type='text' name='search_context' value='Context' class='search_init' /></th>"
  + "<th><input type='text' name='search_source' value='Source' class='search_init' /></th>"
  + "<th><input type='text' name='search_active' value='Active' class='search_init' /></th>"
  + "<th><input type='text' name='search_pending' value='Pending' class='search_init' /></th>"
  + "<th><input type='text' name='search_user' value='Submitted By' class='search_init' /></th>"
  + "<th></th>"
  + "</tr>"
  + "</tfoot>"
  + "</table>"
  + "<button style='float: right; clear: right' type='submit' id='test-button'>Submit</button>"
  + "</form>";

	return html;
}

