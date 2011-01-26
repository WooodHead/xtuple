<?php


/**
 * helpers.inc
 */

function render_table($res=null,$callback=null,$show=null,$alter=null) {
    if(is_null($res) || !is_array($res) || count($res) <= 0)
        return '<span class="notify">No table data available</span>';
    if(is_null($callback)) $callback = function() { return true; };
    if(is_null($show)) $show = function() { return true; };
    if(is_null($alter)) $alter = function($k,$col) { return $col; };
    $html = '<table border="0" cellpadding="10" cellspacing="0">';
    $html .= render_table_cols($res,$show);
    $html .= render_table_rows($res,$callback,$show,$alter);
    $html .= '</table>';
    return $html;
}

function render_table_cols($res=null,$show=null) {
    $cols = $res[0];
    $html = '<thead><tr class="table-header-row">';
    foreach($cols as $colname) {
        if($show($colname))
            $html .= '<th>'.$colname.'</th>';        
    }
    $html .= '</tr></thead>';
    return $html;
}

function render_table_rows($res=null,$callback=null,$show=null,$alter=null) {
    $rows = $res[1];
    $html = '';
    $i=0;
    foreach($rows as $row) {
        $html .= '<tr class="'.($i%2==0?'even':'odd').'"';
        $html .= ' name="'.($callback($row['id'])).'">';
        foreach($row as $k => $col) {
            if($show($k)) {
                $col = $alter($k,$col);
                $html .= '<td>'.$col.'</td>';
            }
        }
        $html .= '</tr>';
        ++$i;
    }
    return $html;
}    

function fc($fn=null) {
    global $basepath;
    $path = $basepath.'/theme/html/'.$fn;
    $contents = file_get_contents($path);
    return $contents;
}

?>
