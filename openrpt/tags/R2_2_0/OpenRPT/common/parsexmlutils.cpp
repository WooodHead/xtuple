/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2007 by OpenMFG, LLC
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 * Please contact info@openmfg.com with any questions on this license.
 */

#include "parsexmlutils.h"
#include "reportpageoptions.h"

#include <qdom.h>


//
// Class ORObject 
//
ORObject::ORObject() { }
ORObject::~ORObject() { }

bool ORObject::isLine() { return FALSE; }
bool ORObject::isLabel() { return FALSE; }
bool ORObject::isField() { return FALSE; }
bool ORObject::isText() { return FALSE; }
bool ORObject::isBarcode() { return FALSE; }
bool ORObject::isImage() { return FALSE; }
bool ORObject::isGraph() { return FALSE; }

ORLineData * ORObject::toLine() { return 0; }
ORLabelData * ORObject::toLabel() { return 0; }
ORFieldData * ORObject::toField() { return 0; }
ORTextData * ORObject::toText() { return 0; }
ORBarcodeData * ORObject::toBarcode() { return 0; }
ORImageData * ORObject::toImage() { return 0; }
ORGraphData * ORObject::toGraph() { return 0; }


//
// class OR*Data
//
bool ORLineData::isLine() { return TRUE; }
ORLineData * ORLineData::toLine() { return this; }

bool ORLabelData::isLabel() { return TRUE; }
ORLabelData * ORLabelData::toLabel() { return this; }

bool ORFieldData::isField() { return TRUE; }
ORFieldData * ORFieldData::toField() { return this; }

bool ORTextData::isText() { return TRUE; }
ORTextData * ORTextData::toText() { return this; }

bool ORBarcodeData::isBarcode() { return TRUE; }
ORBarcodeData * ORBarcodeData::toBarcode() { return this; }

bool ORImageData::isImage() { return TRUE; }
ORImageData * ORImageData::toImage() { return this; }

bool ORGraphData::isGraph() { return TRUE; }
ORGraphData * ORGraphData::toGraph() { return this; }

ORDetailGroupSectionData::ORDetailGroupSectionData()
{
    name = QString::null;
    column = QString::null;
    pagebreak = BreakNone;
    _subtotCheckPoints.clear();
    head = 0;
    foot = 0;
}

ORDetailSectionData::ORDetailSectionData()
{
    name = QString::null;
    pagebreak = BreakNone;
    detail = 0;
}

ORReportData::ORReportData()
{
    title = QString::null;
    name = QString::null;

    //queries = QuerySourceList();

    pghead_first = pghead_odd = pghead_even = pghead_last = pghead_any = NULL;
    pgfoot_first = pgfoot_odd = pgfoot_even = pgfoot_last = pgfoot_any = NULL;
    rpthead = rptfoot = NULL;
}

ORWatermarkData::ORWatermarkData()
{
    opacity = 25;
    useDefaultFont = true;
    font = QFont("Arial");
    staticText = true;
    text = QString::null;
    valid = false;
}

ORBackgroundData::ORBackgroundData()
{
    enabled = false;
    staticImage = true;
    image = QString::null;
    opacity = 25;
    mode = "clip";
    align = Qt::AlignLeft | Qt::AlignTop;
}

//
// functions
//
bool parseReportRect(const QDomElement & elemSource, QRect & rectTarget)
{
  if (elemSource.tagName() == "rect")
  {
    QDomNode  nodeCursor = elemSource.firstChild();

    while (!nodeCursor.isNull())
    {
      if (nodeCursor.isElement())
      {
        QDomElement elemThis = nodeCursor.toElement();
        int         intTemp;
        bool        valid;

        if (elemThis.tagName() == "x")
        {
          intTemp = elemThis.text().toInt(&valid);
          if (valid)
            rectTarget.setX(intTemp);
          else
            return FALSE;
        }
        else if (elemThis.tagName() == "y")
        {
          intTemp = elemThis.text().toInt(&valid);
          if (valid)
            rectTarget.setY(intTemp);
          else
            return FALSE;
        }
        else if (elemThis.tagName() == "width")
        {
          intTemp = elemThis.text().toInt(&valid);
          if (valid)
            rectTarget.setWidth(intTemp);
          else
            return FALSE;
        }
        else if (elemThis.tagName() == "height")
        {
          intTemp = elemThis.text().toInt(&valid);
          if (valid)
            rectTarget.setHeight(intTemp);
          else
            return FALSE;
        }
      }
      nodeCursor = nodeCursor.nextSibling();
    }
    return TRUE;
  }
  return FALSE;
}

bool parseReportFont(const QDomElement & elemSource, QFont & fontTarget)
{
  if (elemSource.tagName() == "font")
  {
    QDomNode  nodeCursor = elemSource.firstChild();

    while (!nodeCursor.isNull())
    {
      if (nodeCursor.isElement())
      {
        QDomElement elemThis = nodeCursor.toElement();
        int intTemp;
        bool valid;

        if (elemThis.tagName() == "face")
          fontTarget.setFamily(elemThis.text());
        else if (elemThis.tagName() == "size")
        {
          intTemp = elemThis.text().toInt(&valid);
          if (valid)
            fontTarget.setPointSize(intTemp);
          else
            qDebug("Text not Parsed at <font>:%s\n", (const char *)elemThis.text());
        }
        else if (elemThis.tagName() == "weight")
        {
          if (elemThis.text() == "normal")
            fontTarget.setWeight(50);
          else if (elemThis.text() == "bold")
            fontTarget.setWeight(75);
          else
          {
            // This is where we want to convert the string to an int value
            // that should be between 1 and 100
            intTemp = elemThis.text().toInt(&valid);
            if(valid && intTemp >= 1 && intTemp <= 100)
              fontTarget.setWeight(intTemp);
            else
              qDebug("Text not Parsed at <font>:%s\n", (const char *)elemThis.text());
          }
        }
        else
        {
          // we have encountered a tag that we don't understand.
          // for now we will just inform a debugger about it
          qDebug("Tag not Parsed at <font>:%s\n", (const char *)elemThis.tagName());
        } 
      }
      nodeCursor = nodeCursor.nextSibling();
    }
    return TRUE;
  }
  return FALSE;
}

