<?php

require_once('xttranslate.admin.inc');

function xttranslate_assign_manager()
{
  $db_prefix = variable_get('xttranslate_db_prefix', '');

  $languages = xttranslate_admin_get_language_display_array();
 
  //get all translator managers
  $manager_result = db_query("
  select * 
  from " . $db_prefix . "users_roles a, " . $db_prefix . "users b 
  where b.uid = a.uid and a.rid in 
  (    select rid 
       from " . $db_prefix . "role 
       where lower(\"name\") = lower('translator manager')
  )");


  $managers = array();

  while ($person = db_fetch_object($manager_result))
  {
    $managers[$person->uid] = $person->name;
  }

  foreach($languages as $key => $lang)
  {
    $split = explode(":", $key);
    $country_code = $split[1];

    $langsplit = explode(":", $lang);
    $language = $langsplit[0];

    //look up managed languages
    $managed  = db_result( db_query("select managed from " . $db_prefix . "translate_languages where language = '%s' and code = '%s'", $language, $country_code));
    $lang_query = "select id from " . $db_prefix . "translate_languages where language='%s' and code='%s'";
    $lang_id = db_result(db_query($lang_query, $language, $country_code));

    $default_managers = array();

    $default_managers_result = db_query("select uid from " . $db_prefix . "translate_managers where language_id = %d", $lang_id);
    while($default_manager = db_fetch_object($default_managers_result))
    {
      $default_managers[] = $default_manager->uid;
    }

    $fieldset_name = 'xttranslate_' . $key . '_fieldset';
    $form[$fieldset_name] = array(
      '#type' => 'fieldset',
      '#title' => t($lang),
      '#collapsible' => TRUE,
      'collapsed' => FALSE,
    );
 
    $checkbox_name = 'xttranslate_' . $key . '_checkbox';
    $form[$fieldset_name][$checkbox_name] = array(
      '#type' => 'checkbox', 
      '#title' => t('Is managed'),
      '#default_value' => ($managed != 'f') ? 1 : 0
    );
    
    $select_name = 'xttranslate_' . $key . '_select';
    $form[$fieldset_name][$select_name] = array(
      '#type' => 'select', 
      '#options' => $managers, 
      '#multiple' => TRUE, 
      '#default_value' => $default_managers,
      '#size' => 4,
      '#prefix' => '<label>Select managers</label>',
    );

  }
    
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Submit'), 
  );

  $form['#languages'] = $languages;

  return $form;

}

function xttranslate_assign_manager_submit( $form, &$form_state  )
{
  $db_prefix = variable_get('xttranslate_db_prefix', '');

  $languages = $form['#languages'];
  
  foreach ($languages as $key => $lang)
  {
    $split = explode(":", $key);
    $country_code = $split[1];

    $langsplit = explode(":", $lang);
    $language = $langsplit[0];

    $checkbox_name = 'xttranslate_' . $key . '_checkbox';
    $managed = ($form_state['values'][$checkbox_name] == 1) ? 'TRUE' : 'FALSE';

    //set the language's managed column
    $managed_query = "update " . $db_prefix . "translate_languages set managed=$managed where language='%s' and code='%s'";
    db_query($managed_query, $language, $country_code);
    
    //handle managers
    $select_name = 'xttranslate_' . $key . '_select';

    //look up language id for insert
    $lang_query = "select id from " . $db_prefix . "translate_languages where language='%s' and code='%s'";
    $lang_id = db_result(db_query($lang_query, $language, $country_code));

    //look up all current managers for language
    $current_managers_result = db_query("select uid from " . $db_prefix . "translate_managers where language_id = %d", $lang_id);
    $current_managers = array();

    while ($m = db_fetch_object($current_managers_result))
    {
      $current_managers[] = $m->uid;
      //if current manager for language is no longer a part of the managers just submitted
      if (!in_array($m->uid, $form_state['values'][$select_name]))
      {
        //delete manager
        $delete_query = "delete from " . $db_prefix . "translate_managers where language_id=%d and uid=%d";
        db_query($delete_query, $lang_id, $m->uid);
      }
    }
    
    foreach ($form_state['values'][$select_name] as $uid)
    {
      //if manager submitted is not among the current managers for the language
      if(!in_array($uid, $current_managers))
      {
          $insert_query = "insert into " . $db_prefix . "translate_managers (language_id, uid) values (%d, %d)";
          db_query($insert_query, $lang_id, $uid);
      }
    }

  }
  drupal_set_message("Your changes have been submitted.");
}


function xttranslate_manager_main()
{  
  $module_path = drupal_get_path('module', 'xttranslate');

  $full_path = $module_path . '/dataTables-1.6/media/css/demo_table.css';               
  drupal_add_css($full_path);
  $full_path = $module_path . '/dataTables-1.6/media/css/demo_page.css';               
  drupal_add_css($full_path);
  $full_path = $module_path . '/xttranslate.manager.css';               
  drupal_add_css($full_path);

  jqp_add_js('jquery.dataTables1.6.min.js');         
  jqp_add_js('jquery.livequery.js');         
  jqp_add_js('jquery.jeditable.js');
  //drupal_add_js($module_path . '/FixedHeader.min.js');         
	drupal_add_js($module_path . '/json2.js');
  drupal_add_js($module_path . '/xttranslate.manager.js');

  $languages = xttranslate_get_manager_language_display_array();                          
  $version = xttranslate_get_product_version();

	$version_result = db_query("select distinct version from ac_translate_consource_version order by version");
  $version_display = '&nbsp;<select id="edit-version">';
  while ($row = db_fetch_object($version_result))
  {
    if ($version == $row->version)
      $version_display .= "<option selected=selected value='{$row->version}'>{$row->version}</option>";
    else
      $version_display .= "<option value='{$row->version}'>{$row->version}</option>";
  }
  $version_display .= "</select>";

  $output .= "<select id='xttranslate-languages'><option value='init'>Choose A Language</option>";
  foreach ($languages as $index => $value)
  {
    $output .= "<option value=" . $index . ">" . $value . "</option>";
  }

  $output .= "</select>&nbsp;$version_display<br>";

	$output .= "<div id='xttranslate-managers'></div>";

  $output .= "<div id='dt_example' style='overflow: hidden;'>";

  $output .= "</div>";

  return $output;

}

/*
function xttranslate_show_managers($lang_code, $country_code)
{
	//$prefix = variable_get('xttranslate_db_prefix', '');
	//$language = get_language_array( $lang_code );


	$query = "select * from " . $prefix . "translate_managers a
	inner join " . $prefix . "translate_languages b on language_id = b.id
	inner join " . $prefix . "users c on c.uid = a.uid
	where lower(language) = lower('%s') and code = '%s' and managed = true";

	$managers_result = db_query($query, $language, $country_code);
	while ($manager = db_fetch_object($managers_result))
	{
		
	}

}
*/

function xttranslate_manager_get_pending($lang_code, $country_code, $version)
{
  $db_prefix = db_escape_string( variable_get('xttranslate_db_prefix', '') );
  $current_version = db_escape_string( xttranslate_get_product_version() );

  //$lang_code = empty($_GET['lang_code']) ? 'fr' : $_GET['lang_code'];
  //$country_code = empty($_GET['country_code']) ? 'fr' : $_GET['country_code'];

  /* Paging */
  $sLimit = "";
  if ( isset( $_GET['iDisplayStart'] ) )
  {
    //drupal_set_message( "FOUND DISPLAY START" );
    $sLimit = " LIMIT ". db_escape_string( $_GET['iDisplayLength'] )." OFFSET ".   
    db_escape_string( $_GET['iDisplayStart'] );
  } 

  /* Ordering */
  if ( isset( $_GET['iSortCol_0'] ) )
  {
    $sOrder = " ORDER BY  ";
    for ( $i=0 ; $i< db_escape_string( $_GET['iSortingCols'] ) ; $i++ )
    {
      $sOrder .= xttranslate_manager_fnColumnToField( db_escape_string( $_GET['iSortCol_' . $i ] ));
      $sOrder .= " " . db_escape_string( $_GET['sSortDir_' . $i ] ) .", ";
    }
    $sOrder = substr_replace( $sOrder, "", -2 );
  }

  /* Filtering - NOTE this does not match the built-in DataTables filtering which does it
   * word by word on any field.
   */

  $sWhere = "";

  if ( $_GET['sSearch'] != "" )
  {
    $split = explode(" ", $_GET['sSearch']);

    $sWhere = " and (";
    for ( $i=0; $i < db_escape_string( $_GET['iColumns'] )-1; $i++ )
    {
      $sWhere .= xttranslate_manager_fnColumnToField($i) . " LIKE '". db_escape_string( $_GET['sSearch'] )."%' OR ";
    }
    $sWhere .= xttranslate_manager_fnColumnToField($_GET['iColumns']-1) . " LIKE '". db_escape_string( $_GET['sSearch'] )."%' ) ";
  }

  /*
   * Column Filtering
   */
  for ( $i=0 ; $i < db_escape_string( $_GET['iColumns'] ) ; $i++ )
  {
    if (!empty($_GET['sSearch_' . $i]))
    {
      if (!empty($_GET['sSearch']))
      {
        $sWhere .= " AND " . xttranslate_manager_fnColumnToField($i) .
        " IN ( select " . xttranslate_manager_fnColumnToField($i) . " from " . xttranslate_manager_fnColumnToTable($i, $lang_code, $country_code) .
        " where " . xttranslate_manager_fnColumnToField($i) . " like '" . $_GET['sSearch_' . $i] . "%' ) ";
      }
      else
      {
        $sWhere .= " and " . xttranslate_manager_fnColumnToField($i) . " like '" . $_GET['sSearch_' . $i] . "%' ";
      }
    }
  }
/*
  $query = "
  select g.id, context, source,
  bar.active, translation as pending, g.user
  from " . $db_prefix . "translate_consource_version b 
  inner join " . $db_prefix . "translate_consource a on b.consourceid = a.id 
  inner join " . $db_prefix . "translate_".$lang_code."_".$country_code."_translation g on g.consourceid = a.id 
  inner join " . $db_prefix . "translate_context c on c.id = a.contextid
  inner join " . $db_prefix . "translate_source e on e.id = a.sourceid   
  left outer join (select consourceid, translation as active from " . $db_prefix . "translate_".$lang_code."_".$country_code."_translation z where complete = 2 and version = '$version'
  ) as bar on bar.consourceid = g.consourceid
  left outer join (select consourceid, max(rev_number) as max from " . $db_prefix . "translate_".$lang_code."_".$country_code."_translation y where version = '$version' and complete != 0 group by consourceid ) as foo
  on foo.consourceid = g.consourceid where g.version = '$version'
  and b.version = '$version' and translation != '' and complete = 1
  and g.rev_number = foo.max    
  " . $sWhere . $sOrder . $sLimit
  ;
*/
  $query = "
  select distinct g.consourceid, g.id, context, source,
  bar.active, translation as pending, g.user
  from " . $db_prefix . "translate_consource_version b 
  inner join " . $db_prefix . "translate_consource a on b.consourceid = a.id 
  inner join " . $db_prefix . "translate_".$lang_code."_".$country_code."_translation g on g.consourceid = a.id 
  inner join " . $db_prefix . "translate_context c on c.id = a.contextid
  inner join " . $db_prefix . "translate_source e on e.id = a.sourceid   
  left outer join (
		select consourceid, translation as active 
		from " . $db_prefix . "translate_".$lang_code."_".$country_code."_translation z 
		where complete = 2 
  ) as bar on bar.consourceid = g.consourceid
  left outer join (
		select consourceid, max(rev_number) as max 
		from " . $db_prefix . "translate_".$lang_code."_".$country_code."_translation y 
		where complete != 0 
		group by consourceid 
	) as foo
  on foo.consourceid = g.consourceid where translation != '' 
  and b.version = '$version' 
	and complete = 1
  and g.rev_number = foo.max    
  " . $sWhere . $sOrder . $sLimit
  ;

	

	//xtres_set_message($query);

  $count_query = "
  select count(*) from (
  select distinct g.consourceid, context, source,
  bar.active, translation as pending
  from " . $db_prefix . "translate_consource_version b 
  inner join " . $db_prefix . "translate_consource a on b.consourceid = a.id 
  inner join " . $db_prefix . "translate_".$lang_code."_".$country_code."_translation g on g.consourceid = a.id 
  inner join " . $db_prefix . "translate_context c on c.id = a.contextid
  inner join " . $db_prefix . "translate_source e on e.id = a.sourceid   
  left outer join (
		select consourceid, translation as active 
		from " . $db_prefix . "translate_".$lang_code."_".$country_code."_translation z 
		where complete = 2 
  ) as bar on bar.consourceid = g.consourceid
  left outer join (
		select consourceid, max(rev_number) as max 
		from " . $db_prefix . "translate_".$lang_code."_".$country_code."_translation y 
		where complete != 0 group by consourceid 
	) as foo
  on foo.consourceid = g.consourceid 
  where b.version = '$version' 
	and translation != '' and complete = 1
  and g.rev_number = foo.max " . $where . " 
  ) as big";

  $filtered_total = db_result(db_query($count_query));

	watchdog('xttranslate', 'manager query: ' . $query);
  $query_result = db_query($query);
  
  $total = pg_num_rows( $query_result );  
  $results = array();


  while ($translation = db_fetch_object($query_result))
  {
    $context = empty($translation->context) ? '[empty]' : $translation->context;
    $source = empty($translation->source) ? '' : htmlentities($translation->source);
    $active = empty($translation->active) ? '' : $translation->active;
    $pending = empty($translation->pending) ? '' : $translation->pending;
		$user = empty($translation->user) ? '' : $translation->user;
    $checkboxes = "<input id='xttranslate-"  . $translation->id . "-yes' class='xttranslate-yes' type='checkbox' value='yes'/>"
		. "&nbsp;<input id='xttranslate-" . $translation->id . "-no' class='xttranslate-no' type='checkbox' value='no'/>"; 
    $results[] = array($context, $source, $active, $pending, $user, $checkboxes); 
  }

  print drupal_json( array ( 'sEcho' => $_GET['sEcho'], 'iTotalDisplayRecords' => $filtered_total, 'iTotalRecords' => $total, 'aaData' => $results) );

}

function xttranslate_manager_fnColumnToField( $i )
{
  if ( $i == 0 )
    return "context";
  else if ( $i == 1 )
    return "source";
  else if ( $i == 2 )
    return "active";
  else if ( $i == 3 )
    return "translation";
	else if ( $i == 4)
		return "g.user";
}

function xttranslate_manager_fnColumnToTable($i, $lang_code, $country_code)
{
  $db_prefix = db_escape_string( variable_get('xttranslate_db_prefix', '') );
  
  if ( $i == 0 )
    return $db_prefix . "translate_context";
  else if ( $i == 1 )
    return $db_prefix . "translate_source";
  else if ( $i == 2 )
    return $db_prefix . "translate_" . $lang_code . "_" . $country_code . "_translation";
  else if ( $i == 3 )    
    return $db_prefix . "translate_" . $lang_code . "_" . $country_code . "_translation";
	else if ($i == 4)
    return $db_prefix . "translate_" . $lang_code . "_" . $country_code . "_translation";		
}


function xttranslate_manager_process_translations()
{
  $prefix = db_escape_string( variable_get('xttranslate_db_prefix', '') );

	$data = json_decode($_POST['data'], true);
	$translations = $data['tid'];
	
	$l = db_escape_string($data['language']);
	$c = db_escape_string($data['country']);

	foreach($translations as $key => $value)
	{
		$split = explode("-", $key);
		$id = db_escape_string($split[1]);

		//drupal_set_message("translation Id: " . $id . " value: " . $value);
		$table = $prefix . "translate_" . $l . "_" . $c . "_translation";
		$update_table = "update " . $table;
		if ($value == 'yes')
		{
			//find all translations with similar revised id
			//$revised_query = "select revised_id from " . $table . " where id = $id and revised_id != 0";
			$revised_query = "select consourceid, version from {$table} where id = $id";
			$revised = db_fetch_object(db_query($revised_query));
			if (!empty($revised))
			{
				//$update_related = $update_table . " set complete = 0 where revised_id = $revised";
				$update_related = $update_table . " set complete = 0 where consourceid = {$revised->consourceid} and version = '{$revised->version}'";
				db_query($update_related);
			}
			$update_query = $update_table . " set complete = 2 where id = $id";
			db_query($update_query);
		}
		if ($value == 'no')
		{	
			$user = db_result(db_query("select \"user\" from " . $table . " where id = $id"));
			//drupal_set_message("user found: " . $user);
			if ($user == "Administrator")
			{
				$update_query = $update_table . " set translation = '' where id = $id";
			}
			else
			{				
				$update_query = $update_table . " set complete = 0 where id = $id";
			}
			db_query($update_query);
		}

		
	}
	//drupal_set_message("The translations have been updated.");
	//drupal_set_message(print_r($translations, true));
}


function xttranslate_get_manager_language_display_array()
{
	global $user;
	$roles = $user->roles;
        $db_prefix = variable_get('xttranslate_db_prefix', '');

     $language_query = "select c.printable_name as country, a.language as language, official,
     a.code as country_code, b.code as language_code, a.id
     from " . $db_prefix . "translate_languages as a
     inner join " . $db_prefix . "translate_language_codes as b
     on a.language = b.language
     join " . $db_prefix . "translate_country as c
     on lower(c.iso) = a.code
        where hide = %d and managed = true
     order by language asc";

     $language_query_result = @db_query($language_query, $hide);

     //$language = db_fetch_object($language_query_result);

     $language_array = array();
     //print pg_num_rows($language_query_result);
	
     //look up manager's languages
     $manager_query = "select language_id as id from " . $db_prefix . "translate_managers where uid = " . $user->uid;

     $manager_languages = pg_fetch_all(db_query($manager_query));

     while ( $language = db_fetch_object($language_query_result) )
     {        
          //if it's not the official language for the country, display the language with its country
          //$language_value = $language->language;
          $language_value = ($language->official == 't') ? $language->language : $language->language . ':' . $language->country;
          $language_index = $language->language_code . ':' . $language->country_code;
	  if (in_array('administrator', $roles))
	  {
          	$language_array[$language_index] = $language_value;
	  }
	  else
          {
		if ($manager_languages && count($manager_languages) > 0)
		{
			foreach($manager_languages as $row => $values)
			{
				if ($values['id'] == $language->id)
				{
					$language_array[$language_index] = $language_value;
					break;
				}
			}
		}
	  }
     }
        
        return $language_array;
}


function xttranslate_manager_edit_translation()
{
  $prefix = variable_get('xttranslate_db_prefix', '');
	global $user;

	$tid = $_POST['tid'];
	$translation = $_POST['value'];
	$l = $_POST['lang'];
	$c = $_POST['country'];

	$update_query = "update " . $prefix . "translate_%s_%s_translation set translation = '%s', \"user\" = '%s' where id = %d";
	db_query($update_query, $l, $c, $translation, $user->name, $tid);	

	//drupal_set_message(print_r($_POST, true));
	
	print $translation;
	//exit();
}
