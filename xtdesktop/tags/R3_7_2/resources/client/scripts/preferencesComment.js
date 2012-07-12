try
{
  var _usr       = mywindow.findChild("_usr");
  var _type      = mywindow.findChild("_type");
  var _source    = mywindow.findChild("_source");
  var _dates     = mywindow.findChild("_dates");
  var startdate;
  var enddate;

  if (!privileges.check("AccessAdditionalUser"))
    _usr.hide();
  else if(privileges.check("AccessAdditionalUser"))
    _usr.show();

  _type.addColumn("Comment Type",  -1,  1, true, "commenttype_name");
  _source.addColumn("Comment Source",  -1,  1, false, "cmntsource_name");
  _source.addColumn("Comment Source",  -1,  1, true, "cmntsource_fullname");
  _usr.addColumn("User Name",  -1,  1, true, "usr_username");

  populate();
  mydialog.accepted.connect(save);
}
catch (e)
{
  QMessageBox.critical(mywindow, "preferencesComment",
                       "preferencesComment.js exception: " + e);
}

function set(params)
{
  var prefusr = preferences.value("MonitoredCommentUsrs");
  var preftyp = preferences.value("MonitoredCommentTypes");
  var prefsrc = preferences.value("MonitoredCommentSrcs");

  var getDate = "SELECT CURRENT_DATE + CAST(<? literal(\"offSet\") ?> AS INTEGER) AS datevalue;";

  params.offSet = ((preferences.value("MonitoredCommentStrtDate") != '')?preferences.value("MonitoredCommentStrtDate"):-1);
  var data = toolbox.executeQuery(getDate, params);
  if (data.first())
    _dates.setStartDate(data.value("datevalue"));
  else if (data.lastError().type != QSqlError.NoError)
  {
    QMessageBox.critical(mainwindow, qsTr("Database Error"),
                         data.lastError().text);
    return;
  }

  params.offSet = ((preferences.value("MonitoredCommentEndDate") != '')?preferences.value("MonitoredCommentEndDate"):0);
  var data = toolbox.executeQuery(getDate, params);
  if (data.first())
    _dates.setEndDate(data.value("datevalue"));
  else if (data.lastError().type != QSqlError.NoError)
  {
    QMessageBox.critical(mainwindow, qsTr("Database Error"),
                         data.lastError().text);
    return;
  }

  if (prefusr == '')
  {
    var qry = "SELECT usr_id FROM usr WHERE (usr_username = current_user);";
    var data = toolbox.executeQuery(qry, -1);
    if (data.first())
      _usr.setId(data.value("usr_id"));
    else if (data.lastError().type != QSqlError.NoError)
    {
      QMessageBox.critical(mainwindow, qsTr("Database Error"),
                           data.lastError().text);
      return;
    }
  }
  else
  {
    var usrList = new Array();
    usrList = prefusr.split(",");
    for (var i in usrList)
      _usr.setId(usrList[i], false);
  }

  var typList = new Array();
  if (preftyp == '')
    _type.setId(0);
  else
  {
    typList = preftyp.split(",");
    for (var j in typList)
      _type.setId(typList[j], false);
  }

  var srcList = new Array();
  if (prefsrc == '')
    _source.setId(1);
  else
  {
    srcList = prefsrc.split(",");
    for (var k in srcList)
      _source.setId(srcList[k], false);
  }
}

function populate()
{
  try
  {
    _type.clear();
    _type.populate(toolbox.executeDbQuery("desktop","cmmntPrefType"));
    _source.clear();
    _source.populate(toolbox.executeDbQuery("desktop","cmmntPrefSrc"));
    if (privileges.check("AccessAdditionalUser"))
    {
      _usr.clear();
      _usr.populate(toolbox.executeDbQuery("desktop","cmmntPrefUser"));
    }
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, "preferencesComment",
                         "populateType exception: " + e);
  }
}

function save()
{
  var typList = new Array();
  var selectedTyp = _type.selectedItems();
  for (var i = 0; i < selectedTyp.length; i++)
  {
    if (selectedTyp[i].id() != 0)
      typList[i] = selectedTyp[i].id();
  }
  preferences.set("MonitoredCommentTypes",  typList.join(","));

  var srcList = new Array();
  var selectedSrc = _source.selectedItems();
  for (var i = 0; i < selectedSrc.length; i++)
  {
    if (selectedSrc[i].id() != 1)
      srcList[i] = selectedSrc[i].id();
  }
  preferences.set("MonitoredCommentSrcs",  srcList.join(","));

  if (privileges.check("AccessAdditionalUser"))
  {
    var usrList = new Array();
    var selectedUsr = _usr.selectedItems();
    for (var i = 0; i < selectedUsr.length; i++)
      usrList[i] = selectedUsr[i].id();
    preferences.set("MonitoredCommentUsrs",  usrList.join(","));
  }

  var params = new Object();
  params.startdate1 = _dates.startDate;
  var qryStdate = "SELECT (<? value(\"startdate1\") ?>::DATE - (current_date)) AS difference1;";
  var data1 = toolbox.executeQuery(qryStdate,params);
  if (data1.first())
    var strtDateoffSet = data1.value("difference1");
  else if (data1.lastError().type != QSqlError.NoError)
  {
    QMessageBox.critical(mywindow, qsTr("Database Error"),
                         data1.lastError().text);
    mywindow.reject();
  }

  params.enddate1 = _dates.endDate;
  var qryEnddate = "SELECT (<? value(\"enddate1\") ?>::DATE - (current_date)) AS difference2;";
  var data2 = toolbox.executeQuery(qryEnddate,params);
  if (data2.first())
    var endDateoffSet = data2.value("difference2");
  else if (data2.lastError().type != QSqlError.NoError)
  {
    QMessageBox.critical(mywindow, qsTr("Database Error"),
                         data2.lastError().text);
    mywindow.reject();
  }

  preferences.set("MonitoredCommentStrtDate", strtDateoffSet);
  preferences.set("MonitoredCommentEndDate", endDateoffSet);
}