bool parseReportData(const QDomElement & elemSource, ORDataData & dataTarget)
{
  QDomNodeList params = elemSource.childNodes();
  bool valid_query = FALSE;
  bool valid_column = FALSE;

  for( int paramCounter = 0; paramCounter < params.count(); paramCounter++ )
  {
    QDomElement elemParam = params.item(paramCounter).toElement();
    if (elemParam.tagName() == "query")
    {
      dataTarget.query = elemParam.text();
      valid_query = TRUE;
    }
    else if(elemParam.tagName() == "column")
    {
      dataTarget.column = elemParam.text();
      valid_column = TRUE;
    }
    else
      qDebug("Tag not Parsed at <data>:%s\n", (const char *)elemParam.tagName());
  }
  if(valid_query && valid_column)
    return TRUE;

  return FALSE;
}

bool parseReportKey(const QDomElement & elemSource, ORKeyData & dataTarget)
{
  QDomNodeList params = elemSource.childNodes();
  bool valid_query = FALSE;
  bool valid_column = FALSE;

  for( int paramCounter = 0; paramCounter < params.count(); paramCounter++ )
  {
    QDomElement elemParam = params.item(paramCounter).toElement();
    if (elemParam.tagName() == "query")
    {
      dataTarget.query = elemParam.text();
      valid_query = TRUE;
    }
    else if(elemParam.tagName() == "column")
    {
      dataTarget.column = elemParam.text();
      valid_column = TRUE;
    }
    else
      qDebug("Tag not Parsed at <key>:%s\n", (const char *)elemParam.tagName());
  }
  if(valid_query)
    return TRUE;

  return FALSE;
}

bool parseReportLine(const QDomElement & elemSource, ORLineData & lineTarget)
{
  QDomNodeList params = elemSource.childNodes();
  int          coorCounter = 0;

  lineTarget.weight = 0; // default to 0

  for ( int paramCounter = 0; paramCounter < params.count(); paramCounter++ )
  {
    QDomElement elemParam = params.item(paramCounter).toElement();

    if (elemParam.tagName() == "xstart")
    {
      lineTarget.xStart = elemParam.text().toInt();
      coorCounter++;
    }
    else if (elemParam.tagName() == "ystart")
    {
      lineTarget.yStart = elemParam.text().toInt();
      coorCounter++;
    }
    else if (elemParam.tagName() == "xend")
    {
      lineTarget.xEnd = elemParam.text().toInt();
      coorCounter++;
    }
    else if (elemParam.tagName() == "yend")
    {
      lineTarget.yEnd = elemParam.text().toInt();
      coorCounter++;
    }
    else if (elemParam.tagName() == "weight")
      lineTarget.weight = elemParam.text().toInt();
    else
      qDebug("Tag not Parsed at <line>:%s\n", (const char *)elemParam.tagName());
  }
  if (coorCounter == 4)
      return TRUE;
  return FALSE;
}

bool parseReportLabel(const QDomElement & elemSource, ORLabelData & labelTarget)
{
  QDomNodeList params = elemSource.childNodes();
  bool valid_rect = FALSE;
  bool valid_string = FALSE;

  labelTarget.align = 0;

  for (int paramCounter = 0; paramCounter < params.count(); paramCounter++)
  {
    QDomElement elemParam = params.item(paramCounter).toElement();

    if (elemParam.tagName() == "rect")
      valid_rect = parseReportRect(elemParam, labelTarget.rect);
    else if (elemParam.tagName() == "font")
      parseReportFont(elemParam, labelTarget.font);
    else if (elemParam.tagName() == "string")
    {
      labelTarget.string = elemParam.text();
      valid_string = TRUE;
    }
    else if (elemParam.tagName() == "left")
      labelTarget.align |= Qt::AlignLeft;
    else if (elemParam.tagName() == "right")
      labelTarget.align |= Qt::AlignRight;
    else if (elemParam.tagName() == "vcenter")
      labelTarget.align |= Qt::AlignVCenter;
    else if (elemParam.tagName() == "hcenter")
      labelTarget.align |= Qt::AlignHCenter;
    else if (elemParam.tagName() == "top")
      labelTarget.align |= Qt::AlignTop;
    else if (elemParam.tagName() == "bottom")
      labelTarget.align |= Qt::AlignBottom;
    else
     qDebug("Tag not Parsed at <label>:%s\n", (const char *)elemParam.tagName());
  }
  if(valid_rect && valid_string)
    return TRUE;
  return FALSE;
}

bool parseReportField(const QDomElement & elemSource, ORFieldData & fieldTarget)
{
  QDomNodeList params = elemSource.childNodes();
  bool valid_rect = FALSE;
  bool valid_data = FALSE;

  fieldTarget.align = 0;
  fieldTarget.trackTotal = FALSE;
  fieldTarget.sub_total = FALSE;
  fieldTarget.builtinFormat = FALSE;
  fieldTarget.format = QString::null;

  for (int paramCounter = 0; paramCounter < params.count(); paramCounter++)
  {
    QDomElement elemParam = params.item(paramCounter).toElement();

    if (elemParam.tagName() == "rect")
      valid_rect = parseReportRect(elemParam, fieldTarget.rect);
    else if (elemParam.tagName() == "font")
      parseReportFont(elemParam, fieldTarget.font);
    else if (elemParam.tagName() == "left")
      fieldTarget.align |= Qt::AlignLeft;
    else if (elemParam.tagName() == "right")
      fieldTarget.align |= Qt::AlignRight;
    else if (elemParam.tagName() == "vcenter")
      fieldTarget.align |= Qt::AlignVCenter;
    else if (elemParam.tagName() == "hcenter")
      fieldTarget.align |= Qt::AlignHCenter;
    else if (elemParam.tagName() == "top")
      fieldTarget.align |= Qt::AlignTop;
    else if (elemParam.tagName() == "bottom")
      fieldTarget.align |= Qt::AlignBottom;
    else if (elemParam.tagName() == "data")
      valid_data = parseReportData(elemParam, fieldTarget.data);
    else if (elemParam.tagName() == "tracktotal")
    {
      fieldTarget.builtinFormat = (elemParam.attribute("builtin")=="true"?TRUE:FALSE);
      fieldTarget.sub_total = (elemParam.attribute("subtotal")=="true"?TRUE:FALSE);
      fieldTarget.format = elemParam.text();
      if(fieldTarget.format.length() > 0)
        fieldTarget.trackTotal = TRUE;
    }
    else
     qDebug("Tag not Parsed at <field>:%s\n", (const char *)elemParam.tagName());
  }
  if(valid_rect && valid_data)
    return TRUE;
  return FALSE;
}

