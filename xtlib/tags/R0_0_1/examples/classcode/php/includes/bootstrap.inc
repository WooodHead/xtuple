<?php

/**
 * bootstrap.inc
 */

/**
 * safe globals
 */
global $js;
global $css;
global $title;
global $baseurl;
global $basepath;
global $currenturl;

/**
 * definitions
 */

//bootstrap types
define('BOOTSTRAP_FULL',0);

//other
define('DEFAULT_PAGE','select database');

function bootstrap($type=null) {
    if(is_null($type)) error('No type specified during bootstrap');
    setup();
    switch($type) {
        case BOOTSTRAP_FULL:
            handle_url();
            break;
        default:
            error('No bootstrap type matched "'.$type.'"');
            break;
    }
}

function sessioner($action=null) {
  switch($action) {
      case 'start':
        session_start();
        break;
      case 'end':
        $xtdb = xtDatabase::getInstance();
        if(!$xtdb->isOpen()) error('Trying to end session but database was not even open');
        $xtdb->close();
        session_destroy();
        break;
      default:
        error('Could not determine requested action for sessioner');
        break;
  }
}

function setup() {
    sessioner('start');
    inc('class');
    inc('inc');
    set_globals();
    dbsetup();
}

function dbsetup() {
  if(empty($_SESSION['dbconnectstring'])) return false;
  $xtdb = xtDatabase::getInstance();
  $xtdb->open($_SESSION['dbconnectstring']);
  if(!$xtdb->isOpen()) error('Database connection error "'.$xtdb->lastErrorString().'"');
}

function set_globals() {
    global $js, $css, $title, $baseurl, $basepath, $cjs;
    set_paths();
    $js = '<script type="text/javascript" lang="javascript" src="'.$baseurl.'/theme/js/jquery.js"></script>'."\n";
    $js .= '<script type="text/javascript" lang="javascript" src="'.$baseurl.'/theme/js/jquery-ui.js"></script>'."\n";
    $js .= '<script type="text/javascript" lang="javascript" src="'.$baseurl.'/theme/js/default.js"></script>'."\n";
    $cjs = '<script type="text/javascript" lang="javascript">var baseurl = \''.$baseurl.'\';</script>';
    $css = '<link rel="stylesheet" type="text/css" href="'.$baseurl.'/theme/css/ui-darkness/jquery-ui-1.8.8.custom.css" />'."\n";
    $css .= '<link rel="stylesheet" type="text/css" href="'.$baseurl.'/theme/css/default.css" />'."\n";
    $title = 'example | ';
}

function set_paths() {
    // this is not 100% reliable
    // but avoids manually configuring in most cases!
    global $baseurl, $basepath;
    $pwd = getcwd();
    $rroot = $_SERVER['DOCUMENT_ROOT'];
    $cbase = substr($pwd,strlen($rroot),strlen($pwd));
    $baseurl = $cbase;
    $basepath = $pwd;
}

function error($msg=null) {
    if(!is_array($msg))
        die('Error: '.$msg);
    else
        die('Error: '.print_r($msg,true));
}

function handle_url() {
    global $currenturl;
    // detect if this is a form request
    handle_form_submit();
    $parts = get_url_parts();
    $base = preg_replace('/\W/','-',$parts[0]);
    $currenturl = $base;
    exec_page($base,$parts);
}

function handle_form_submit() {
  $p = $_POST;
  if(!is_array($p) || count($p) <= 0)
    return;
  // we have form data being submitted
  // pass it to the requested form handler
  $func = $p['form-handler'];
  if(is_registered($func) && function_exists($func))
    $func($p);
}

function exec_page($base=null,$parts=array()) {
    global $title, $cjs, $currenturl;
    $title .= $base."\n";
    load('header','thtml');
    load($base,'thtml',$parts);
    load('footer','thtml');
}

function load($name=null,$type=null,$parts=null) {
    global $css, $js, $title, $baseurl, $basepath, $cjs, $currenturl;
    switch($type) {
        case 'thtml':
            include_once('theme/html/'.$name.'.thtml');
            break;
        default:
            error('Unknown load type');
            break;
    }
}

function get_url_parts() {
    if(empty($_GET['q'])) return array(DEFAULT_PAGE);
    if(false === (strpos($_GET['q'],'/'))) return array($_GET['q']);
    $tmp = explode('/',$_GET['q']);
    if(is_null($tmp[count($tmp)-1]) || empty($tmp[count($tmp)-1]))
        unset($tmp[count($tmp)-1]);
    return $tmp;
}

function inc($filetype=null) {
    if(is_null($filetype)) return false;     
    $dir = @opendir('includes');
    if(!$dir) error('Could not open includes directory');
    while(false !== ($file = @readdir($dir))) {
        if(preg_match('/.*\.'.$filetype.'$/',$file) != 0)
            include_once('includes/'.$file);
    }
    closedir($dir);
    return true;
}

function register_callback($page=null,$func=null) {
  if(empty($_SESSION['callbacks'])) $_SESSION['callbacks'] = array();
  if(is_null($func) || is_null($page)) return false;
  if(!is_registered($func)) {
    $_SESSION['callbacks'][] = array('page'=>$page,'function'=>$func);
  }
  return true;
}

function is_registered($func=null) {
  if(is_null($func)) return false;
  $regs = $_SESSION['callbacks'];
  if(!is_array($regs) || count($regs) <= 0) return false;
  foreach($regs as $callback)
    if($callback['function'] == $func)
      return true;
  return false;
}

function redirect($location=null,$msg=null) {
  global $baseurl, $currenturl;
  $url;
  if(is_null($location))
    $url = $baseurl.'/'.$currenturl;
  else $url = $baseurl.'/'.$location;
  if(!is_null($msg)) {
    if(!is_array($_SESSION['redirect_message'])) $_SESSION['redirect_message'] = array();
    $_SESSION['redirect_message'][] = $msg;
  }
  header('location:'.$url);
  exit;
}

function set_message($msg=null) {
  if(!is_array($_SESSION['redirect_message'])) $_SESSION['redirect_message'] = array();
  $_SESSION['redirect_message'][] = $msg;
}

function get_messages() {
  if(is_array($_SESSION['redirect_message'])) {
    load('redirect-message','thtml',$_SESSION['redirect_message']);
    unset($_SESSION['redirect_message']);
  }
}

function known($which=null) {
  if(is_null($which)) return false;
  return in_array($which,array_keys($_SESSION));
}
?>
