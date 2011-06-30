/*
 * Copyright (c) 2002-2007 by OpenMFG, LLC
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * If you do not wish to be bound by the terms of the GNU General Public
 * License, DO NOT USE THIS SOFTWARE.  Please contact OpenMFG, LLC at
 * info@openmfg.com for details on how to purchase a commercial license.
 */

#include "reportpageoptions.h"

ReportPageOptions::ReportPageOptions()
  : QObject(), _pagesize("Letter"), _labelType(QString::null)
{
  _marginTop = _marginBottom = 1.0;
  _marginLeft = _marginRight = 1.0;

  _orientation = Portrait;

  _customWidth = 8.5;
  _customHeight = 11.0;
}

ReportPageOptions::ReportPageOptions(const ReportPageOptions & rpo)
  : QObject()
{
  _marginTop = rpo._marginTop;
  _marginBottom = rpo._marginBottom;
  _marginLeft = rpo._marginLeft;
  _marginRight = rpo._marginRight;

  _pagesize = rpo._pagesize;
  _customWidth = rpo._customWidth;
  _customHeight = rpo._customHeight;

  _orientation = rpo._orientation;

  _labelType = rpo._labelType;
}

ReportPageOptions & ReportPageOptions::operator=(const ReportPageOptions & rpo)
{
  _marginTop = rpo._marginTop;
  _marginBottom = rpo._marginBottom;
  _marginLeft = rpo._marginLeft;
  _marginRight = rpo._marginRight;

  _pagesize = rpo._pagesize;
  _customWidth = rpo._customWidth;
  _customHeight = rpo._customHeight;

  _orientation = rpo._orientation;

  _labelType = rpo._labelType;

  return *this;
}

double ReportPageOptions::getMarginTop()
{
  return _marginTop;
}
void ReportPageOptions::setMarginTop(double v)
{
  if (_marginTop == v)
    return;

  _marginTop = v;
  emit pageOptionsChanged();
}
double ReportPageOptions::getMarginBottom()
{
  return _marginBottom;
}
void ReportPageOptions::setMarginBottom(double v)
{
  if (_marginBottom == v)
    return;

  _marginBottom = v;
  emit pageOptionsChanged();
}
double ReportPageOptions::getMarginLeft()
{
  return _marginLeft;
}
void ReportPageOptions::setMarginLeft(double v)
{
  if (_marginLeft == v)
    return;

  _marginLeft = v;
  emit pageOptionsChanged();
}
double ReportPageOptions::getMarginRight()
{
  return _marginRight;
}
void ReportPageOptions::setMarginRight(double v)
{
  if (_marginRight == v)
    return;

  _marginRight = v;
  emit pageOptionsChanged();
}

const QString & ReportPageOptions::getPageSize()
{
  return _pagesize;
}
void ReportPageOptions::setPageSize(const QString & s)
{
  if (_pagesize == s)
    return;

  _pagesize = s;
  emit pageOptionsChanged();
}
double ReportPageOptions::getCustomWidth()
{
  return _customWidth;
}
void ReportPageOptions::setCustomWidth(double v)
{
  if (_customWidth == v)
    return;

  _customWidth = v;
  emit pageOptionsChanged();
}
double ReportPageOptions::getCustomHeight()
{
  return _customHeight;
}
void ReportPageOptions::setCustomHeight(double v)
{
  if (_customHeight == v)
    return;

  _customHeight = v;
  emit pageOptionsChanged();
}

ReportPageOptions::PageOrientation ReportPageOptions::getOrientation()
{
  return _orientation;
}

bool ReportPageOptions::isPortrait()
{
  return (_orientation == Portrait);
}

void ReportPageOptions::setOrientation(PageOrientation o)
{
  if (_orientation == o)
    return;

  _orientation = o;
  emit pageOptionsChanged();
}
void ReportPageOptions::setPortrait(bool yes)
{
  setOrientation((yes ? Portrait : Landscape));
}

const QString & ReportPageOptions::getLabelType()
{
  return _labelType;
}
void ReportPageOptions::setLabelType(const QString & type)
{
  if (_labelType == type)
    return;

  _labelType = type;
  emit pageOptionsChanged();
}
