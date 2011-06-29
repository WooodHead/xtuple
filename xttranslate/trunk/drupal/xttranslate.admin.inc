<?php

//translation portal settings main page
function xttranslate_admin_settings()
{
	global $db_prefix;

	$languages = xttranslate_get_language_array();
	$countries = xttranslate_get_country_array();

	$form['admin_xttranslate'] = array(
		'#type' => 'fieldset',
     	'#title' => t('Translation Portal Options'),
     	'#collapsible' => TRUE,
     	'collapsed' => FALSE,
  	);

	
	$form['admin_xttranslate']['xttranslate_base_language'] = array(
		'#type' => 'select',
		'#title' => t('Base Language'),
		'#description' => t('Enter the language you wish to be default for base .ts files'),
          '#options' => $languages,
		'#default_value' => variable_get('xttranslate_base_language', 'en'),
	);

	$form['admin_xttranslate']['xttranslate_base_country'] = array(
		'#type' => 'select',
		'#title' => t('Base Country'),
		'#description' => t('Enter the country you wish to be default for base .ts files'),
          '#options' => $countries,
		'#default_value' => variable_get('xttranslate_base_country', 'us'),
	);
	

	$form['admin_xttranslate']['xttranslate_qt_location'] = array(
		'#type' => 'textfield',
		'#title' => t('QT Path'),
		'#description' => t('Enter the path where QT\'s lrelease is installed'),
		'#default_value' => variable_get('xttranslate_qt_location', ''),
	);

	$form['admin_xttranslate']['xttranslate_db_prefix'] = array(
		'#type' => 'textfield',
		'#title' => t('Database Prefix'),
		'#description' => t('Please enter the database prefix you wish to use for the Translation Portal. This is necessary for installations with multiple sites on 
		one database. All translation tables are set as: prefix_xttranslate_tablename. Default value is your site prefix. Prefixes must end in _'),
		'#default_value' => variable_get('xttranslate_db_prefix', $db_prefix['default']),
	);

	$version_result = db_query("select distinct version from ac_translate_consource_version order by version");
	$versions = array();
  while ($row = db_fetch_object($version_result))
  {
		$versions[$row->version] = $row->version;
	}
	
	$form['admin_xttranslate']['xttranslate_display_version'] = array(
		'#type' => 'checkboxes',
		'#title' => t('Displayed Versions'),
		'#description' => t('Select the versions you wish users to have access to'),
    '#options' => $versions,
		'#default_value' => variable_get('xttranslate_display_version', array('')),
	);
	
	
	$form['admin_xttranslate_messages'] = array(
		'#type' => 'fieldset',
     	'#title' => t('Translation Portal Page Messages'),
     	'#collapsible' => TRUE,
     	'collapsed' => FALSE,
  	);

	$form['admin_xttranslate_messages']['xttranslate_fronttop_page_message'] = array(
     	'#type' => 'textarea',
     	'#title' => t('Translation Portal Front Page Top'),
     	'#description' => t('Please enter the message you wish to see on the top of the front page'),
     	'#default_value' => variable_get('xttranslate_fronttop_page_message', ''),
  	);

	$form['admin_xttranslate_messages']['xttranslate_front_page_message'] = array(
     	'#type' => 'textarea',
     	'#title' => t('Translation Portal Front Page'),
     	'#description' => t('Please enter the message you wish to see on the front page'),
     	'#default_value' => variable_get('xttranslate_front_page_message', ''),
  	);


	return system_settings_form($form);
}

function xttranslate_admin_settings_validate($form, $form_state)
{
	$language = $form_state['values']['xttranslate_base_language'];
	if ( is_numeric($language) || empty($language) ) //if it's a number or empty...
	{
		//send back an error
		form_set_error('xttranslate_base_language', t('Please select a language.'));
	}
	
	$qt_path = $form_state['values']['xttranslate_qt_location'];

	if ( empty($qt_path) )
	{
		form_set_error('xttranslate_qt_location', t('Please enter a path to QT\'s lrelease.') );
	}

	$db_prefix = $form_state['values']['xttranslate_db_prefix'];
	
	if ( empty($db_prefix) )
	{
		form_set_error('xttranslate_db_prefix', t('Please enter a database prefix.') );
	}
	
	if ( preg_match('/\_/', $db_prefix) < 1 )
	{
		form_set_error('xttranslate_db_prefix', t('Please add a trailing _ to the database prefix.') );
	}
		
}

function xttranslate_import_base_file()
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$countries = xttranslate_get_country_array();
	$languages = xttranslate_get_language_array();

	//print $base_language;

	$form['#attributes'] = array('enctype' => "multipart/form-data");

	$form['lang'] = array(     
     	'#type' => 'select',                        
          '#title' => t('Please select a language'),
          '#options' => $languages,
     );    
	
	$form['country'] = array(     
     	'#type' => 'select',                        
          '#title' => t('Please select a country'),
          '#options' => $countries,
     );    

	$form['product'] = array(
		'#type' => 'textfield',
		'#title' => t('Please enter the name of the product belonging to the .TS File. Defaults to PostBooks.'),
		'#maxlength' => 25,
		'#default_value' => t('PostBooks'),
	);

	$form['version'] = array(
		'#type' => 'textfield',
		'#title' => t('Please enter a version'),
		'#maxlength' => 25,
	);
	
	$form['all'] = array(
		'#type' => 'checkbox',
		'#title' => t('Update Languages?'),
		'#description' => t('Check this if you want to update all languages available to the latest version (only for base language files)'),
	);

	$form['official'] = array(
		'#type' => 'checkbox',
		'#title' => t('Official Language?'),
		'#description' => t('Check this if the language selected is the official (such as French for France) language for the country chosen'),
	);
	
	$form['basefile'] = array(
          '#type' => 'file',
          '#title' => t('Please choose your .ts file'),
     );

	$form['submit'] = array(
          '#type' => 'submit',
          '#value' => t('Import'),
     );

	return $form;
}

function xttranslate_import_base_file_validate($form, &$form_state)
{
	$path = file_directory_path();

	if ( empty($form_state['values']['version']) )
	{
		form_set_error( 'version', t('Please enter a version.') );
	}
	
	if($file = file_save_upload('basefile', array(), $path, FILE_EXISTS_REPLACE))
    	{
     	$form_state['basefile'] = $file->filename;
     }
     else
     {
		form_set_error( '', t('The attched file failed to upload. Please try again.') );
     }
	
	if (empty($form_state['values']['product']))
	{
		form_set_error( '', t('Please enter a product.') );
	}

}

