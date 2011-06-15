
var _fromitem 		= mywindow.findChild("_source");
var _copy             		= mywindow.findChild("_copy");
var _targetItemNumber        	= mywindow.findChild("_targetItemNumber");


toolbox.coreDisconnect(_copy, "clicked()", mywindow, "sExpenseCopy()");
_copy.clicked.connect(sExpenseCopy);

function sExpenseCopy(){

    //update the new item with the expense flag

    var params = new Object();   

    params.item = _fromitem.id();
    params.target = _targetItemNumber.text;

    var q = toolbox.executeQuery('select teexp_id as exp_id, '
           + 'teexp_expcat_id,teexp_accnt_id '
           + 'from te.teexp,item where '
           + 'item_id = teexp_id '
           + 'and item_id = <? value("item") ?> ;',params);

    if (q.first())
    {
      params.teexp_expcat_id = q.value("teexp_expcat_id");
      params.teexp_accnt_id = q.value("teexp_accnt_id");

      var qry = toolbox.executeQuery('select getitemid(<? value("target") ?>) as targetid;',params);

      if (qry.first())
      {
      params.targetid = qry.value("targetid");
 
        var q = toolbox.executeQuery('insert into te.teexp('
           + 'teexp_id,teexp_expcat_id,teexp_accnt_id) '
           + 'values(<? value("targetid") ?>,'
           + '<? value("teexp_expcat_id") ?>,'
           + '<? value("teexp_accnt_id") ?>);',params);
      }
    } 
}