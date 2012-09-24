#include <QString>
#include <QRectF>
#include <QPainter>
#include <QPen>
#include <QBrush>
#include <qimage.h>
#include <QRegExp>

#include "parsexmlutils.h"
#include "renderobjects.h"

#include "dmtx.h"
#include "stdexcept"


static void printRR(QPainter *painter, const QRectF &qrect)
{
  qreal Xo = qrect.left();
  qreal Yo = qrect.bottom();

  //length of square
  qreal pas =  std::min(qrect.width()/7, qrect.height()/4);

  //draw the RR

  for(int t = 0; t <= 1; t++)
  {
    for(int y=0; y<4; y++)
    {
      painter->drawRect(QRectF( Xo + t*4*pas,
                                Yo - y*pas,
                                pas,
                                pas));

      painter->drawRect(QRectF( Xo + ((y + 1)%2 + 1 + t*4)*pas,
                                Yo - y*pas,
                                pas,
                                pas));
    }
  }
}

void datamatrixGeometry(QString &inFormat, const QRectF &inQrect,DmtxImage *inImg, qreal *outXo, qreal *outYo, qreal *outPas)
{
  *outPas =  std::min(inQrect.width()/inImg->width, inQrect.height()/inImg->height);
  *outYo = inQrect.bottom();

  //alignement left
  if(inFormat == "L")
  {
    *outXo = inQrect.left();
  }

  //alignement Center
  if(inFormat == "C")
  {
		qreal Xc = (inQrect.left() + inQrect.right()) / 2;
    *outXo = Xc - (((qreal)inImg->width) * (*outPas));
  }

  //alignement Rigth
  if(inFormat == "R")
  {
    *outXo = inQrect.right() - (*outPas * inImg->width);
  }
}

void renderCodeDatamatrix(QPainter *painter, const QRectF &qrect, const QString &qstr, OROBarcode * bc)
{

	//5 pixel par carré
  //qreal pix = 5;
  //lecture du type de datamatrix
  QRegExp regex("[a-zA-Z]{10}_([0-9]{1,2})_([LCR]{1})");
  regex.indexIn(bc->format());
  int type = regex.cap(1).toInt();
  QString align = regex.cap(2);

  size_t          width, height, bytesPerPixel;

  //pointer declaration
  unsigned char  *pxl = NULL;
  DmtxEncode     *enc = NULL;
  DmtxImage      *img = NULL;
  int valeur = 0;

  /* 1) ENCODE a new Data Matrix barcode image (in memory only) */
  enc = dmtxEncodeCreate();

  //see DmtxSymbolSize in dmtx.h for more details
  enc->sizeIdxRequest = type;
  enc->marginSize = 0;
  //number of pixel for one square
  enc->moduleSize = 1;

  QPen pen(Qt::NoPen);
  QBrush brush(QColor("black"));
  painter->save();
  painter->setPen(pen);
  painter->setBrush(brush);

  try
  {
    //assert(enc != NULL);
    dmtxEncodeDataMatrix(enc, qstr.size(), (unsigned char*)qstr.toStdString().c_str());

    /* 2) COPY the new image data before releasing encoding memory */

    width = dmtxImageGetProp(enc->image, DmtxPropWidth);
    height = dmtxImageGetProp(enc->image, DmtxPropHeight);
    bytesPerPixel = dmtxImageGetProp(enc->image, DmtxPropBytesPerPixel);

    if(width > 1000000000)
    {
			throw std::runtime_error("Code is to big for the Datamatrix");
    }

    pxl = (unsigned char *)malloc(width * height * bytesPerPixel);
    //assert(pxl != NULL);
    memcpy(pxl, enc->image->pxl, width * height * bytesPerPixel);

    dmtxEncodeDestroy(&enc);

    /* 3) DECODE the Data Matrix barcode from the copied image */
    img = dmtxImageCreate(pxl, width, height, DmtxPack24bppRGB);

    qreal Xo = 0;
    qreal Yo = 0;
    //length of square
    qreal pas = 0;

    datamatrixGeometry(align,qrect,img,&Xo,&Yo,&pas);

    //draw the datamatrix
    for(int y = 0; y < img->height; y++)
    {
      for(int x = 0; x < img->width; x++)
      {
        dmtxImageGetPixelValue(img,x,y,0,&valeur);

        if(valeur == 0)
        {
          painter->drawRect(QRectF(	Xo + x*pas,
                                Yo - y*pas,
                                pas,
                                pas));
        }
      }
    }

    //memory cleanning
    free(pxl);
    dmtxEncodeDestroy(&enc);
    dmtxImageDestroy(&img);
  }
  catch(...)
  {
    //there is a problem with the datamatrix
    //RR is printed
    printRR(painter, qrect);

    //memory cleaning
    if(enc != NULL)
    {
      dmtxEncodeDestroy(&enc);
    }
    if(img != NULL)
    {
      dmtxImageDestroy(&img);
    }
    if(pxl!=NULL)
    {
      free(pxl);
    }
  }

  painter->restore();
}


