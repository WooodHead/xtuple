<?php

// Set up some server variables that are needed to
// bootstrap the correct drupal site.
$_SERVER['HTTP_HOST'] = "www.xtuple.org";
$_SERVER['PHP_SELF'] = basename(__file__);
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';

// Bootstrap drupal
include_once '/usr/local/apache2/htdocs/openmfginfo/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

//perform tasks as translationexport user
global $user;
$user = user_load(array('uid' => 44960));

$language_code = $_REQUEST['lc'];	
$country_code = $_REQUEST['cc'];

module_invoke('xttranslate', 'gui_export', "xTuple", $language_code."_".$country_code, "current");

?>