function xttranslate_import_base_file_submit($form, &$form_state)
{
	//print_r($form_state);

	$db_prefix = variable_get('xttranslate_db_prefix', '');	

	//drupal_set_message('<pre>' . print_r($form_state, TRUE) . '</pre>');

	$language = xttranslate_get_language_array($form_state['values']['lang']);
	$country = xttranslate_get_country_array($form_state['values']['country']);

	//if the language selected matches the base language stored, base is true
	$base_language = ( xttranslate_get_language_array( variable_get('xttranslate_base_language', 'en') ) == $language) ? TRUE : FALSE;
	$base_country = ( xttranslate_get_country_array( variable_get('xttranslate_base_country', 'us') ) == $country) ? TRUE : FALSE;


	$decision = $form_state['values']['all'];
	$new_version = $form_state['values']['version'];
	$official = ( $form_state['values']['official'] == 1) ? '1' : '0';

	$product = $form_state['values']['product'];

	//drupal_set_message($product);
	
	$file = file_directory_path() . '/' . $form_state['basefile'];
	
	$string = file_get_contents($file);
	
	$xml = simplexml_load_string($string);
	
	$current_version = xttranslate_get_product_version($product, $new_version, TRUE); //grabs the current version number from the database - if it doesn't exist, create it
	if ( empty($current_version) )
	{
		$current_version = $new_version;
	}
	
	$contextid = 0; //for process_source
	$consourceid = 0; //for process_translation
	
	//makes the new translation table, if it doesn't exist
	xttranslate_createTranslationTable($form_state['values']['lang'], $form_state['values']['country'], $official);

	//db_query("start transaction");
	foreach ($xml->context as $contexts)
     {
		//print_r($contexts);
		
		if ($base_language && $base_country)
		{
			xttranslate_process_context( $contexts->name, $contextid, $new_version, $base_language);
		}

		foreach($contexts->message as $message)
          {
			$source = $message->source;
			$location = "filename=\"" . $message->location['filename'] . "\" line=\"" . $message->location['line'] . "\"";
			

			$oldTranslation = ($message->translation['type'] == "obsolete") ? 1 : 0;
			$translation = $message->translation;

			if ($base_language && $base_country)
			{
				xttranslate_process_source( $source, $contextid, $location, $new_version, $consourceid, $base_language, $product);
			}
			else
			{
				$consourceid = xttranslate_get_consource_id( $contexts->name, $source);
				//print $context . " " . $source . "<br>";
			}
			
			if ( is_numeric($consourceid) ) //if there's a consource id for a translation to link to
			{
				xttranslate_admin_process_translation( $translation, $consourceid, $current_version, $new_version, $oldTranslation, $form_state['values']['lang'],
				$form_state['values']['country'] );
			}
			else
			{
				//print "NOT NUMERIC<br>";
				//print $consourceid . "<br>";
			}
			
			if ($decision == 1) //if box checked to update other languages
			{
				//xttranslate_update_translations( $translation, $consourceid, $current_version, $new_version, $oldTranslation );
			}
			$oldTranslation = 0;
			//print_r($message);
		}
	}

	//new updater
	if ($decision == 1)
	{
		xttranslate_sync_translations($new_version, $current_version);
	}


	//update current_version if this is the base file
	if ($base_language && $base_country)
	{
		$update_current_version = "update " . $db_prefix . "translate_product_version set current_version='%s' where lower(product) = lower('%s')";
		$update_current_version_result = db_query($update_current_version, $new_version, $product);
	}


	//db_query("commit");

	//SimpleXML Works! bring it back
	//print_r($xml);
	

	drupal_set_message( t("The language has finished uploading.") );

	//drupal_set_message($language . ' ' . $country . ' ' . $file);

}

function xttranslate_add_language()
{
	$countries = xttranslate_get_country_array();                 
     $languages = xttranslate_get_language_array();

	$form['add_language']['lang'] = array(
          '#type' => 'select',
          '#title' => t('Please select a language'),                  
          '#options' => $languages,
     );

     $form['add_language']['country'] = array(
          '#type' => 'select',
          '#title' => t('Please select a country'),
          '#options' => $countries,
     );

	$form['add_language']['official'] = array(
		'#type' => 'checkbox',
		'#title' => t('Official Language?'),
		'#description' => t('Check this if the language selected is the official (such as French for France) language for the country chosen'),
	);

	$form['add_language']['submit'] = array(   
          '#type' => 'submit',
          '#value' => t('Submit'),
     );

	$form['#version'] = xttranslate_get_product_version();
	
	return $form;
}

function xttranslate_add_language_validate($form, &$form_state)
{
	$language = $form_state['values']['lang'];
	$country = $form_state['values']['country'];
	
	if ( empty($language) )
	{
		form_set_error('lang', t('Please select a language.') );
	}
	if ( empty($country) )
	{
		form_set_error('country', t('Please select a country.') );
	}	
}

function xttranslate_add_language_submit($form, &$form_state)
{

	$db_prefix = variable_get('xttranslate_db_prefix', '');


	$language_code = $form_state['values']['lang'];
     $country_code = $form_state['values']['country'];
	$version = $form['#version'];
	$official = ( $form_state['values']['official'] == 1) ? '1' : '0';

	//create the new table for the language, and insert it into the languages table
	xttranslate_createTranslationTable($language_code, $country_code, $official);

	//add empty entries into the new language's table
	$insert_query = "insert into " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation select * from " . $db_prefix . "translate_en_us_translation";
	$insert_query_result = db_query($insert_query);

	//change the insert time to be now()
		
	$update_time = "update " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation set time=NOW() where id > 0";
	$update_time_result = db_query($update_time);

	//update sequence
	$sequence = "select setval('" . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation_id_seq', (select max(id) + 1 from 
	" . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation))";
	
	$sequence_result = db_query($sequence);

	drupal_set_message(t('The new language has been added.'));		
}

function xttranslate_delete_language()
{
	$language_array = xttranslate_admin_get_language_display_array();
	$version = xttranslate_get_product_version();

	$form['delete_language']['lang'] = array (
		'#type' => 'select',
          '#title' => t('Language to delete'),
          '#options' => $language_array,
     );

	$form['#version'] = $version;

	$form['delete_language']['submit'] = array(
          '#type' => 'submit',                
          '#value' => t('Submit'),
     );
	
	return $form;		
}

function xttranslate_delete_language_validate($form, &$form_state)
{
	if ( empty($form_state['values']['lang']) )    
     {
          form_set_error('lang', t('Please select a language') );
     }

}

