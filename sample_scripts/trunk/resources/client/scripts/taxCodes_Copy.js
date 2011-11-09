function copyClicked()
{
  var params = new Object;
  params.tax_id = mywindow.findChild("_tax").id();

  var qry = toolbox.executeQuery("INSERT INTO tax"
                                +"      (tax_code, tax_descrip,"
                                +"       tax_sales_accnt_id, tax_taxclass_id,"
                                + "      tax_taxauth_id, tax_basis_tax_id) "
                                +"SELECT tax_code||'_copy', tax_descrip,"
                                +"       tax_sales_accnt_id, tax_taxclass_id,"
                                + "      tax_taxauth_id, tax_basis_tax_id"
                                +"  FROM tax"
                                +" WHERE(tax_id=<? value('tax_id') ?>);", params);
  if(qry.numRowsAffected()<1)
  {
    QMessageBox.warning(mywindow, qsTr("Copy Failed"),
                        qsTr("<p>There was an error copying the selected Tax Code. "
                           + "Please check the Database Logs for additional information."));
    return;
  }

  mywindow.sFillList();
}

var btnView = mywindow.findChild("_view");
var newbutton = toolbox.createWidget("QPushButton", mywindow, "_copyButton");
newbutton.text=qsTr("Cop&y");
newbutton.enabled=false;
newbutton.clicked.connect(copyClicked);

var layout = toolbox.widgetGetLayout(btnView);
layout.addWidget(newbutton);

var taxlist = mywindow.findChild("_tax");
taxlist.valid.connect(newbutton, "setEnabled");