bool parseReportText(const QDomElement & elemSource, ORTextData & textTarget)
{
  QDomNodeList params = elemSource.childNodes();
  bool valid_rect = FALSE;
  bool valid_data = FALSE;

  textTarget.align = 0;
  textTarget.bottompad = 0;

  for (int paramCounter = 0; paramCounter < params.count(); paramCounter++)
  {
    QDomElement elemParam = params.item(paramCounter).toElement();

    if (elemParam.tagName() == "rect")
      valid_rect = parseReportRect(elemParam, textTarget.rect);
    else if (elemParam.tagName() == "font")
      parseReportFont(elemParam, textTarget.font);
    else if (elemParam.tagName() == "left")
      textTarget.align |= Qt::AlignLeft;
    else if (elemParam.tagName() == "right")
      textTarget.align |= Qt::AlignRight;
    else if (elemParam.tagName() == "vcenter")
      textTarget.align |= Qt::AlignVCenter;
    else if (elemParam.tagName() == "hcenter")
      textTarget.align |= Qt::AlignHCenter;
    else if (elemParam.tagName() == "top")
      textTarget.align |= Qt::AlignTop;
    else if (elemParam.tagName() == "bottom")
      textTarget.align |= Qt::AlignBottom;
    else if (elemParam.tagName() == "data")
      valid_data = parseReportData(elemParam, textTarget.data);
    else if (elemParam.tagName() == "bottompad")
      textTarget.bottompad = elemParam.text().toInt();
    else
     qDebug("Tag not Parsed at <text>:%s\n", (const char *)elemParam.tagName());
  }
  if(valid_rect && valid_data)
    return TRUE;
  return FALSE;
}

bool parseReportBarcode(const QDomElement & elemSource, ORBarcodeData & barcodeTarget)
{
  QDomNodeList params = elemSource.childNodes();
  bool valid_rect = FALSE;
  bool valid_data = FALSE;

  barcodeTarget.format = "3of9";
  barcodeTarget.align = 0; // left alignment [default]

  for(int paramCounter = 0; paramCounter < params.count(); paramCounter++)
  {
    QDomElement elemParam = params.item(paramCounter).toElement();
    if(elemParam.tagName() == "rect")
      valid_rect = parseReportRect(elemParam, barcodeTarget.rect);
    else if(elemParam.tagName() == "data")
      valid_data = parseReportData(elemParam, barcodeTarget.data);
    else if(elemParam.tagName() == "maxlength")
      barcodeTarget.maxlength = elemParam.text().toInt();
    else if(elemParam.tagName() == "format")
      barcodeTarget.format = elemParam.text();
    else if(elemParam.tagName() == "left")
      barcodeTarget.align = 0;
    else if(elemParam.tagName() == "center")
      barcodeTarget.align = 1;
    else if(elemParam.tagName() == "right")
      barcodeTarget.align = 2;
    else
      qDebug("Tag not parsed at <barcode>:%s", (const char*)elemParam.tagName());
  }

  if(valid_rect && valid_data)
    return TRUE;
  return FALSE;
}

bool parseReportImage(const QDomElement & elemSource, ORImageData & imageTarget)
{
  QDomNodeList params = elemSource.childNodes();
  bool valid_rect = FALSE;
  bool valid_data = FALSE;
  bool valid_inline = FALSE;

  imageTarget.mode = "clip";

  for(int paramCounter = 0; paramCounter < params.count(); paramCounter++)
  {
    QDomElement elemParam = params.item(paramCounter).toElement();
    if(elemParam.tagName() == "rect")
      valid_rect = parseReportRect(elemParam, imageTarget.rect);
    else if(elemParam.tagName() == "data")
      valid_data = parseReportData(elemParam, imageTarget.data);
    else if(elemParam.tagName() == "mode")
      imageTarget.mode = elemParam.text();
    else if(elemParam.tagName() == "map")
    {
      // ok we have an inline image here
      imageTarget.format = elemParam.attribute("format");
      imageTarget.inline_data = elemParam.firstChild().nodeValue();
      valid_inline = TRUE;
    }
    else
      qDebug("Tag not parsed at <image>:%s", (const char*)elemParam.tagName());
  }

  if(valid_rect && ( valid_data || valid_inline ) )
    return TRUE;
  return FALSE;
}

bool parseReportColorDefData(const QDomElement & elemSource, ORColorDefData & coldefTarget)
{
  if(elemSource.tagName() != "colordef")
    return false;

  coldefTarget.name = QString::null;
  coldefTarget.red = coldefTarget.green = coldefTarget.blue = 0;

  QDomNodeList nlist = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < nlist.count(); nodeCounter++)
  {
    QDomElement elemThis = nlist.item(nodeCounter).toElement();
    if(elemThis.tagName() == "name")
      coldefTarget.name = elemThis.text();
    else if(elemThis.tagName() == "red")
      coldefTarget.red = elemThis.text().toInt();
    else if(elemThis.tagName() == "green")
      coldefTarget.green = elemThis.text().toInt();
    else if(elemThis.tagName() == "blue")
      coldefTarget.blue = elemThis.text().toInt();
    else
      qDebug("While parsing colordef encountered an unknown element: %s",(const char*)elemThis.tagName());
  }
  if(coldefTarget.name.length() > 0)
    return TRUE;
  return FALSE;
}

