var te;
if (!te)
  te = new Object;

te.ItemSql = "SELECT item_id,item_number,item_descrip1,item_descrip2, "
           + "       item_type,item_config,item_upccode,uom_name "
           + "FROM item JOIN uom ON (uom_id=item_inv_uom_id) "
           + "          JOIN te.teexp ON (teexp_id=item_id) "
           + "WHERE item_type='R' "

te.newMode 	= 0;
te.editMode	= 1;
te.viewMode	= 2;

te.errorCheck = function (q)
{
  if (q.lastError().type != QSqlError.NoError)
  {
    toolbox.messageBox("critical", mywindow,
                        qsTr("Database Error"), q.lastError().text);
    return false;
  }

  return true;
}