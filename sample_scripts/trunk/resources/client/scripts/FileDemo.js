/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
function filecheck()
{
  var pathstring = toolbox.fileDialog(mywindow, qsTr("Select Text File"),
                                      QDir.homePath(), "Text Files (*.txt)", 0, 0);
  if (QFile.exists(pathstring))
    var msgresp = QMessageBox.warning(mywindow, qsTr("File Check"), qsTr("Exists"));
  else
    var msgresp = QMessageBox.warning(mywindow, qsTr("File Check"), qsTr("Not Found"));
}

function filecopy()
{
  var oldpath = toolbox.fileDialog(mywindow, qsTr("Select File"),
                                   "", "Text Files (*.txt)", 0, 0);
  var newpath = toolbox.fileDialog(mywindow, qsTr("Save Copy"),
                                   "", "Text Files (*.txt)", 0, 1);
  var rtn = QFile.copy(oldpath, newpath);
  if (rtn)
    var msgresp = QMessageBox.warning(mywindow, qsTr("File Copy"), qsTr("Complete"));
  else
    var msgresp = QMessageBox.warning(mywindow, qsTr("File Copy"), qsTr("Error"));
}

function filedelete()
{
  var pathstring = toolbox.fileDialog(mywindow, qsTr("Select File to Delete"),
                                      "", "Text Files (*.txt)", 0, 0);
  var rtn = QFile.remove(pathstring);
  if (rtn)
    var msgresp = QMessageBox.warning(mywindow, qsTr("File Delete"), qsTr("Complete"));
  else
    var msgresp = QMessageBox.warning(mywindow, qsTr("File Delete"), qsTr("Error"));
}

function viewfile()
{
  var pathstring = toolbox.fileDialog(mywindow, qsTr("Open Text File"),
                                      "", "Text Files (*.txt)", 0, 0);
  mywindow.findChild("_CurrentPath").text = pathstring;
  toolbox.openUrl(pathstring);
}

function readfile()
{
  var pathstring = toolbox.fileDialog(mywindow, qsTr("Open Text File"),
                                      "", "Text Files (*.txt)", 0, 0);
  mywindow.findChild("_FileName").text = pathstring;
  mywindow.findChild("_readText").plainText = toolbox.textStreamRead(pathstring);
  if (pathstring == "error")
    var msgresp = QMessageBox.warning(mywindow, qsTr("File Read"), qsTr("File Not Found"));
  else
    var msgresp = QMessageBox.warning(mywindow, qsTr("File Read"), qsTr("Complete"));
}

function writefile()
{
 var pathstring = toolbox.fileDialog(mywindow, qsTr("Save Text File"),
                                     "", "Text Files (*.txt)", 0, 1);
 var optext = mywindow.findChild("_WriteText").plainText;
 var rtn = toolbox.textStreamWrite(pathstring,optext);
 if (rtn)
   var msgresp = QMessageBox.warning(mywindow, qsTr("File Complete"), qsTr("Complete"));
 else var msgresp = QMessageBox.warning(mywindow, qsTr("File Read"), qsTr("Write Error"));
}


function renamefile()
{
  var fold = toolbox.fileDialog(mywindow, qsTr("Select File"),
                                "", "Text Files (*.txt)", 0,0);
  var fnew = toolbox.fileDialog(mywindow, qsTr("Rename File"),
                                "", "Text Files (*.txt)", 0,1);
  var rtn = QFile.rename(fold, fnew);
  if (rtn)
    var msgresp = QMessageBox.warning(mywindow, qsTr("Rename File"), qsTr("Complete"));
  else
    var msgresp = QMessageBox.warning(mywindow, qsTr("Rename File"), qsTr("Error"));
}

function makepath()
{
  var pathstring = mywindow.findChild("_mkpathtext").text;

  if (QDir.homePath().mkpath(pathstring))
    var msgresp = QMessageBox.warning(mywindow, qsTr("Make Path"), qsTr("Complete"));
  else
    var msgresp = QMessageBox.warning(mywindow, qsTr("Make Path"), qsTr("Error"));
}

function removepath()
{
  var pathstring = mywindow.findChild("_mkpathtext").text;
  if (QDir.homePath().rmpath(pathstring))
    var msgresp = QMessageBox.warning(mywindow, qsTr("Remove Path"), qsTr("Complete"));
  else
    var msgresp = QMessageBox.warning(mywindow, qsTr("Remove Path"), qsTr("Error"));
}

mywindow.findChild("_close").clicked.connect(mywindow, "close");
mywindow.findChild("_FileExsits").clicked.connect(filecheck);
mywindow.findChild("_copy").clicked.connect(filecopy);
mywindow.findChild("_delete").clicked.connect(filedelete);
mywindow.findChild("_viewUrl").clicked.connect(viewfile);
mywindow.findChild("_ReadFile").clicked.connect(readfile);
mywindow.findChild("_WriteFile").clicked.connect(writefile);
mywindow.findChild("_renameFile").clicked.connect(renamefile);
mywindow.findChild("_makePath").clicked.connect(makepath);
mywindow.findChild("_removePath").clicked.connect(removepath);

mywindow.findChild("_HomePath").text = QDir.homePath();
mywindow.findChild("_CurrentPath").text = QDir.currentPath();
mywindow.findChild("_RootPath").text = QDir.rootPath();