function xttranslate_delete_language_submit($form, &$form_state)
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$version = $form['#version'];

     $language_temp = explode(':', $form_state['values']['lang']);

     if ( is_array($language_temp) )
     {
          $language_code = $language_temp[0];         
          $country_code = $language_temp[1];
     }

	$language = xttranslate_get_language_array($language_code);
	
	//delete the language table
	$drop_table = "drop table if exists " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation";
	$drop_table_result = db_query($drop_table);
	
	//delete the language from the languages table
	$delete_language = "delete from " . $db_prefix . "translate_languages where language = '%s' and code = '%s'";
	$delete_language_result = db_query($delete_language, $language, $country_code);
	
	drupal_set_message( t('The language has been deleted.') );
}

function xttranslate_hide_language()
{
	$language_array = xttranslate_admin_get_language_display_array();
	$version = xttranslate_get_product_version();

	$form['delete_language']['lang'] = array (
		'#type' => 'select',
          '#title' => t('Language to hide'),
          '#options' => $language_array,
     );

	$form['#version'] = $version;

	$form['delete_language']['submit'] = array(
          '#type' => 'submit',                
          '#value' => t('Submit'),
     );
	
	return $form;		
}

function xttranslate_hide_language_validate($form, &$form_state)
{
	if ( empty($form_state['values']['lang']) )    
     {
          form_set_error('lang', t('Please select a language') );
     }

}

function xttranslate_hide_language_submit($form, &$form_state)
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$version = $form['#version'];

     $language_temp = explode(':', $form_state['values']['lang']);

     if ( is_array($language_temp) )
     {
          $language_code = $language_temp[0];         
          $country_code = $language_temp[1];
     }

	$language = xttranslate_get_language_array($language_code);
	
	//set the language to hidden
	$hide_language = "update " . $db_prefix . "translate_languages
                set hide = 1         
                where language = '%s' and code = '%s'";

	$hide_language_result = db_query( $hide_language, $language, $country_code );

	drupal_set_message( t('The language has been hidden from view.') );
}

function xttranslate_unhide_language()
{
	$language_array = xttranslate_admin_get_language_display_array( TRUE );
	$version = xttranslate_get_product_version();


	$form['delete_language']['lang'] = array (
		'#type' => 'select',
          '#title' => t('Language to unhide'),
          '#options' => $language_array,
     );

	$form['#version'] = $version;

	$form['delete_language']['submit'] = array(
          '#type' => 'submit',                
          '#value' => t('Submit'),
     );
	
	return $form;		
}

function xttranslate_unhide_language_validate($form, &$form_state)
{
	if ( empty($form_state['values']['lang']) )    
     {
          form_set_error('lang', t('Please select a language') );
     }

}

function xttranslate_unhide_language_submit($form, &$form_state)
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$version = $form['#version'];

     $language_temp = explode(':', $form_state['values']['lang']);

     if ( is_array($language_temp) )
     {
          $language_code = $language_temp[0];         
          $country_code = $language_temp[1];
     }

	$language = xttranslate_get_language_array($language_code);
	
	//set the language to hidden
	$hide_language = "update " . $db_prefix . "translate_languages
                set hide = 0         
                where language = '%s' and code = '%s'";

	$hide_language_result = db_query( $hide_language, $language, $country_code );

	drupal_set_message( t('The language has been returned to view.') );
}

function xttranslate_export_file()
{

	$db_prefix = variable_get('xttranslate_db_prefix', '');
	
	$version = xttranslate_get_product_version();

	$language_array = xttranslate_admin_get_language_display_array();

	$form['export_form']['lang'] = array(
     	'#type' => 'select',            
          '#title' => t('Please select a language'),
          '#options' => $language_array,
     );    

	$form['export_form']['version'] = array(     
     	'#type' => 'select',                        
          '#title' => t('Please select a version'),
          '#options' => array($version => $version),
     );    

	$form['export_form']['type'] = array(
     	'#type' => 'select',                        
          '#title' => t('Please select a file type'),
          '#options' => array('ts' => '.ts XML file', 'qm' => '.qm binary file'),
		'#description' => t('* .qm files are used to see your language of choice inside of PostBooks'),
     );    
	
	$form['export_form']['submit'] = array(
          '#type' => 'submit',
          '#value' => t('Export'),
     );
		
	return $form;
	
}

function xttranslate_export_file_validate($form, &$form_state)
{
	if ( empty($form_state['values']['lang']) )
	{
		form_set_error('lang', t('Please select a language') );
	}
	if ( empty($form_state['values']['version']) )
	{
		form_set_error('version', t('Please select a version') );		
	}
	if ( empty($form_state['values']['type']) )
	{
		form_set_error('type', t('Please select an export file type') );		
	}
}

