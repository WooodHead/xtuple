/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

include("xtte");
xtte.projectGantt = new Object;

var _webView = mywindow.findChild("_webView");
var _prjid;
var _prjNumber;
var _prjName;
var _startDate;
var _dueDate;
var _JSCode;
var _CSSCode;
var _qry;
var _page;
var _gantt;

set = function (input) 
{ 
  if ("startDate" in input)
    _startDate = input.startDate;

  if ("dueDate" in input)
    _dueDate = input.dueDate;

  if ("prjName" in input)
    _prjName = input.prjName;

  if ("prjNumber" in input)
  {
    _prjNumber = input.prjNumber;
    qry = toolbox.executeDbQuery("projectGantt","getprj",input);
    if (qry.first())
      _prjid = qry.value("prj_id");

    xtte.projectGantt.populate();
  }
}

xtte.projectGantt.populate = function()
{

    _page = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
    _page = _page + '<html><head>';
    _page = _page + '<style type = "text/css">' + _CSSCode + '</style>';
    _page = _page + '<script language="javascript">' + _JSCode + '</script>';
    _page = _page + '</head><body bgcolor="#F0F0F0"><div class="gantt" id="GanttChartDIV"></div></body></html>';

    _gantt = "<script>";
    _gantt = _gantt + "var g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day');";
    _gantt = _gantt + "g.setShowRes(0);";
    _gantt = _gantt + "g.setShowDur(0);";
    _gantt = _gantt + "g.setShowComp(0);";
    _gantt = _gantt + "g.setDateInputFormat('dd/mm/yyyy');";
    _gantt = _gantt + "g.setCaptionType('Resource');";
    _gantt = _gantt + "if (g) {";
    _gantt = _gantt + "g.AddTaskItem(new JSGantt.TaskItem(" + _prjid + ", '" + _prjName + "', '" + _startDate + "', '" + _dueDate + "', '000000', '', 0, '', 0, 1, 0, 1));";

    var j = 0;
    
    params = new Object;
    params.prj_id = _prjid;
    qryTask = toolbox.executeDbQuery("projectGantt","tasks",params);
    while(qryTask.next()) 
    {
      j = j + 1;
      var barColor = "000000";
      if (j == 1) barColor = "4F81BD";
      if (j == 2) barColor = "C0504D";
      if (j == 3) barColor = "9BBB59";
      if (j == 4) barColor = "8064A2";
      if (j == 5) barColor = "4BACC6";
      if (j == 6) { barColor = "F79646"; j = 0;}

      _gantt = _gantt + "g.AddTaskItem(new JSGantt.TaskItem(" + _prjid + qryTask.value("prjtask_id") + ", '" + qryTask.value("prjtask_name") + "', '" + qryTask.value("start_date") + "', '" + qryTask.value("due_date") + "', '" + barColor + "', '', 0, '', 0, 0, " + _prjid + ", 1));";
    }

    _gantt = _gantt + "g.Draw();";
    _gantt = _gantt + "g.DrawDependencies();";
    _gantt = _gantt + "}";
    _gantt = _gantt + "else {";
    _gantt = _gantt + ' alert("not defined");';
    _gantt = _gantt + "  }";
    _gantt = _gantt + "</script>";
     
    _webView.setHtml(_page + _gantt);
}

// Initialize
qry = toolbox.executeDbQuery("projectGantt","jsgantt");
if (qry.first());
  _JSCode = qry.value("script_source");

qry = toolbox.executeDbQuery("projectGantt","jsganttcss");
if (qry.first());
  _CSSCode = qry.value("script_source");

// Connections
mywindow.findChild("_close").clicked.connect(mywindow, "close");