/*
 * Common Public Attribution License Version 1.0. 
 * 
 * The contents of this file are subject to the Common Public Attribution 
 * License Version 1.0 (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License 
 * at http://www.xTuple.com/CPAL.  The License is based on the Mozilla 
 * Public License Version 1.1 but Sections 14 and 15 have been added to 
 * cover use of software over a computer network and provide for limited 
 * attribution for the Original Developer. In addition, Exhibit A has 
 * been modified to be consistent with Exhibit B.
 * 
 * Software distributed under the License is distributed on an "AS IS" 
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See 
 * the License for the specific language governing rights and limitations 
 * under the License. 
 * 
 * The Original Code is xTuple ERP: PostBooks Edition
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2008 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
 * 
 * Contributor(s): ______________________.
 * 
 * Alternatively, the contents of this file may be used under the terms 
 * of the xTuple End-User License Agreeement (the xTuple License), in which 
 * case the provisions of the xTuple License are applicable instead of 
 * those above.  If you wish to allow use of your version of this file only 
 * under the terms of the xTuple License and not to allow others to use 
 * your version of this file under the CPAL, indicate your decision by 
 * deleting the provisions above and replace them with the notice and other 
 * provisions required by the xTuple License. If you do not delete the 
 * provisions above, a recipient may use your version of this file under 
 * either the CPAL or the xTuple License.
 * 
 * EXHIBIT B.  Attribution Information
 * 
 * Attribution Copyright Notice: 
 * Copyright (c) 1999-2008 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by xTuple ERP: PostBooks Edition
 * 
 * Attribution URL: www.xtuple.org 
 * (to be included in the "Community" menu of the application if possible)
 * 
 * Graphic Image as provided in the Covered Code, if any. 
 * (online at www.xtuple.com/poweredby)
 * 
 * Display of Attribution Information is required in Larger Works which 
 * are defined in the CPAL as a work which combines Covered Code or 
 * portions thereof with code not governed by the terms of the CPAL.
 */

#include "loadimage.h"

#include <QBuffer>
#include <QDomDocument>
#include <QImage>
#include <QImageWriter>
#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

#include <quuencode.h>

#define DEBUG false

LoadImage::LoadImage(const QString &name, const int order,
                     const bool system, const bool /*enabled*/,
                     const QString &comment, const QString &filename)
  : Loadable("loadimage", name, order, system, comment, filename)
{
}

LoadImage::LoadImage(const QDomElement &elem, QStringList &msg, QList<bool> &fatal)
  : Loadable(elem, msg, fatal)
{
  if (_name.isEmpty())
  {
    msg.append(QObject::tr("The image in %1 does not have a name.")
                       .arg(_filename));
    fatal.append(true);
  }

  if (elem.nodeName() != "loadimage")
  {
    msg.append(QObject::tr("Creating a LoadImage element from a %1 node.")
              .arg(elem.nodeName()));
    fatal.append(false);
  }

  if (elem.hasAttribute("grade") || elem.hasAttribute("order"))
  {
    msg.append(QObject::tr("Node %1 '%2' has a 'grade' or 'order' attribute "
                           "but these are ignored for images.")
                           .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(false);
  }

  if (elem.hasAttribute("enabled"))
  {
    msg.append(QObject::tr("Node %1 '%2' has an 'enabled' "
                           "attribute which is ignored for images.")
                       .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(false);
  }

  if (elem.hasAttribute("system"))
  {
    msg.append(QObject::tr("Node %1 '%2' has a 'system' attribute "
                           "which is ignored for images.")
                       .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(false);
  }
}

int LoadImage::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  QString sqlerrtxt = QObject::tr("<font color=red>The following error was "
                                  "encountered while trying to import %1 into "
                                  "the database:<br>%2<br>%3</font>");

  if (pdata.isEmpty())
  {
    errMsg = QObject::tr("<font color=orange>The image %1 is empty.</font>")
                         .arg(_name);
    return -2;
  }

  QString encodeddata;
  if (DEBUG)
    qDebug("LoadImage::writeToDB(): image starts with %s",
           pdata.left(10).data());
  if (QString(pdata.left(pdata.indexOf("\n"))).contains(QRegExp("^\\s*begin \\d+ \\S+")))
  {
    if (DEBUG) qDebug("LoadImage::writeToDB() image is already uuencoded");
    encodeddata = pdata;
  }
  else
  {
    // there's just GOT to be a better way to do this
    QImageWriter imageIo;
    QBuffer      imageBuffer;

    imageBuffer.open(QIODevice::ReadWrite);
    imageIo.setDevice(&imageBuffer);
    imageIo.setFormat(_filename.right(_filename.size() -
                                      _filename.lastIndexOf(".") - 1).toAscii());
    if (DEBUG)
      qDebug("LoadImage::writeToDB() image has format %s",
             imageIo.format().data());
    QImage image;
    image.loadFromData(pdata);
    if (!imageIo.write(image))
    {
      errMsg = QObject::tr("<font color=orange>Error processing image %1: "
                           "<br>%2</font>")
                .arg(_name).arg(imageIo.errorString());
      return -3;
    }

    imageBuffer.close();
    encodeddata = QUUEncode(imageBuffer);
    if (DEBUG) qDebug("LoadImage::writeToDB() image was uuencoded: %s",
                      qPrintable(encodeddata.left(160)));
  }

  QSqlQuery select;
  QSqlQuery upsert;

  int imageid  = -1;
  int pkgheadid = -1;
  int pkgitemid = -1;
  if (pkgname.isEmpty())
    select.prepare("SELECT image_id, -1, -1"
                   "  FROM image "
                   " WHERE (image_name=:name);");
  else
    select.prepare("SELECT COALESCE(pkgitem_item_id, -1), pkghead_id,"
                   "       COALESCE(pkgitem_id,      -1) "
                   "  FROM pkghead LEFT OUTER JOIN"
                   "       pkgitem ON ((pkgitem_pkghead_id=pkghead_id)"
                   "               AND (pkgitem_type='I')"
                   "               AND (pkgitem_name=:name))"
                   " WHERE (pkghead_name=:pkgname)");
  select.bindValue(":name",    _name);
  select.bindValue(":pkgname", pkgname);
  select.bindValue(":grade",   _grade);
  select.exec();
  if(select.first())
  {
    imageid  = select.value(0).toInt();
    pkgheadid = select.value(1).toInt();
    pkgitemid = select.value(2).toInt();
  }
  else if (select.lastError().type() != QSqlError::NoError)
  {
    QSqlError err = select.lastError();
    errMsg = sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
    return -5;
  }

  if (imageid >= 0)
    upsert.prepare("UPDATE image "
                   "   SET image_data=:source,"
                   "       image_descrip=:notes "
                   " WHERE (image_id=:id); ");
  else
  {
    upsert.prepare("SELECT NEXTVAL('image_image_id_seq');");
    upsert.exec();
    if (upsert.first())
      imageid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }

    upsert.prepare("INSERT INTO image "
                   "       (image_id, image_name, image_data, image_descrip) "
                   "VALUES (:id, :name, :source, :notes);");
  }

  upsert.bindValue(":id",      imageid);
  upsert.bindValue(":source",  encodeddata);
  upsert.bindValue(":notes",   _comment);
  upsert.bindValue(":name",    _name);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
    return -7;
  }

  if (pkgheadid >= 0)
  {
    int tmp = upsertPkgItem(pkgitemid, pkgheadid, "I", imageid, _name,
                            _comment, errMsg);
    if (tmp < 0)
      return tmp;
  }

  return imageid;
}