function xttranslate_export_file_submit($form, &$form_state)
{
	global $user;
	
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$version = $form_state['values']['version'];
	$filetype = $form_state['values']['type'];

	$language_temp = explode(':', $form_state['values']['lang']);
	
	if ( is_array($language_temp) )
	{
		$language_code = $language_temp[0];
		$country_code = $language_temp[1];
	}

	$language = xttranslate_get_language_array( $language_code );
	$country = xttranslate_get_country_array( $country_code );

	$official = db_result(db_query("select official from " . $db_prefix . "translate_languages where language = '%s' and code = '%s'", $language, $country_code));

	$managed = db_result(db_query("select managed from " . $db_prefix . "translate_languages where language = '%s' and code = '%s'", $language, $country_code));

	$complete_part = ($managed == 't') ? " b.complete = 2 " : " b.complete = 1 ";

	$query = "
	select context,source,translation,location
	from " . $db_prefix . "translate_consource as a
	join " . $db_prefix . "translate_consource_version as consource_version
	on consource_version.consourceid = a.id
	join " . $db_prefix . "translate_%s_%s_translation as b
	on a.id = b.consourceid
	join " . $db_prefix . "translate_context as c
	on c.id = a.contextid
	join " . $db_prefix . "translate_context_version as c_version
	on c_version.contextid = c.id
	join " . $db_prefix . "translate_source as d
	on d.id = a.sourceid
	join " . $db_prefix . "translate_source_version as s_version
	on s_version.sourceid = d.id
	join " . $db_prefix . "translate_source_location as s_location
	on s_location.consourceid = a.id
	join (select max(rev_number) as mrev, e.consourceid as sid 
     	from " . $db_prefix . "translate_%s_%s_translation as e
      	inner join " . $db_prefix . "translate_consource_version as f
      	on f.consourceid = e.consourceid	
      	where f.version = '%s' group by e.consourceid) as foo
	on b.consourceid = foo.sid
	where c_version.version = '%s'
	and s_version.version = '%s' and consource_version.version = '%s'
	and b.rev_number = foo.mrev and " . $complete_part . "
	order by context
	";

	//xtres_set_message($query);
	//return;

	$query_result = db_query($query, $language_code, $country_code, $language_code, $country_code, $version, $version, $version, $version);

	$myFile = $language . $version . ".ts";
     $myFile = "/tmp/" . $myFile;

     $FILE = fopen($myFile, 'w') or die ("Can't create file");

	$xw = xmlwriter_open_memory();
	xmlwriter_set_indent($xw, TRUE);
     xmlwriter_start_document($xw, '1.0', 'UTF-8'); 
     xmlwriter_start_dtd($xw, 'TS'); 
               
     xmlwriter_end_dtd($xw);
        
     xmlwriter_start_element($xw, 'TS');
                
     xmlwriter_write_attribute($xw, 'version', '1.1');
                
     $startContext = 0;
     $currContext = '';
	$blankcontext = 0;
     $bar = 0;
     while ($line = db_fetch_object($query_result) )
     {
     	if ($currContext != '' || $blankcontext == 1)
          {
          	if ($currContext == $line->context)
               {
               	xmlwriter_start_element($xw, 'message');
                    xmlwriter_write_element($xw, 'source', $line->source);
                    xmlwriter_write_attribute($xw, 'location', $line->location);
                    if ($line->translation != '')
                    {
                    	xmlwriter_write_element($xw, 'translation', $line->translation);
                    }
                    elseif ( empty($line->translation) )
                    {
                    	
			xmlwriter_start_element($xw, 'translation');

                        //xmlwriter_start_attribute($xw, 'type');
                        xmlwriter_write_attribute($xw, 'type', 'unfinished');
                        //xmlwriter_end_attribute($xw);

                        xmlwriter_text($xw, $line->translation);

                        xmlwriter_full_end_element($xw);

			/*			
			xmlwriter_write_element($xw, 'translation', $line->translation);
                        $check = xmlwriter_write_attribute($xw, 'type', 'unfinished');
			if (!$check)
			{
				drupal_set_message($line->source . " unfinished");
			}
			*/
                    }
                    else
                    {
		
			xmlwriter_start_element($xw, 'translation');

                        //xmlwriter_start_attribute($xw, 'type');
                        xmlwriter_write_attribute($xw, 'type', 'obsolete');
                        //xmlwriter_end_attribute($xw);

                        xmlwriter_text($xw, $line->translation);
                        xmlwriter_full_end_element($xw);

			
			/*
                    	xmlwriter_write_element($xw, 'translation', $line->translation);
                        xmlwriter_write_attribute($xw, 'type', 'obsolete');
			*/
                    }
                    xmlwriter_full_end_element($xw);
                                               
               }
               else
               {
               	if ($startContext == 1)
                    {
                    	xmlwriter_full_end_element($xw);
                    }
                    xmlwriter_start_element($xw, 'context');
                    xmlwriter_write_element($xw, 'name', $line->context);
                    xmlwriter_start_element($xw, 'message');
                    xmlwriter_write_element($xw, 'source', $line->source);
                    xmlwriter_write_attribute($xw, 'location', $line->location);
                    if ( empty($line->translation) )
                    {
                    	xmlwriter_write_element($xw, 'translation', $line->translation);
                    }
                    elseif ( empty($line->translation) )
                    {
	
			xmlwriter_start_element($xw, 'translation');

                        //xmlwriter_start_attribute($xw, 'type');
                        xmlwriter_write_attribute($xw, 'type', 'unfinished');
                        //xmlwriter_end_attribute($xw);

                        xmlwriter_text($xw, $line->translation);
                        xmlwriter_full_end_element($xw);

		
			/*
                    	xmlwriter_write_element($xw, 'translation', $line->translation);
                        $check = xmlwriter_write_attribute($xw, 'type', 'unfinished');
			if (!$check)
                        {
                                drupal_set_message($line->source . " unfinished");
                        }
			*/
                    }
                    else
                    {
                    	
			xmlwriter_start_element($xw, 'translation');

                        //xmlwriter_start_attribute($xw, 'type');
                        xmlwriter_write_attribute($xw, 'type', 'obsolete');
                        //xmlwriter_end_attribute($xw);

                        xmlwriter_text($xw, $line->translation);
                        xmlwriter_full_end_element($xw);

			/*
			xmlwriter_write_element($xw, 'translation', $line->translation);
                        xmlwriter_write_attribute($xw, 'type', 'obsolete');
			*/

                    }
                    xmlwriter_full_end_element($xw);
                    $startContext = 1;
                    $currContext = $line->context;
               }
          }
          else
          {
		xmlwriter_start_element($xw, 'context');
               xmlwriter_write_element($xw, 'name', $line->context);
               xmlwriter_start_element($xw, 'message');
               xmlwriter_write_element($xw, 'source', $line->source);
               xmlwriter_write_attribute($xw, 'location', $line->location);

               if ($line->translation != '')
               {
               	xmlwriter_write_element($xw, 'translation', $line->translation);
               }
               elseif ( empty($line->translation) )
               {
                    
			xmlwriter_start_element($xw, 'translation');

                        //xmlwriter_start_attribute($xw, 'type');
                        xmlwriter_write_attribute($xw, 'type', 'unfinished');
                        //xmlwriter_end_attribute($xw);

                        xmlwriter_text($xw, $line->translation);
                        xmlwriter_full_end_element($xw);

			/*			
			xmlwriter_write_element($xw, 'translation', $line->translation);
                    	$check = xmlwriter_write_attribute($xw, 'type', 'unfinished');
			if (!$check)
                        {
                                drupal_set_message($line->source . " unfinished");
                        }
			*/
               }
               else
               {
	
			xmlwriter_start_element($xw, 'translation');

                        //xmlwriter_start_attribute($xw, 'type');
                        xmlwriter_write_attribute($xw, 'type', 'obsolete');
                        //xmlwriter_end_attribute($xw);

                        xmlwriter_text($xw, $line->translation);
                        xmlwriter_full_end_element($xw);
	
			/*
  	             	xmlwriter_write_element($xw, 'translation', $line->translation);
        	        xmlwriter_write_attribute($xw, 'type', 'obsolete');
			*/
               }
               xmlwriter_full_end_element($xw);
               $startContext = 1;
               $currContext = $line->context;

          	if ( empty($line->context) ) //special case
			{
				$blankcontext = 1;
			}
			else
			{
				$blankcontext = 0;
			}
					
			

			//break;
		}
	}
     xmlwriter_full_end_element($xw);
     xmlwriter_full_end_element($xw);

     xmlwriter_end_dtd($xw);
     fwrite($FILE, xmlwriter_output_memory($xw, true));
     fclose($FILE);

	if ($filetype == "ts")
     {
				$filename = ($official == 't') ? 'xTuple.' . $country_code . '.ts' : 'xTuple.' .$language_code . '_' . $country_code . '.ts';
		
     	  while( @ob_end_clean() );
          header('Content-Disposition: attachment; filename=' . $filename );
          readfile($myFile);
          $cmd = "rm " . $myFile;
          //shell_exec($cmd); uncomment after done testing
		
     }
     else
     {
     	$linguist_path = variable_get('xttranslate_qt_location', '');
				$cmd = $linguist_path . "/lrelease " . $myFile;
          shell_exec($cmd);
          $newFile = $language . $version . ".qm";
          $newFile = "/tmp/" . $newFile;

		$filename = ($official == 't') ? 'xTuple.' . $country_code . '.qm' : 'xTuple.' .$language_code . '_' . $country_code . '.qm';

          while( @ob_end_clean() );
					header('Content-Disposition: attachment; filename=' . $filename );
          readfile($newFile);
                        
          $cmd = "rm " . $newFile;
          //shell_exec($cmd);        
          $cmd = "rm " . $myFile;
          //shell_exec($cmd);
     }
     $qm_query = "insert into " . $db_prefix . "translate_qmdownload (username, version, language, country) values ('%s', '%s', '%s', '%s')";
     $qm_query_result = db_query($qm_query,$user->name,$version,$language,$country);

}


