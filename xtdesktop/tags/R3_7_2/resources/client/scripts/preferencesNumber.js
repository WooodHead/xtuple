try
{
  var _limit = mywindow.findChild("_limit");
  var _path;

  mydialog.accepted.connect(mysave);
}
catch (e)
{
  QMessageBox.critical(mainwindow, "preferencesNumber",
                      "preferencesNumber.js exception: " + e);
}

function set(params)
{
  if ("path" in params)
    _path = params.path;

  if ("limit" in params)
    _limit.value = params.limit;
  else
    _limit.value = 10;
}

function mysave()
{
  try
  {
    preferences.set(_path + "/limit", _limit.value);
  }
  catch (e)
  {
    QMessageBox.critical(mainwindow, "preferencesNumber",
                        "mysave exception: " + e);
  }
}