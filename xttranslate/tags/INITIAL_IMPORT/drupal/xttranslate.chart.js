/*
AC_FL_RunContent = 1;
DetectFlashVer = 1;
var requiredMajorVersion = 9;    
var requiredMinorVersion = 0;    
var requiredRevision = 45;
*/

Drupal.behaviors.xttranslatechart = function() {
/*
$.getScript("/sites/default/files/xttranslate/charts/AC_RunActiveContent.js");
if (AC_FL_RunContent == 0 || DetectFlashVer == 0) {
     alert("This page requires AC_RunActiveContent.js.");
} else {
     var hasRightVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
     if(hasRightVersion) {
          AC_FL_RunContent(                  
               'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0',
               'width', '400',
               'height', '480',
               'scale', 'noscale',
               'salign', 'TL',
               'bgcolor', '#DDEDF7',
               'wmode', 'opaque',
               'movie', 'charts',
               'src', 'charts',
               'FlashVars', 'library_path=charts_library&xml_source=sample.xml',
               'id', 'my_chart',
               'name', 'my_chart',
               'menu', 'true',
               'allowFullScreen', 'true',
               'allowScriptAccess','sameDomain',
               'quality', 'high',
               'align', 'middle',
               'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
               'play', 'true',
               'devicefont', 'false'
               );
     } else {
          var alternateContent = 'This content requires the Adobe Flash Player. '
          + '<u><a href=http://www.macromedia.com/go/getflash/>Get Flash</a></u>.';
          document.write(alternateContent);
     }
}


*/


	//$.get('/sites/default/files/xttranslate/charts/sample.html', null, showChart, 'html');
	//$('#xttranslate-chart').load('/sites/default/files/xttranslate/charts/sample.html');
	//return false;

}

showChart = function (data) {
	$('#xttranslate-langchart').text(data);
	return false;
}
