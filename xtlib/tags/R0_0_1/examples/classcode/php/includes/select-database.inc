<?php

/**
 * select-database.inc
 */

// register the form callback for this page
register_callback('select-database','select_database_form');

// select-database form handler
function select_database_form($p=null) {
  if(!is_array($p)) error('Invalid form submission for selection of database');
  if(
      (!empty($p['host']) && $p['host'] != 'hostname or ip')
      && (!empty($p['database']) && $p['database'] != 'database')
      && (!empty($p['user']) && $p['user'] != 'database user')
    ) {
    $dbstring = 'host='.$p['host'].' ';
    if(!empty($p['port']))
      $dbstring .= 'port='.$p['port'].' ';
    $dbstring .= 'user='.$p['user'].' ';
    if(!empty($p['password']))
      $dbstring .= 'password='.$p['password'].' ';
    $dbstring .= 'dbname='.$p['database'];

    $_SESSION['dbconnectstring'] = $dbstring;
    
    // test connection info
    $xtdb = xtDatabase::getInstance();
    $xtdb->open($dbstring);
    if(!$xtdb->isOpen())
      redirect('select-database','Failed to connect to database with error "'.$xtdb->lastErrorString().'"');
    else {
      $xtdb->close();
      redirect('view/all','Connected to database successfully');
    }
  }
  else
    redirect('select-database','Not all requried information was set correctly');
}

?>