bool parseReportTitleData(const QDomElement & elemSource, ORTitleData & titleTarget)
{
  if(elemSource.tagName() != "title")
    return FALSE;

  titleTarget.string = QString::null;
  titleTarget.font_defined = FALSE;

  QDomNodeList nlist = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < nlist.count(); nodeCounter++)
  {
    QDomElement elemThis = nlist.item(nodeCounter).toElement();
    if(elemThis.tagName() == "string")
      titleTarget.string = elemThis.text();
    else if(elemThis.tagName() == "font")
      titleTarget.font_defined = parseReportFont(elemThis, titleTarget.font);
    else
      qDebug("While parsing title encountered an unknown element: %s",(const char*)elemThis.tagName());
  }

  return TRUE;
}

bool parseReportStyleData(const QDomElement & elemSource, ORStyleData & styleTarget)
{
  if(elemSource.tagName() != "style")
    return FALSE;

  styleTarget.bar = styleTarget.line = styleTarget.point = FALSE;

  QDomNodeList nlist = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < nlist.count(); nodeCounter++)
  {
    QDomElement elemThis = nlist.item(nodeCounter).toElement();
    if(elemThis.tagName() == "bar")
      styleTarget.bar = TRUE;
    else if(elemThis.tagName() == "line")
      styleTarget.line = TRUE;
    else if(elemThis.tagName() == "point")
      styleTarget.point = TRUE;
    else
      qDebug("While parsing title encountered an unknown element: %s",(const char*)elemThis.tagName());
  }

  if(styleTarget.bar == FALSE && styleTarget.line == FALSE && styleTarget.point == FALSE)
    return FALSE;

  return TRUE;
}

bool parseReportDataAxisData(const QDomElement & elemSource, ORDataAxisData & axisTarget)
{
  if(elemSource.tagName() != "dataaxis")
    return FALSE;

  axisTarget.title.string = QString::null;
  axisTarget.title.font_defined = FALSE;
  axisTarget.column = QString::null;
  axisTarget.font_defined = FALSE;

  QDomNodeList nlist = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < nlist.count(); nodeCounter++)
  {
    QDomElement elemThis = nlist.item(nodeCounter).toElement();
    if(elemThis.tagName() == "title")
      parseReportTitleData(elemThis, axisTarget.title);
    else if(elemThis.tagName() == "column")
      axisTarget.column = elemThis.text();
    else if(elemThis.tagName() == "font")
      axisTarget.font_defined = parseReportFont(elemThis, axisTarget.font);
    else
      qDebug("While parsing dataaxis encountered an unknown element: %s",(const char*)elemThis.tagName());
  }

  return TRUE;
}

bool parseReportValueAxisData(const QDomElement & elemSource, ORValueAxisData & axisTarget)
{
  if(elemSource.tagName() != "valueaxis")
    return FALSE;

  double ival = 0.0;
  bool valid = FALSE;

  axisTarget.title.string = QString::null;
  axisTarget.title.font_defined = FALSE;
  axisTarget.min = 0.0;
  axisTarget.max = 100.0;
  axisTarget.autominmax = TRUE;
  axisTarget.font_defined = FALSE;

  QDomNodeList nlist = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < nlist.count(); nodeCounter++)
  {
    QDomElement elemThis = nlist.item(nodeCounter).toElement();
    if(elemThis.tagName() == "title")
      parseReportTitleData(elemThis, axisTarget.title);
    else if(elemThis.tagName() == "min")
    {
      ival = elemThis.text().toDouble(&valid);
      if(valid)
        axisTarget.min = ival;
    }
    else if(elemThis.tagName() == "max")
    {
      ival = elemThis.text().toDouble(&valid);
      if(valid)
        axisTarget.max = ival;
    }
    else if(elemThis.tagName() == "autominmax")
    {
      QString amn = elemThis.text().lower();
      if(amn == "t" || amn == "true" || amn == "")
        axisTarget.autominmax = TRUE;
      else
        axisTarget.autominmax = FALSE;
    }
    else if(elemThis.tagName() == "font")
      axisTarget.font_defined = parseReportFont(elemThis, axisTarget.font);
    else
      qDebug("While parsing valueaxis encountered an unknown element: %s",(const char*)elemThis.tagName());
  }

  return TRUE;
}

bool parseReportSeriesData(const QDomElement & elemSource, ORSeriesData & seriesTarget)
{
  if(elemSource.tagName() != "series")
    return FALSE;

  seriesTarget.name = QString::null;
  seriesTarget.color = QString::null;
  seriesTarget.column = QString::null;
  seriesTarget.style.bar = TRUE;
  seriesTarget.style.line = FALSE;
  seriesTarget.style.point = FALSE;

  QDomNodeList nlist = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < nlist.count(); nodeCounter++)
  {
    QDomElement elemThis = nlist.item(nodeCounter).toElement();
    if(elemThis.tagName() == "name")
      seriesTarget.name = elemThis.text();
    else if(elemThis.tagName() == "color")
      seriesTarget.color = elemThis.text();
    else if(elemThis.tagName() == "column")
      seriesTarget.column = elemThis.text();
    else if(elemThis.tagName() == "style")
    {
      if(!parseReportStyleData(elemThis, seriesTarget.style))
      {
          seriesTarget.style.bar = TRUE;
          seriesTarget.style.line = FALSE;
          seriesTarget.style.point = FALSE;
      }
    }
    else
      qDebug("While parsing series encountered an unknown element: %s",(const char*)elemThis.tagName());
  }

  
  if(seriesTarget.name.length() > 0 &&
     seriesTarget.color.length() > 0 &&
     seriesTarget.column.length() > 0)
    return TRUE;
  return FALSE;
}