/* used for forms that display as language:country
** returns an array filled with all current languages:countries
*/
function xttranslate_admin_get_language_display_array( $hidden = FALSE, $mode = null )
{

	$db_prefix = variable_get('xttranslate_db_prefix', '');

	
	$hide = ($hidden) ? 1 : 0;

	$language_query = "select c.printable_name as country, a.language as language, official,
     a.code as country_code, b.code as language_code
     from " . $db_prefix . "translate_languages as a
     inner join " . $db_prefix . "translate_language_codes as b
     on a.language = b.language
     join " . $db_prefix . "translate_country as c
     on lower(c.iso) = a.code
	where hide = %d
     order by language asc";

     $language_query_result = @db_query($language_query, $hide);

     //$language = db_fetch_object($language_query_result);

     $language_array = array();
     //print pg_num_rows($language_query_result);
     while ( $language = db_fetch_object($language_query_result) )
     {        
          //if it's not the official language for the country, display the language with its country
          //$language_value = $language->language;
          $language_value = ($language->official == 't') ? $language->language : $language->language . ':' . $language->country;
          $language_index = $language->language_code . ':' . $language->country_code;
          $language_array[$language_index] = $language_value;
     }
	if ($mode == 'exportgui')
	{
		foreach ($language_array as $index => $value)
		{
			$val = $index . "|" . $value . ",";
		}

		$val = substr($val, 0, -1);
	
		return $val;
	}
	
	return $language_array;
}

function xttranslate_get_consource_id( $context, $source )
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$consource_check = "select a.id as consourceid
	from " . $db_prefix . "translate_consource as a
	inner join " . $db_prefix . "translate_context as b
	on b.id = a.contextid
	inner join " . $db_prefix . "translate_source as c
	on c.id = a.sourceid
	where source = '%s' and context = '%s'";

	$consource_check_result = db_query($consource_check, $source, $context);
	$consourceid = db_fetch_object( $consource_check_result );

	//if there's no consource id in the database for the context and source, return false, else return the id
	$consource_return = ( empty( $consourceid->consourceid ) ) ? FALSE : $consourceid->consourceid;
	
	return $consource_return;
}

//returns the current version installed in our database
function xttranslate_get_product_version( $product = 'PostBooks', $newversion = 0, $base = FALSE  )
{

	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$version_query = "select current_version from " . $db_prefix . "translate_product_version where lower(product) = lower('" . $product . "')";
	$version_result = db_fetch_object( db_query($version_query) );
	$version = $version_result->current_version;
	
	if (empty($version) && $base)
	{
		//create a new entry in the product table	
		db_query("insert into " . $db_prefix . "translate_product_version (product, current_version) values ('%s', '%s')", $product, $newversion);
	}

	return $version;
}


/*handles the checking of context values in the database
**returns the context and context version queries to run
*/

function xttranslate_process_context( $context, &$contextid, $version, $base_language = FALSE)
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$context_check = "select context, id
	from " . $db_prefix . "translate_context as a
	where context = '%s'
	order by id desc";

	$version_check = "select *
	from " . $db_prefix . "translate_context_version
	where contextid = %d";

	$context_result = db_query($context_check, $context);
	$context_row = db_fetch_object( $context_result );


	//if ( !empty($context_row->context) ) //if context found
	if ( pg_num_rows($context_result) > 0 ) //if context found
	{
		//print "CONTEXT FOUND: <br>";
		$version_result = db_query($version_check, $context_row->id);
		$version_rows = pg_fetch_all($version_result);
			
		//insert the new version
		
		//check to see if it's there for the current version...

		$version_insert_check = "select *
		from " . $db_prefix . "translate_context_version
		where contextid = %d and version = '%s'";
		
		$version_insert_check_result = db_query ($version_insert_check, $context_row->id, $version);
		
		if (pg_num_rows( $version_insert_check_result ) < 1 ) //if the version isn't found for this context
		{
			//insert it
			$version_insert = "insert into " . $db_prefix . "translate_context_version (version, contextid) values ( '%s', %d )";
			$version_result = db_query( $version_insert, $version, $context_row->id);
		}
		//print $version_insert . "<br>";

		$contextid = $context_row->id;

	}
	else //insert the context and version
	{
		//print "CONTEXT NOT FOUND: <br>";
		$base = ($base_language == FALSE) ? 'false' : 'true';
		//print $context . " " . $base . "<br>";

		$context_insert = "insert into " . $db_prefix . "translate_context (context, base) values ('%s', $base)";
		$context_insert_result = db_query( $context_insert, $context );
		//print $context_insert . "<br>";
		
		$contextid = xttranslate_last_insert_id($db_prefix . 'translate_context', 'id');	

		//check to see if it's there for the current version...

		$version_insert_check = "select *
		from " . $db_prefix . "translate_context_version
		where contextid = %d and version = '%s'";
		
		$version_insert_check_result = db_query ($version_insert_check, $contextid, $version);
		
		if (pg_num_rows( $version_insert_check_result ) < 1 ) //if the version isn't found for this context
		{
			//insert it
			$version_insert = "insert into " . $db_prefix . "translate_context_version (version, contextid) values ( '%s', %d )";
			$version_result = db_query( $version_insert, $version, $contextid);
		}
	}
}

//fix for db_last_insert_id using wrong prefix
function xttranslate_last_insert_id( $table, $field )
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$query = "SELECT CURRVAL('" . $table . "_" . $field ."_seq')";
	$result = db_query($query);
	return db_result($result);
}

