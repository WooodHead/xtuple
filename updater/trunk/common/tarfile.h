#ifndef __TARFILE_H__
#define __TARFILE_H__

#include <qstring.h>
#include <q3cstring.h>
#include <qmap.h>

class TarFile {
  public:
    TarFile(const QByteArray &);
    virtual ~TarFile();

    QMap<QString, QByteArray> _list;

    bool isValid() { return _valid; }

  private:
    bool _valid;
};

#endif

