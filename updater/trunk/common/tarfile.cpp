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
 * The Original Code is PostBooks Accounting, ERP, and CRM Suite. 
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2007 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
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
 * Copyright (c) 1999-2007 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by PostBooks, an open source solution from xTuple
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

#include "tarfile.h"

#include <qtextstream.h>
#include <qbuffer.h>

struct tarHeaderBlock {
    char name[100];     // name of file
    char mode[8];       // file mode
    char uid[8];        // owner user ID
    char gid[8];        // owner group ID
    char size[12];      // length of file in bytes
    char mtime[12];     // modified time of file
    char chksum[8];     // header checksum
    char typeflag;      // see type constants
    char linkname[100]; // name of linked file
    char magic[8];      // "ustar  " + null terminator
    char uname[32];     // owner user name
    char gname[32];     // owner group name
    char devmajor[8];   // device major number
    char devminor[8];   // device minor number
    char prefix[155];   // prefix for file names longer than 100 bytes
    char filler[12];    // filler to make header even 512 bytes
};

const char TYPE_REGULAR_ALT = '\0'; // old compatible flag for regular file
const char TYPE_REGULAR     = '0';  // regular file
const char TYPE_LINK        = '1';  // link to another file in archive
const char TYPE_SYMLINK     = '2';  // Symbolic link
const char TYPE_CHAR        = '3';  // Character special device
const char TYPE_BLOCK       = '4';  // Block special device
const char TYPE_DIR         = '5';  // Directory
const char TYPE_FIFO        = '6';  // FIFO special file
const char TYPE_CONTIGUOS   = '7';  // RESERVERED/Contiguous file


TarFile::TarFile(const QByteArray & bytes)
{
  _valid = false;

  QByteArray localBytes(bytes);
  QBuffer fin(&localBytes);
  if(!fin.open(QIODevice::ReadOnly))
    return;

  bool valid = false;
  long size = 0;
  long blocks = 0;
  char block[512];
  QString name, str;

  while(!fin.atEnd())
  {
    tarHeaderBlock head;
    fin.read((char*)&head, sizeof(head));

    if(head.name[0] == '\0' && head.size[0] == '\0' && head.typeflag == '\0')
      continue;

    QString magic(head.magic);
    if(magic != "ustar  ")
      return;

    name = QString(head.name);
    str = QString(head.size);
    size = str.toLong(&valid, 8);

    if(head.typeflag == TYPE_REGULAR_ALT)
      head.typeflag = TYPE_REGULAR;

    blocks = (size + 511) / 512;

    if(head.typeflag == TYPE_REGULAR)
    {
      QByteArray mybytes;
      QBuffer fout(&mybytes);
      fout.open(QIODevice::WriteOnly);
      for(int i = 0; i < blocks; i++)
      {
        fin.read(&block[0], 512);
        fout.write(&block[0], qMin(size,512L));
        size -= 512;
      }
      fout.close();
      _list.insert(name, mybytes);
    }
    else
    {
      for(int i = 0; i < blocks; i++)
        fin.read(&block[0], 512);
    }
  }
  _valid = true;
}

TarFile::~TarFile()
{
}