/*
**Creates a new consource, source, source location and source version in our database
*/
function xttranslate_process_source( $source, $contextid, $location, $version, &$consourceid, $base_language, $product = 'PostBooks' )
{

	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$product_id = xttranslate_get_product_id($product);

	//drupal_set_message($product_id);

	$source_check = "select *
	from " . $db_prefix . "translate_source
	where source = '%s'";
	
	if ($contextid == 8214)
	{
		printf( $source_check, $source );
	}
	$source_result = db_query( $source_check, $source );
	$source_row = db_fetch_object( $source_result );
	
	if ( !empty($source_row->source) ) //if source found
	{
		//check for entry already in consource
		$consource_check = "select id
		from " . $db_prefix . "translate_consource
		where contextid = %d and sourceid = %d";
	
		$consource_check_result = db_query($consource_check, $contextid, $source_row->id);
		
		if (pg_num_rows( $consource_check_result ) < 1) //if no consource entry yet
		{

			//create the new consource entry
			$consource_insert = "insert into " . $db_prefix . "translate_consource (sourceid, contextid) values (%d, %d)";
			$consource_result = db_query($consource_insert, $source_row->id, $contextid);
			//print $consource_insert . "<br>";
		
		
			//grab the new consourceid	
			$consource_id = xttranslate_last_insert_id($db_prefix . 'translate_consource', 'id');
			$consourceid = $consource_id;	

			//new - insert consource history
			//check to see if already in consource version table
                        $consource_version_check = "select *
                        from " . $db_prefix . "translate_consource_version
                        where consourceid = %d and version = '%s'";

                        $consource_version_check_result = db_query( $consource_version_check, $consourceid, $version );

												if ( pg_num_rows( $consource_version_check_result ) < 1 ) //if the version isn't already there
                        {
				$consource_version = "insert into " . $db_prefix . "translate_consource_version (consourceid, version) values (%d, '%s')";
				$consource_version_result = db_query($consource_version, $consourceid, $version);
			}
	
			//new - insert consource product history
			
			$consource_product = "insert into " . $db_prefix . "translate_consource_product (consource_id, product_id) values (%d, %d)";
			$consource_product_result = db_query($consource_product, $consourceid, $product_id);
			
		}
		else //assign the consource id and put into history table
		{
			$c_id = db_fetch_object($consource_check_result);
			$consourceid = $c_id->id;

			//new - insert consource history
			//check to see if already in consource version table	
			$consource_version_check = "select *
			from " . $db_prefix . "translate_consource_version
			where consourceid = %d and version = '%s'";
			$consource_version_check_result = db_query( $consource_version_check, $consourceid, $version );
			if ( pg_num_rows( $consource_version_check_result ) < 1 ) //if the version isn't already there
			{
				//insert it
				$consource_version = "insert into " . $db_prefix . "translate_consource_version (consourceid, version) values (%d, '%s')";
				$consource_version_result = db_query($consource_version, $consourceid, $version);			
			}
			
			//new - handle consource product history
			//check to see if the consource is already in the product history table
		
			$consource_product_check = "select * from " . $db_prefix . "translate_consource_product where consource_id = %d and product_id = %d";
			$consource_product_check_result = db_query($consource_product_check, $consourceid, $product_id);
			
			if (pg_num_rows($consource_product_check_result) < 1)
			{
				$consource_product = "insert into " . $db_prefix . "translate_consource_product (consource_id, product_id) values (%d, %d)";
	               $consource_product_result = db_query($consource_product, $consourceid, $product_id);
			}
		}

		//check for source location
		//print "CONSOURCEID: " . $consourceid . "<br>";
		$location_check = "select *
		from " . $db_prefix . "translate_source_location
		where location = '%s' and consourceid = %d";
	
		$location_result = db_query ($location_check, $location, $consourceid);
	
		if ( pg_num_rows($location_result) < 1) //if it's not already found for that consource
		{
			//insert the new source location
			$location_insert = "insert into " . $db_prefix . "translate_source_location (location, consourceid) values ('%s', %d)";
			$location_insert_result = db_query($location_insert, $location, $consourceid);
			//print $location_insert . "<br>";
			
		}
		else //it's found
		{
			//if this is the base language being imported
			if ($base_language)
			{
				//update the location of the context/source combination
				$update_consource = "update " . $db_prefix . "translate_source_location set location='%s' where consourceid = %d";
				$update_consource_result = db_query($update_consource, $location, $consourceid);
			}
		}

		//check for source version

		$version_check = "select *
		from " . $db_prefix . "translate_source_version
		where version = '%s' and sourceid = %d";
		
		$version_result = db_query( $version_check, $version, $source_row->id );
		
		if ( pg_num_rows($version_result) < 1)//if it's not already found for that source
		{
			//insert the new source version
			$version_insert = "insert into " . $db_prefix . "translate_source_version (version, sourceid) values ('%s', %d)";
			$version_insert_result = db_query($version_insert, $version, $source_row->id );
			//print $version_insert . "<br>";
		}
		
	}
	//else not found, insert all four
	else
	{
		//print "SOURCE NOT FOUND: <br>";
		//print $source . " " . $location . " " . $version . "<br>";
		$source_insert = "insert into 
		" . $db_prefix . "translate_source (source) values ('%s')";

		$source_result = db_query( $source_insert, $source);
		//print $source_insert . "<br>";

		//grab the new sourceid
		$sourceid = xttranslate_last_insert_id($db_prefix . 'translate_source', 'id');
		
		//create the new consource entry
		$consource_insert = "insert into " . $db_prefix . "translate_consource (sourceid, contextid) values (%d, %d)";
		$consource_result = db_query($consource_insert, $sourceid, $contextid);
		//print $consource_insert . "<br>";
		
		//grab the new consourceid	
		$consource_id = xttranslate_last_insert_id($db_prefix . 'translate_consource', 'id');
		$consourceid = $consource_id;	

		//print "CONSOURCEID: " . $consourceid . "<br>";

		//new - insert consource history

		$consource_version = "insert into " . $db_prefix . "translate_consource_version (consourceid, version) values (%d, '%s')";
		$consource_version_result = db_query($consource_version, $consourceid, $version);
		

		//new fifth entry - consource product history
		$consource_product = "insert into " . $db_prefix . "translate_consource_product (consource_id, product_id) values (%d, %d)";
          $consource_product_result = db_query($consource_product, $consource_id, $product_id);

		//insert the new source location
		$location_insert = "insert into " . $db_prefix . "translate_source_location (location, consourceid) values ('%s', %d)";
		$location_insert_result = db_query($location_insert, $location, $consource_id);
		//print $location_insert . "<br>";
			
		//insert the new source version
		$version_insert = "insert into " . $db_prefix . "translate_source_version (version, sourceid) values ('%s', %d)";
		$version_insert_result = db_query($version_insert, $version, $sourceid );
		//print $version_insert . "<br>";
		
	}
	
}