bool parseReportGraphData(const QDomElement & elemSource, ORGraphData & graphTarget)
{
  if(elemSource.tagName() != "graph")
    return FALSE;

  bool have_data = FALSE;
  bool have_rect = FALSE;
  bool have_series = FALSE;

  graphTarget.title.string = QString::null;
  graphTarget.dataaxis.title.string = QString::null;
  graphTarget.dataaxis.title.font_defined = FALSE;
  graphTarget.dataaxis.column = QString::null;
  graphTarget.dataaxis.font_defined = FALSE;
  graphTarget.valueaxis.title.string = QString::null;
  graphTarget.valueaxis.min = 0;
  graphTarget.valueaxis.max = 100;
  graphTarget.valueaxis.autominmax = TRUE;
  graphTarget.valueaxis.font_defined = FALSE;

  graphTarget.series.setAutoDelete(TRUE);

  QDomNodeList nlist = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < nlist.count(); nodeCounter++)
  {
    QDomElement elemThis = nlist.item(nodeCounter).toElement();
    if(elemThis.tagName() == "data")
      have_data = parseReportData(elemThis, graphTarget.data);
    else if(elemThis.tagName() == "font")
      parseReportFont(elemThis, graphTarget.font);
    else if(elemThis.tagName() == "rect")
      have_rect = parseReportRect(elemThis, graphTarget.rect);
    else if(elemThis.tagName() == "title")
      parseReportTitleData(elemThis, graphTarget.title);
    else if(elemThis.tagName() == "dataaxis")
    {
      if(!parseReportDataAxisData(elemThis, graphTarget.dataaxis))
      {
        graphTarget.dataaxis.title.string = QString::null;
        graphTarget.dataaxis.title.font_defined = FALSE;
        graphTarget.dataaxis.column = QString::null;
        graphTarget.dataaxis.font_defined = FALSE;
      }
    }
    else if(elemThis.tagName() == "valueaxis")
    {
      if(!parseReportValueAxisData(elemThis, graphTarget.valueaxis))
      {
        graphTarget.valueaxis.title.string = QString::null;
        graphTarget.valueaxis.min = 0;
        graphTarget.valueaxis.max = 100;
        graphTarget.valueaxis.autominmax = TRUE;
        graphTarget.valueaxis.font_defined = FALSE;
      }
    }
    else if(elemThis.tagName() == "series")
    {
      ORSeriesData * orsd = new ORSeriesData();
      if(parseReportSeriesData(elemThis, *orsd))
      {
        graphTarget.series.append(orsd);
        have_series = TRUE;
      }
      else
        delete orsd;
      orsd = 0;
    }
    else
      qDebug("While parsing graph encountered an unknown element: %s",(const char*)elemThis.tagName());
  }

  if(have_data && have_rect && have_series)
    return TRUE;
  return FALSE;
}

bool parseReportBackground(const QDomElement & elemSource, ORBackgroundData & bgTarget)
{
  if(elemSource.tagName() != "background")
    return FALSE;

  bgTarget.enabled = false;
  bgTarget.staticImage = true;
  bgTarget.image = QString::null;
  bgTarget.data.query = QString::null;
  bgTarget.data.column = QString::null;
  bgTarget.opacity = 25;
  bgTarget.mode = "clip";
  bgTarget.rect = QRect();

  int halign = Qt::AlignLeft;
  int valign = Qt::AlignTop;
  bool valid_rect = true;

  QDomNodeList nlist = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < nlist.count(); nodeCounter++)
  {
    QDomElement elemThis = nlist.item(nodeCounter).toElement();
    if(elemThis.tagName() == "image")
      bgTarget.image = elemThis.text();
    else if(elemThis.tagName() == "mode")
      bgTarget.mode = elemThis.text();
    else if(elemThis.tagName() == "data")
      bgTarget.staticImage = !parseReportData(elemThis, bgTarget.data);
    else if(elemThis.tagName() == "left")
      halign = Qt::AlignLeft;
    else if(elemThis.tagName() == "hcenter")
      halign = Qt::AlignHCenter;
    else if(elemThis.tagName() == "right")
      halign = Qt::AlignRight;
    else if(elemThis.tagName() == "top")
      valign = Qt::AlignTop;
    else if(elemThis.tagName() == "vcenter")
      valign = Qt::AlignVCenter;
    else if(elemThis.tagName() == "bottom")
      valign = Qt::AlignBottom;
    else if(elemThis.tagName() == "rect")
      valid_rect = parseReportRect(elemThis, bgTarget.rect);
    else if(elemThis.tagName() == "opacity")
    {
      bool valid = false;
      int i = elemThis.text().toInt(&valid);
      if(valid) {
        if(i < 0)
          i = 0;
        if(i > 255)
          i = 255;
        bgTarget.opacity = i;
      }
    }
    else
      qDebug("While parsing background encountered an unknown element: %s",(const char*)elemThis.tagName());
  }

  bgTarget.align = halign | valign;
  bgTarget.enabled = (valid_rect && ((bgTarget.staticImage && !bgTarget.image.isEmpty())
                       || (!bgTarget.staticImage && !bgTarget.data.query.isEmpty()
                                                 && !bgTarget.data.column.isEmpty())));
  return bgTarget.enabled;
}

