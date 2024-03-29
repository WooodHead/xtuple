/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "imagecluster.h"

#include <QPixmap>
#include <QScrollArea>

#include <quuencode.h>

#define DEBUG   false

ImageCluster::ImageCluster(QWidget* pParent, const char* pName) :
    VirtualCluster(pParent, pName)
{
  addNumberWidget(new ImageClusterLineEdit(this, pName));

  _image = new QLabel("picture here");
  _image->setPixmap(_nullPixmap);
  _image->setAlignment(Qt::AlignLeft | Qt::AlignTop);
  QScrollArea * scrollArea = new QScrollArea();
  scrollArea->setWidgetResizable(true);
  scrollArea->setAlignment(Qt::AlignLeft | Qt::AlignTop);
  scrollArea->setWidget(_image);
  _grid->addWidget(scrollArea, 1, 0, -1, -1);
  _description->hide();
  _name->hide();

  _nullPixmap = QPixmap();
}

void ImageCluster::clear()
{
  if (DEBUG)
    qDebug("%s::clear()", qPrintable(objectName()));
  VirtualCluster::clear();
  _image->setPixmap(_nullPixmap);
}

void ImageCluster::sRefresh()
{
  if (DEBUG)
    qDebug("%s::sRefresh()", qPrintable(objectName()));

  VirtualCluster::sRefresh();
  if (_description->text().isEmpty())
  {
    if (DEBUG)
      qDebug("ImageCluster::sRefresh() without a picture");
    _image->setText(tr("picture here"));
    _image->setPixmap(_nullPixmap);
  }
  else
  {
    if (DEBUG)
      qDebug("ImageCluster::sRefresh() has picture %s, %d",
             qPrintable(_description->text().right(128)),
             _description->text().length());
    QImage tmpImage;
    tmpImage.loadFromData(QUUDecode(_description->text()));
    _image->setPixmap(QPixmap::fromImage(tmpImage));
  }

  if (DEBUG)
    qDebug("ImageCluster::sRefresh() returning");
}

void ImageCluster::setNumberVisible(const bool p)
{
  _number->setVisible(p);
  _label->setVisible(!_label->text().trimmed().isEmpty() || p ||
                     _list->isVisible() ||
                     _info->isVisible() ||
                     _name->isVisible());
}

ImageClusterLineEdit::ImageClusterLineEdit(QWidget* pParent, const char* pName) :
    VirtualClusterLineEdit(pParent, "image", "image_id", "image_name", "image_descrip", "image_data", 0, pName)
{
  setTitles(tr("Image"), tr("Images"));
  _numClause = QString(" AND (UPPER(image_name)=UPPER(:number)) ");
}

VirtualInfo *ImageClusterLineEdit::infoFactory()
{
  return new ImageInfo(this);
}

VirtualList *ImageClusterLineEdit::listFactory()
{
  return new ImageList(this);
}

VirtualSearch *ImageClusterLineEdit::searchFactory()
{
  return new ImageSearch(this);
}

ImageInfo::ImageInfo(QWidget *pParent, Qt::WindowFlags pFlags) : VirtualInfo(pParent, pFlags)
{
  _descripLit->hide();
  _descrip->hide();
}

ImageList::ImageList(QWidget *pParent, Qt::WindowFlags pFlags) : VirtualList(pParent, pFlags)
{
  _listTab->hideColumn(2);
}

ImageSearch::ImageSearch(QWidget *pParent, Qt::WindowFlags pFlags) : VirtualSearch(pParent, pFlags)
{
  _listTab->hideColumn(2);
  _searchDescrip->hide();
}