function xttranslate_admin_process_translation( $translation, $consourceid, $current_version, $new_version, $is_obsolete, $language_code, $country_code)
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$language_code = strtolower($language_code);
	$country_code = strtolower($country_code);
	
	//grab a translation with all its revisions
	$translation_check = "select a.id, a.translation, a.version 
	from " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation as a
	join " . $db_prefix . "translate_consource_version as b
	on b.consourceid = a.consourceid
	where b.consourceid = %d and b.version = '%s'
	";	

	//print "IN TRANSLATE CONSOURCEID: " . $consourceid . "<br>";

	$translation_check_result = db_query($translation_check, $consourceid, $current_version);

	if ( pg_num_rows($translation_check_result) > 0 ) //if there's some translation entry in the database previously
	{
		//print "TRANSLATIONS FOUND<br>";
		//$translation_check_result = db_query($translation_check, $consourceid, $current_version);
		//$found_translations = db_fetch_object($translation_check_result);

		while ($translation_row = db_fetch_object($translation_check_result) )
		//foreach($found_translations as $index => $translation_row)
		{
			/*
			if ($translation_row->version != '0.0') //if the translation or revision is not set to obsolete, update it
			{
				$update_translation = "update " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation set version = '%s' where id = %d";
				$update_translation_result = db_query($update_translation, $new_version, $translation_row->id);
				//print $update_translation;
			}
			*/	
		}
	}
	else //brand new translation
	{
		if ($is_obsolete == 1) //if the translation's marked as obsolete
		{
			//print "OBSOLETE TRANSLATION<br>";
			//set the version to 0.0
			//$xttranslate_insert = "insert into " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation(translation, consourceid, version, 
      //    	rev_number,revised_id,complete,\"user\") values ('%s', %d, '0.0', 0, 0, 1, 'Administrator')";

			//$xttranslate_insert_result = db_query($xttranslate_insert, $translation, $consourceid);
			//print $xttranslate_insert;
				
		}
		else
		{
			//print "NORMAL TRANSLATION<br>";
			//set the version to the new version value
			if (!empty($translation))
			{
				$xttranslate_insert = "insert into " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation(translation, consourceid, 
      	    	rev_number,revised_id,complete,\"user\") values ('%s', %d, 0, 0, 1, 'Administrator')";
		
				$xttranslate_insert_result = db_query($xttranslate_insert, $translation, $consourceid, $new_version);
				//print $xttranslate_insert;
			}
		}
	}	

}

/*
**Update translation entries for all languages available
**to our new version. If the translation isn't found, it's added.
* Currently NOT USED ANYMORE
*/

function xttranslate_update_translations($translation, $consourceid, $current_version, $new_version, $is_obsolete)
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$query = "select a.language as language,
     a.code as country_code, b.code as language_code
     from " . $db_prefix . "translate_languages as a
     inner join " . $db_prefix . "translate_language_codes as b
     on a.language = b.language
     join " . $db_prefix . "translate_country as c
     on lower(c.iso) = a.code
	where a.language != 'English'
     order by language asc";

     $allLanguages = db_query($query);
	
	//foreach ($allLanguages as $index => $language_row)
	while ($language_row = db_fetch_object($allLanguages) ) 
	{
		$language_code = $language_row->language_code;
		$country_code = $language_row->country_code;

		//grab all translations and its revisions for the current version
		$translation_check = "select a.id, a.translation, a.version, a.consourceid
	     from " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation as a
    	 	where a.consourceid = %d and a.version = '%s'";

		$translation_check_result = db_query($translation_check, $consourceid, $current_version);

		if ( pg_num_rows($translation_check_result) > 0 ) //if there's some translations found
		{
			while ($translation_row = db_fetch_object($translation_check_result) ) //go through and update them all
			{
				if ($translation_row->version != '0.0')
				{
					$update_translation = "update " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation set version = '%s' where id = %d";
                    	$update_translation_result = db_query($update_translation, $new_version, $translation_row->id);
				}
			}		
		}
		else //insert the new translation for that language
		{
			if ($is_obsolete == 1) //if the translation's marked as obsolete
		     {
          		//print "OBSOLETE TRANSLATION UPDATE<br>";
          		//set the version to 0.0
          		$xttranslate_insert = "insert into " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation(translation, consourceid, version,
          		rev_number,revised_id,complete,\"user\") values ('%s', %d, '0.0', 0, 0, 1, 'Administrator')";

          		$xttranslate_insert_result = db_query($xttranslate_insert, $translation, $consourceid, $new_version);
          		//print $xttranslate_insert;

     		}
     		else
    		 	{
          		//print "NORMAL TRANSLATION UPDATE<br>";
          		//set the version to the new version value
          		$xttranslate_insert = "insert into " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation(translation, consourceid, version,
          		rev_number,revised_id,complete,\"user\") values ('%s', %d, '%s', 0, 0, 1, 'Administrator')";

          		$xttranslate_insert_result = db_query($xttranslate_insert, $translation, $consourceid, $new_version);
          		//print $xttranslate_insert;
     		}

		}		
		
	}

}

/*
**returns an array of supported languages as language_code => language
**if langauage code passed in, returns language value
*/

function xttranslate_get_language_array( $lang = '')
{
	
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$lang_array = array();

	$query = "select language,code from " . $db_prefix . "translate_language_codes order by language";
	$language_result = @db_query( $query );
	if (!$language_result)
	{
		form_set_error('', 'Could not get languages from database.');
		return;
	}
	
	$language = pg_fetch_all( $language_result );
	//print_r($lang_array);
	foreach ($language as $row_number => $row)
	{
		$lang_array[$row['code']] = $row['language'];
	}

	//for(	$index = 0; $index < count($language); $index++)
	//{
	//	$lang_array[$language[$index]['code']] = $language[$index]['language'];
	//}

	//$return_value = $lang_array;
	//print_r($return_value);

	//while ( $language = db_fetch_object( $language_result ) )
     //{
	//	$lang_array[$language->code] = $language->language;
	//}

	$return_value = ( !empty($lang) ) ? $lang_array[$lang] : $lang_array; 

	return $return_value;
}

/*
**returns an array of supported country codes as country_code => language
**passing in a country code returns a country name
*/

function xttranslate_get_country_array( $cntry = '' )
{

	$db_prefix = variable_get('xttranslate_db_prefix', '');

	$country_array = array();

	$query = "select lower(iso) as iso, printable_name as country from " . $db_prefix . "translate_country";
	$country_result = @db_query( $query );
	if (!$country_result)
	{
		form_set_error('', 'Count not get countries from database.');
		return;
	}

	while ( $country = db_fetch_object( $country_result ) )
     {
          $country_array[$country->iso] = $country->country;    
     }

     $return_value = ( !empty($cntry) ) ? $country_array[$cntry] : $country_array;
	return $return_value;

}



//creates a new language table
function xttranslate_createTranslationTable($language_code, $country_code, $official = '1')
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	//check languages table for new language
	$language_check = "select *
	from " . $db_prefix . "translate_languages
	where code = '%s' and lower(language) = lower('%s')";
	
	$language = xttranslate_get_language_array($language_code);

	$language_result = db_query($language_check, $country_code, $language);
	if (pg_num_rows($language_result) < 1) //if it's not there
	{
		//make the new table
		$create_query = '
		CREATE TABLE ' . $db_prefix . 'translate_' . strtolower($language_code) . '_' . strtolower($country_code) . '_translation
		(
   			id serial NOT NULL, 
   			translation text, 
   			consourceid serial NOT NULL, 
   			revised_id serial, 
   			rev_number int_unsigned DEFAULT 0, 
   			complete int_unsigned DEFAULT 0, 
   			"user" text, 
   			"time" timestamp without time zone DEFAULT now(), 
    			PRIMARY KEY (id), 
    			FOREIGN KEY (consourceid) REFERENCES ' . $db_prefix . 'translate_consource (id)    ON UPDATE NO ACTION ON DELETE NO ACTION
		) WITH (OIDS=FALSE)
		';
		$create_result = db_query($create_query);
		
		//add the new language to the languages table
		$language = xttranslate_get_language_array($language_code);
		$language_insert = "insert into " . $db_prefix . "translate_languages (language,code,official) values ('%s', '%s', '" . $official . "')";
		
		$language_insert_result = db_query($language_insert, $language, $country_code);				
	}
}