bool parseReportWatermark(const QDomElement & elemSource, ORWatermarkData & wmTarget)
{
  if(elemSource.tagName() != "watermark")
    return FALSE;

  wmTarget.text = QString::null;
  wmTarget.opacity = 25;
  wmTarget.staticText = true;
  wmTarget.useDefaultFont = true;
  wmTarget.valid = false;
  
  QDomNodeList nlist = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < nlist.count(); nodeCounter++) {
    QDomElement elemThis = nlist.item(nodeCounter).toElement();
    if(elemThis.tagName() == "text")
      wmTarget.text = elemThis.text();
    else if(elemThis.tagName() == "data")
      wmTarget.staticText = !parseReportData(elemThis, wmTarget.data);
    else if(elemThis.tagName() == "font")
      wmTarget.useDefaultFont = !parseReportFont(elemThis, wmTarget.font);
    else if(elemThis.tagName() == "opacity")
    {
      bool valid = false;
      int i = elemThis.text().toInt(&valid);
      if(valid) {
        if(i < 0)
          i = 0;
        if(i > 255)
          i = 255;
        wmTarget.opacity = i;
      }
    }
    else
      qDebug("While parsing watermark encountered an unknown element: %s",(const char*)elemThis.tagName());
  }

  wmTarget.valid = ((wmTarget.staticText && !wmTarget.text.isEmpty())
                     || (!wmTarget.staticText && !wmTarget.data.query.isEmpty()
                                              && !wmTarget.data.column.isEmpty()));

  return wmTarget.valid;
}

bool parseReportSection(const QDomElement & elemSource, ORSectionData & sectionTarget)
{
  sectionTarget.name = elemSource.tagName();

  if(sectionTarget.name != "rpthead" && sectionTarget.name != "rptfoot" &&
     sectionTarget.name != "pghead" && sectionTarget.name != "pgfoot" &&
     sectionTarget.name != "grouphead" && sectionTarget.name != "groupfoot" &&
     sectionTarget.name != "head" && sectionTarget.name != "foot" &&
     sectionTarget.name != "detail" )
    return false;

  sectionTarget.extra = QString::null;
  sectionTarget.height = -1;

  QDomNodeList section = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < section.count(); nodeCounter++)
  {
    QDomElement elemThis = section.item(nodeCounter).toElement();
    if(elemThis.tagName() == "height")
    {
      bool valid;
      int height = elemThis.text().toInt(&valid);
      if(valid)
        sectionTarget.height = height;
    }
    else if(elemThis.tagName() == "firstpage") {
      if(sectionTarget.name == "pghead" || sectionTarget.name == "pgfoot")
        sectionTarget.extra = elemThis.tagName();
    }
    else if(elemThis.tagName() == "odd")
    {
      if(sectionTarget.name == "pghead" || sectionTarget.name == "pgfoot")
        sectionTarget.extra = elemThis.tagName();
    }
    else if(elemThis.tagName() == "even")
    {
      if(sectionTarget.name == "pghead" || sectionTarget.name == "pgfoot")
        sectionTarget.extra = elemThis.tagName();
    }
    else if(elemThis.tagName() == "lastpage")
    {
      if(sectionTarget.name == "pghead" || sectionTarget.name == "pgfoot")
        sectionTarget.extra = elemThis.tagName();
    }
    else if(elemThis.tagName() == "label")
    {
      ORLabelData * label = new ORLabelData();
      if(parseReportLabel(elemThis, *label) == TRUE)
        sectionTarget.objects.append(label);
      else
        delete label;
    }
    else if(elemThis.tagName() == "field")
    {
      ORFieldData * field = new ORFieldData();
      if(parseReportField(elemThis, *field) == TRUE)
      {
        sectionTarget.objects.append(field);
        if(field->trackTotal)
          sectionTarget.trackTotal.append(field->data);
      }
      else
        delete field;
    }
    else if(elemThis.tagName() == "text")
    {
      ORTextData * text = new ORTextData();
      if(parseReportText(elemThis, *text) == TRUE)
        sectionTarget.objects.append(text);
      else
        delete text;
    }
    else if(elemThis.tagName() == "line")
    {
      ORLineData * line = new ORLineData();
      if(parseReportLine(elemThis, *line) == TRUE)
        sectionTarget.objects.append(line);
      else
        delete line;
    }
    else if(elemThis.tagName() == "barcode")
    {
      ORBarcodeData * bc = new ORBarcodeData();
      if(parseReportBarcode(elemThis, *bc) == TRUE)
        sectionTarget.objects.append(bc);
      else
        delete bc;
    }
    else if(elemThis.tagName() == "image")
    {
      ORImageData * img = new ORImageData();
      if(parseReportImage(elemThis, *img) == TRUE)
        sectionTarget.objects.append(img);
      else
        delete img;
    }
    else if(elemThis.tagName() == "graph")
    {
      ORGraphData * graph = new ORGraphData();
      if(parseReportGraphData(elemThis, *graph) == TRUE)
        sectionTarget.objects.append(graph);
      else
        delete graph;
    }
    else if(elemThis.tagName() == "key")
    {
      // we can ignore this as it will be handled elsewhere
      // we just catch this so we don't get an error
    }
    else
      qDebug("While parsing section encountered an unknown element: %s",(const char*)elemThis.tagName());
  }
  return TRUE;
}

