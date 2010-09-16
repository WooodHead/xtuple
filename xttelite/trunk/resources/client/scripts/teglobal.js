var _newMode 	= 0;
var _editMode	= 1;
var _viewMode	= 2;

function errorCheck(q)
{
  if (q.lastError().type != QSqlError.NoError)
  {
    toolbox.messageBox("critical", mywindow,
                        qsTr("Database Error"), q.lastError().text);
    return false;
  }

  return true;
}