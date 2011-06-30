/*
 * Copyright (c) 2002-2005 by OpenMFG, LLC
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

#include "reportgridoptions.h"

// qt
#include <qpoint.h>
#include <qsettings.h>

#include <math.h>

extern int dpiX;
extern int dpiY;

//
// ReportGridOptions method implementations
//
ReportGridOptions::ReportGridOptions(int rdx, int rdy, QObject * parent, const char * name)
  : QObject(parent, name) {
    QSettings settings;
    settings.setPath("OpenMFG.com", "OpenReports", QSettings::User);
    show_grid = settings.readBoolEntry("/OpenMFG/rwShowGrid", FALSE);
    snap_grid = settings.readBoolEntry("/OpenMFG/rwSnapGrid", FALSE);
    _realDpiX = rdx;
    _realDpiY = rdy;
    setXInterval(settings.readDoubleEntry("/OpenMFG/rwXGridInterval",0.05));
    setYInterval(settings.readDoubleEntry("/OpenMFG/rwYGridInterval",0.05));
}

void ReportGridOptions::setVisible(bool v) {
    show_grid = v;
    QSettings settings;
    settings.setPath("OpenMFG.com", "OpenReports", QSettings::User);
    settings.writeEntry("/OpenMFG/rwShowGrid", show_grid);
    emit gridOptionsChanged();
}

bool ReportGridOptions::isVisible() {
    return show_grid;
}

void ReportGridOptions::setSnap(bool yes) {
    snap_grid = yes;
    QSettings settings;
    settings.setPath("OpenMFG.com", "OpenReports", QSettings::User);
    settings.writeEntry("/OpenMFG/rwSnapGrid", snap_grid);
    emit gridOptionsChanged();
}

bool ReportGridOptions::isSnap() {
    return snap_grid;
}

QPoint ReportGridOptions::snapPoint(const QPoint & pos) {
    int x, y;
    x = pos.x();
    y = pos.y();

    double xpx = dpiX * xInterval();
    double ypx = dpiY * yInterval();

    if(isSnap()) {
        int dx = (x % (int)xpx);
        int dy = (y % (int)ypx);

        dx = (dx < (xpx/2.0) ? dx : -((int)xpx - dx));
        dy = (dy < (ypx/2.0) ? dy : -((int)ypx - dy));

        x -= dx;
        y -= dy;
    }
    return QPoint(x,y);
}


void ReportGridOptions::show() {
    setVisible(TRUE);
}
void ReportGridOptions::hide() {
    setVisible(FALSE);
}

void ReportGridOptions::setXInterval(double i) {
    x_interval = i;
    QSettings settings;
    settings.setPath("OpenMFG.com", "OpenReports", QSettings::User);
    settings.writeEntry("/OpenMFG/rwXGridInterval", x_interval);
    double d = _realDpiX * x_interval;
    double di = ((d - floor(d)) < 0.5 ? floor(d) : (floor(d) + 1.0) );
    dpiX = (int)((di / x_interval) + 0.01);
    emit gridOptionsChanged();
}
double ReportGridOptions::xInterval() {
    return x_interval;
}
void ReportGridOptions::setYInterval(double i) {
    y_interval = i;
    QSettings settings;
    settings.setPath("OpenMFG.com", "OpenReports", QSettings::User);
    settings.writeEntry("/OpenMFG/rwYGridInterval", y_interval);
    double d = _realDpiY * y_interval;
    double di = ((d - floor(d)) < 0.5 ? floor(d) : floor(d) + 1.0 );
    dpiY = (int)((di / y_interval) + 0.01);
    emit gridOptionsChanged();
}
double ReportGridOptions::yInterval() {
    return y_interval;
}


