#include "gunzip.h"

#include <zlib.h>
#include <qbuffer.h>

QByteArray gunzipFile(const QString & file)
{
  QByteArray data;

  gzFile fin = gzopen(file.latin1(), "rb");
  if(!fin)
    return data;

  QBuffer fout(&data);
  if(!fout.open(QIODevice::WriteOnly))
  {
    gzclose(fin);
    return data;
  }

  char bytes[1024];
  int byte_count;

  while(!gzeof(fin))
  {
    byte_count = gzread(fin, &bytes[0], 1024);
    if(byte_count == -1)
      break;
    if(byte_count > 0)
      fout.writeBlock(&bytes[0], byte_count);
  }

  fout.close();
  gzclose(fin);

  return data;
}