bool parseReportDetailSection(const QDomElement & elemSource, ORDetailSectionData & sectionTarget)
{
  if(elemSource.tagName() != "section")
    return FALSE;

  bool have_name = FALSE;
  bool have_detail = FALSE;
  bool have_key = FALSE;

  ORSectionData * old_head = 0;
  ORSectionData * old_foot = 0;

  QDomNodeList section = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < section.count(); nodeCounter++)
  {
    QDomElement elemThis = section.item(nodeCounter).toElement();
    if(elemThis.tagName() == "name")
    {
      sectionTarget.name = elemThis.text();
      have_name = TRUE;
    }
    else if(elemThis.tagName() == "pagebreak")
    {
      if(elemThis.attribute("when") == "at end")
        sectionTarget.pagebreak = ORDetailSectionData::BreakAtEnd;
    }
    else if(elemThis.tagName() == "grouphead")
    {
      ORSectionData * sd = new ORSectionData();
      if(parseReportSection(elemThis, *sd) == TRUE)
      {
        old_head = sd;
        sectionTarget.trackTotal += sd->trackTotal;
      }
      else
        delete sd;
    }
    else if(elemThis.tagName() == "groupfoot")
    {
      ORSectionData * sd = new ORSectionData();
      if(parseReportSection(elemThis, *sd) == TRUE)
      {
        old_foot = sd;
        sectionTarget.trackTotal += sd->trackTotal;
      }
      else
        delete sd;
    }
    else if(elemThis.tagName() == "group")
    {
      QDomNodeList nl = elemThis.childNodes();
      QDomNode node;
      ORDetailGroupSectionData * dgsd = new ORDetailGroupSectionData();
      for(int i = 0; i < nl.count(); i++)
      {
        node = nl.item(i);
        if(node.nodeName() == "name")
          dgsd->name = node.firstChild().nodeValue();
        else if(node.nodeName() == "column")
          dgsd->column = node.firstChild().nodeValue();
        else if(node.nodeName() == "pagebreak")
        {
          QDomElement elemThis = node.toElement();
          QString n = elemThis.attribute("when");
          if("after foot" == n)
            dgsd->pagebreak = ORDetailGroupSectionData::BreakAfterGroupFoot;
        }
        else if(node.nodeName() == "head")
        {
          ORSectionData * sd = new ORSectionData();
          if(parseReportSection(node.toElement(), *sd) == TRUE)
          {
            dgsd->head = sd;
            sectionTarget.trackTotal += sd->trackTotal;
            for(Q3ValueListIterator<ORDataData> it = sd->trackTotal.begin(); it != sd->trackTotal.end(); ++it)
              dgsd->_subtotCheckPoints[*it] = 0.0;
          }
          else
            delete sd;
        }
        else if(node.nodeName() == "foot")
        {
          ORSectionData * sd = new ORSectionData();
          if(parseReportSection(node.toElement(), *sd) == TRUE)
          {
            dgsd->foot = sd;
            sectionTarget.trackTotal += sd->trackTotal;
            for(Q3ValueListIterator<ORDataData> it = sd->trackTotal.begin(); it != sd->trackTotal.end(); ++it)
              dgsd->_subtotCheckPoints[*it] = 0.0;
          }
          else
            delete sd;
        }
        else
          qDebug("While parsing group section encountered an unknown element: %s", node.nodeName().latin1());
      }
      sectionTarget.groupList.append(dgsd);
    }
    else if(elemThis.tagName() == "detail")
    {
      // find and read in the key data of this element
      have_key = parseReportKey(elemThis.namedItem("key").toElement(), sectionTarget.key);

      ORSectionData * sd = new ORSectionData();
      if(parseReportSection(elemThis, *sd) == TRUE)
      {
        sectionTarget.detail = sd;
        sectionTarget.trackTotal += sd->trackTotal;
        have_detail = TRUE;
      }
      else
        delete sd;
    }
    else
      qDebug("While parsing detail section encountered an unknown element: %s",(const char*)elemThis.tagName());
  }
  if(old_head || old_foot)
  {
    ORDetailGroupSectionData * gsec = new ORDetailGroupSectionData();
    gsec->name = sectionTarget.name;
    gsec->column = sectionTarget.key.column;
    gsec->head = old_head;
    gsec->foot = old_foot;
    sectionTarget.groupList.append(gsec);
  }
  return (have_name && have_detail && have_key);
}

