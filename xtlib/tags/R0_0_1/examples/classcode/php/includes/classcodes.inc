<?php

/** 
 * classcodes.inc
 */

register_callback('create','classcode_create_form');
register_callback('edit','classcode_edit_form');
register_callback('view','classcode_search_form');

function classcode_search_form($p=null) {
  if(is_null($p)) error('Error in form submission for classcode search');
  if(!empty($p['id']) && !is_numeric($p['id'])) redirect('view/all','ID must be numeric');
  elseif(empty($p['id']) &&
    (!empty($p['description']) || !empty($p['code']))) {
      $xtccs = new xtClassCodeStorable();
      $xtcc = $xtccs->getExample();
      if(!empty($p['description']))  
        $xtcc->setProperty('description',$p['description']);
      if(!empty($p['code']))
        $xtcc->setProperty('code',$p['code']);
      $xtccs->exec();
      $res = $xtccs->result();
      if(!is_array($res) || count($res) <= 0)
        redirect('view/all','There were no results returned for your search');
      $_SESSION['search-matches'] = array();
      foreach($res as $cc)
        $_SESSION['search-matches'][] = $cc->getId();
      redirect('view/matches','The following classcodes were found according to your search');
  }
  elseif(!empty($p['id']) && is_numeric($p['id'])) {
    $xtccs = new xtClassCodeStorable();
    $xtcc = $xtccs->getExample();
    $xtcc->load($p['id']);
    if(!$xtcc->isValid())
      redirect('view/all','There were no results returned for your search');
    $_SESSION['search-matches'] = array();
    $_SESSION['search-matches'][] = $xtcc->getId();
    redirect('view/matches','The following classcodes were found according to your search');
  }
  else redirect('view/all','Search condition failure');
}

function classcode_matches() {
  $matches = $_SESSION['search-matches'];
  unset($_SESSION['search-matches']);
  if(!is_array($matches) || count($matches) <= 0)
    return '<span>Sorry, there are no matches to report</span>';
  $trows = '';
  $i=0;
  foreach($matches as $id) {
    $cc = new xtClassCode();
    $cc->load($id);
    $trows .= '<tr class="';
    $trows .= ($i%2==0?'even':'odd').'" id="'.$cc->getId().'"><td>';
    $trows .= $cc->getProperty('code').'</td><td>';
    $trows .= $cc->getProperty('description').'</td></tr>';
    ++$i;       
  }
  $html = fc('classcode-table.thtml');
  $html = templater::inject($html,array('rows'=>$trows));
  return $html;
}

function classcode_create_form($p=null) {
  if(is_null($p)) error('Error in form submission for classcode creation');
  if($p['cancel']) redirect('view');
  if($p['code'] == 'classcode code' || $p['description'] == 'classcode description')
    redirect('create','Cannot create a new classcode with default values');
  $xtcc = new xtClassCode();
  $xtcc->setProperty('code',$p['code']);
  $xtcc->setProperty('description',$p['description']);
  $xtcc->save();
  redirect('view/all','Created new classcode successfully');
}

function classcode_edit_form($p=null) {
  if(is_null($p)) error('Error in form submission for classcode editing');
  if($p['cancel']) redirect('edit');
  $xtcc = new xtClassCode();
  $xtcc->load($p['id']);
  $xtcc->setProperty('code',$p['code']);
  $xtcc->setProperty('description',$p['description']);
  $xtcc->save();
  redirect('edit','Classcode "'.$p['code'].'" has been edited successfully');
}

function classcode_edit($id=null) {
  if(is_null($id) || !is_numeric($id) || preg_match('/\D/',$id) != 0) redirect('edit','Invalid classcode id format');
  $xtcc = new xtClassCode();
  $xtcc->load($id);
  $values = array(
    'code' => $xtcc->getProperty('code'),
    'description' => $xtcc->getProperty('description'),
    'id' => $id,
  );
  $html = fc('classcode-edit-form.thtml');
  $html = templater::inject($html,$values);
  return $html;
}

function classcode_view($search=null) {
    // message for failed results
    $nores = '<p><span class="ui-icon ui-icon-info" style="float:left; margin-right: 3em;"></span><span>No results were returned</span></p>';
  // get a new xtClassCodeStorable object
  // which is nothing more than a wrapper object
  // for a xtStorableQuery<xtClassCode> object
  $xtccs = new xtClassCodeStorable();

  // we have to access the internal pointer through this method
  $xtcc = $xtccs->getExample();

  // if the following returns true...
  if(is_null($search) || $search == 'all')
    // we want to search for all classcodes
    // so we use a regular expression in native PHP form
    // and it automatically gets converted into a boost::regex
    // and handled appropriately for us
    $xtcc->setProperty('code','/.*/');

  // we call exec on the xtClassCodeStorable object
  $xtccs->exec();

  // we retrieve any results
  // instead of retrieving a std::set<xtClassCode*>
  // we get a native PHP array of xtClassCode references
  $res = $xtccs->result();

  if(!is_array($res) || count($res) <= 0)
    // we had no returned results
    return $nores;

  // we need to render a table of the results
  $trows = '';
  $i=0;
  foreach($res as $cc) {
    $trows .= '<tr class="';
    $trows .= ($i%2==0?'even':'odd').'" id="'.$cc->getId().'"><td>';
    $trows .= $cc->getProperty('code').'</td><td>';
    $trows .= $cc->getProperty('description').'</td></tr>';
    ++$i;       
  }
  $html = fc('classcode-table.thtml');
  $html = templater::inject($html,array('rows'=>$trows));
  return $html;
}

?>