//new translations updater
function xttranslate_sync_translations( $version, $old_version = 0, $product)
{

	$db_prefix = variable_get('xttranslate_db_prefix', '');

	//get all languages
	$all_languages = "select a.language as language,
     a.code as country_code, b.code as language_code
     from " . $db_prefix . "translate_languages as a
     inner join " . $db_prefix . "translate_language_codes as b
     on a.language = b.language
     join " . $db_prefix . "translate_country as c         
     on lower(c.iso) = a.code
     where a.language != 'English'
     order by language asc";

	$all_languages_result = db_query( $all_languages );
	
	while ( $language = db_fetch_object($all_languages_result) )
	{
		//get all the missing entries per each individual language
		//and insert them into their respective table
		
		print "Doing $language_code $country_code\n";

		$language_code = $language->language_code;
		$country_code = $language->country_code;
		
		$missing = "
		insert into " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation(translation, consourceid, 
                    rev_number,revised_id,complete,\"user\")
		select e.translation, e.consourceid, e.rev_number, e.revised_id, e.complete, e.user
     	from " . $db_prefix . "translate_context as a
     	join " . $db_prefix . "translate_context_version as b
     	on a.id = b.contextid
     	join " . $db_prefix . "translate_consource as c
     	on c.contextid = a.id
	join " . $db_prefix . "translate_source z
	on z.id = c.sourceid
     	join " . $db_prefix . "translate_consource_version as d
    		on d.consourceid = c.id
     	join " . $db_prefix . "translate_en_us_translation as e
     	on e.consourceid = c.id
     	where b.version = '%s' and d.version = '%s' 
     	and z.id not in (
 			select distinct n.sourceid
			from " . $db_prefix . "translate_" . $language_code . "_" . $country_code . "_translation as j
			inner join ac_translate_consource n on n.id = j.consourceid
			where j.version = '%s' order by n.sourceid
     	)	
		";

		//if old_version is still 0, we're syncing with the current version, else we're syncing with the new base file
		$sub_version = ($old_version == 0) ? $version : $old_version;
	
		$missing_result = db_query($missing, $version, $version, $sub_version);
		
		//still need to update remaining translation entries if syncing with base
		
		if ($old_version != 0)
		{
			$update_translation = "update " . $db_prefix . "translate_" . $language_code . "_" . $country_code . 
			"_translation set version = '$version' where version = '$old_version' and consourceid in ( ";
			$update_translation .= "
			select consource_id from ac_translate_consource_product a 
			inner join ac_translate_consource_version b on b.consourceid = a.consource_id 
			where product_id=" . xttranslate_get_product_id($product) . " and b.version = '$old_version'
			) ";
      $update_translation_result = db_query($update_translation);
		}
	}
	

}

function xttranslate_newsync($version, $old_version = 0, $product)
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');

	//get all languages
  $all_languages = "select a.language as language,
     a.code as country_code, b.code as language_code
     from {$db_prefix}translate_languages as a
     inner join {$db_prefix}translate_language_codes as b
     on a.language = b.language
     join {$db_prefix}translate_country as c
     on lower(c.iso) = a.code
     where a.language != 'English'
     order by language asc";
     
  $all_languages_result = db_query( $all_languages );

  while ( $language = db_fetch_object($all_languages_result) )
  {
		print "Doing {$language->language_code} {$language->country_code}\n";
		$query = "
		insert into {$db_prefix}translate_{$language->language_code}_{$language->country_code}_translation
		(translation, consourceid, rev_number, revised_id, complete, \"user\")
		select '' as translation, consourceid, 0 as rev_number, 0 as revised_id, 1 as complete, 'Administrator' as \"user\" from (
		select distinct consourceid 
		from {$db_prefix}translate_consource_version 
		where version = '$version' 
		and consourceid not in (
			select distinct consourceid 
			from {$db_prefix}translate_{$language->language_code}_{$language->country_code}_translation
		)
		) as bar
		";
		db_query($query);
		/*
		while($row = db_fetch_object($result))
		{
			$insert = "
			insert into {$db_prefix}translate_{$language->language_code}_{$language->country_code}_translation(translation, consourceid,
      rev_number,revised_id,complete,\"user\") values ('', {$row->consourceid}, 0, 0, 1, 'Administrator')";
			db_query($insert);	
		}
		*/
	}
}

function xttranslate_get_product_id($product)
{
	$db_prefix = variable_get('xttranslate_db_prefix', '');
	
	$query = "select id from " .  $db_prefix . "translate_product_version where product = '%s'";
	
	$the_product = db_fetch_object( db_query($query, $product) );

	if (empty($the_product->id))
	{
		//grab the max id number and increment by one, since a new product has been inserted and the id isn't yet available to the script from the transaction
		$query = "select max(id)+1 as max from " . $db_prefix . "translate_product_version";
		
		$id = db_fetch_object( db_query($query) );
		
		return $id->max;
	}
	
	return $the_product->id;
}