bool parseReport(const QDomElement & elemSource, ORReportData & reportTarget)
{
  if(elemSource.tagName() != "report")
  {
    qDebug("QDomElement passed to parseReport() was not <report> tag");
    return FALSE;
  }

  double d = 0.0;
  bool valid = FALSE;

  QDomNodeList section = elemSource.childNodes();
  for(int nodeCounter = 0; nodeCounter < section.count(); nodeCounter++)
  {
    QDomElement elemThis = section.item(nodeCounter).toElement();
    if(elemThis.tagName() == "title")
      reportTarget.title = elemThis.text();
    else if(elemThis.tagName() == "name")
      reportTarget.name = elemThis.text();
    else if(elemThis.tagName() == "description")
      reportTarget.description = elemThis.text();
    else if(elemThis.tagName() == "parameter")
    {
      parseReportParameter(elemThis, reportTarget);
    }
    else if(elemThis.tagName() == "watermark")
      parseReportWatermark(elemThis, reportTarget.wmData);
    else if(elemThis.tagName() == "background")
      parseReportBackground(elemThis, reportTarget.bgData);
    else if(elemThis.tagName() == "size")
    {
      if(elemThis.firstChild().isText())
        reportTarget.page.setPageSize(elemThis.firstChild().nodeValue());
      else
      {
        //bad code! bad code!
        // this code doesn't check the elemts and assums they are what
        // they should be.
        QDomNode n1 = elemThis.firstChild();
        QDomNode n2 = n1.nextSibling();
        if(n1.nodeName() == "width")
        {
          reportTarget.page.setCustomWidth(n1.firstChild().nodeValue().toDouble() / 100.0);
          reportTarget.page.setCustomHeight(n2.firstChild().nodeValue().toDouble() / 100.0);
        }
        else
        {
          reportTarget.page.setCustomWidth(n2.firstChild().nodeValue().toDouble() / 100.0);
          reportTarget.page.setCustomHeight(n1.firstChild().nodeValue().toDouble() / 100.0);
        }
        reportTarget.page.setPageSize("Custom");
      }
    }
    else if(elemThis.tagName() == "labeltype")
      reportTarget.page.setLabelType(elemThis.firstChild().nodeValue());
    else if(elemThis.tagName() == "portrait")
      reportTarget.page.setPortrait(TRUE);
    else if(elemThis.tagName() == "landscape")
      reportTarget.page.setPortrait(FALSE);
    else if(elemThis.tagName() == "topmargin")
    {
      d = elemThis.text().toDouble(&valid);
      if(!valid || d < 0.0)
      {
        qDebug("Error converting topmargin value: %s",(const char*)elemThis.text());
        d = 50.0;
      }
      reportTarget.page.setMarginTop((d / 100.0));
    }
    else if(elemThis.tagName() == "bottommargin")
    {
      d = elemThis.text().toDouble(&valid);
      if(!valid || d < 0.0)
      {
        qDebug("Error converting bottommargin value: %s",(const char*)elemThis.text());
        d = 50.0;
      }
      reportTarget.page.setMarginBottom((d / 100.0));
    }
    else if(elemThis.tagName() == "leftmargin")
    {
      d = elemThis.text().toDouble(&valid);
      if(!valid || d < 0.0)
      {
        qDebug("Error converting leftmargin value: %s",(const char*)elemThis.text());
        d = 50.0;
      }
      reportTarget.page.setMarginLeft(d/100.0);
    }
    else if(elemThis.tagName() == "rightmargin")
    {
      d = elemThis.text().toDouble(&valid);
      if(!valid || d < 0.0)
      {
        qDebug("Error converting rightmargin value: %s",(const char*)elemThis.text());
        d = 50.0;
      }
      reportTarget.page.setMarginRight(d/100.0);
    }
    else if(elemThis.tagName() == "querysource")
    {
      // we need to read in the query sources
      QString qsname = elemThis.namedItem("name").toElement().text();
      QString qsquery = elemThis.namedItem("sql").toElement().text();
      reportTarget.queries.add(new QuerySource(qsname,qsquery));
    }
    else if(elemThis.tagName() == "rpthead")
    {
      ORSectionData * sd = new ORSectionData();
      if(parseReportSection(elemThis, *sd) == TRUE)
      {
        reportTarget.rpthead = sd;
        reportTarget.trackTotal += sd->trackTotal;
      }
      else
        delete sd;
    }
    else if(elemThis.tagName() == "rptfoot")
    {
      ORSectionData * sd = new ORSectionData();
      if(parseReportSection(elemThis, *sd) == TRUE)
      {
        reportTarget.rptfoot = sd;
        reportTarget.trackTotal += sd->trackTotal;
      }
      else
        delete sd;
    }
    else if(elemThis.tagName() == "pghead")
    {
      ORSectionData * sd = new ORSectionData();
      if(parseReportSection(elemThis, *sd) == TRUE)
      {
        if(sd->extra == "firstpage")
          reportTarget.pghead_first = sd;
        else if(sd->extra == "odd")
          reportTarget.pghead_odd = sd;
        else if(sd->extra == "even")
          reportTarget.pghead_even = sd;
        else if(sd->extra == "lastpage")
          reportTarget.pghead_last = sd;
        else if(sd->extra == QString::null)
          reportTarget.pghead_any = sd;
        else
        {
          qDebug("don't know which page this page header is for: %s",(const char*)sd->extra);
          delete sd;
        }
        reportTarget.trackTotal += sd->trackTotal;
      }
      else
        delete sd;
    }
    else if(elemThis.tagName() == "pgfoot")
    {
      ORSectionData * sd = new ORSectionData();
      if(parseReportSection(elemThis, *sd) == TRUE) {
        if(sd->extra == "firstpage")
          reportTarget.pgfoot_first = sd;
        else if(sd->extra == "odd")
          reportTarget.pgfoot_odd = sd;
        else if(sd->extra == "even")
          reportTarget.pgfoot_even = sd;
        else if(sd->extra == "lastpage")
          reportTarget.pgfoot_last = sd;
        else if(sd->extra == QString::null)
          reportTarget.pgfoot_any = sd;
        else
        {
          qDebug("don't know which page this page footer is for: %s",(const char*)sd->extra);
          delete sd;
        }
        reportTarget.trackTotal += sd->trackTotal;
      }
      else
        delete sd;
    }
    else if(elemThis.tagName() == "section")
    {
      ORDetailSectionData * dsd = new ORDetailSectionData();
      if(parseReportDetailSection(elemThis, *dsd) == TRUE)
      {
        reportTarget.sections.append(dsd);
        reportTarget.trackTotal += dsd->trackTotal;
      }
      else
        delete dsd;
    }
    else if(elemThis.tagName() == "colordef")
    {
      ORColorDefData coldef;
      if(parseReportColorDefData(elemThis, coldef) == TRUE)
      {
        QColor col(coldef.red, coldef.green, coldef.blue);
        reportTarget.color_map[coldef.name] = col;
      }
    }
    else
      qDebug("While parsing report encountered an unknown element: %s",(const char*)elemThis.tagName());
  }

  return TRUE;
}


bool parseReportParameter(const QDomElement & elemSource, ORReportData & reportTarget)
{
  if(elemSource.tagName() != "parameter")
    return FALSE;

  ORParameter param;
  
  param.name = elemSource.attribute("name");
  if(param.name.isEmpty())
    return FALSE;

  param.type = elemSource.attribute("type");
  param.defaultValue  = elemSource.attribute("default");
  param.listtype = elemSource.attribute("listtype");
  param.active = (elemSource.attribute("active") == "true");
  QList<QPair<QString,QString> > pairs;
  if(param.listtype.isEmpty())
    param.description = elemSource.text();
  else
  {
    QDomNodeList section = elemSource.childNodes();
    for(int nodeCounter = 0; nodeCounter < section.count(); nodeCounter++)
    {
      QDomElement elemThis = section.item(nodeCounter).toElement();
      if(elemThis.tagName() == "description")
        param.description = elemThis.text();
      else if(elemThis.tagName() == "query")
        param.query = elemThis.text();
      else if(elemThis.tagName() == "item")
        param.values.append(qMakePair(elemThis.attribute("value"), elemThis.text()));
      else
        qDebug("While parsing parameter encountered an unknown element: %s",(const char*)elemThis.tagName());
    }
  }

  reportTarget.definedParams.insert(param.name, param);

  return TRUE;
}

