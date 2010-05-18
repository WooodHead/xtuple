debugger;

var _save = mywindow.findChild("_save");
_save.clicked.connect(billingSave);
         

function billingSave()
{
  var params = new Object();
  params.empcode = mywindow.findChild("_code").text;

  var qry = toolbox.executeQuery('SELECT getempid(<? value("empcode") ?>) as empid;',params);

  if(qry.lastError().type != QSqlError.NoError)
  {
    toolbox.messageBox("critical", mywindow,
                       qsTr("Database Error"), qry.lastError().text);
    return;
  }

  if (qry.first())
  {
    params.empid = qry.value("empid");
    params.rate = mywindow.findChild("_externalRate").localValue;

    if (params.rate == null)
    {
      params.rate = 0;
    }

    var q = toolbox.executeDbQuery("te","addteemprate",params);
    
  }
}
