/*
 * Copyright (c) 2002-2006 by OpenMFG, LLC
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

#include "quuencode.h"

#include <qstring.h>
#include <qiodevice.h>
#include <qtextstream.h>
#include <qbuffer.h>

#define ENC(c) ((c) ? ((c) & 077) + ' ': '`')
#define DEC(c) (((c) - ' ') & 077)

QString QUUEncode(QIODevice & iod, const QString & _remote, int mode) {
    QString value;
    QString remote = _remote;
    if(!iod.isOpen()) {
        if(!iod.open(IO_ReadOnly)) {
            qDebug("Could not open the QIODevice for reading.");
            return QString::null;
        }
    }

    if(remote == QString::null) remote = "internal";
    if(mode == 0) mode = 0644;

    value = QString().sprintf("begin %o %s\n", mode, (const char*)remote);

    Q_LONG nr = 0;
    char data[45];
    char c;
    char * b;
    while( (nr = iod.readBlock(&data[0], 45)) > 0 ) {
        c = ENC(nr);
        value += c;
        for(b = data; nr > 0; nr -= 3, b += 3) {
            c = b[0] >> 2;
            c = ENC(c);
            value += c;
            c = ((b[0] << 4) & 060) | ((b[1] >> 4) & 017);
            c = ENC(c);
            value += c;
            c = ((b[1] << 2) & 074) | ((b[2] >> 6) & 03);
            c = ENC(c);
            value += c;
            c = b[2] & 077;
            c = ENC(c);
            value += c;
        }
        value += '\n';
    }
    c = ENC('\0');
    value += c;
    value += "\nend\n";

    return value;
}

QByteArray QUUDecode(const QString & _source, QString * name, int * mode) {
    QString source = _source;
    QByteArray b;
    if(source.isEmpty()) return b;

    QTextStream in(&source, IO_ReadOnly);

    QString l;
    // find the start of the UUEncoded data
    while( ((l = in.readLine()) != QString::null) && (!l.startsWith("begin ")) );
    if(!l.startsWith("begin ")) {
        qDebug("Did not find the start of the UUEncoded data.");
        return b;
    }

    QTextStream tin(&l, IO_ReadOnly);
    QString _begin, _name, _mode;
    tin >> _begin;
    tin >> _mode;
    tin >> _name;

    if(_begin != "begin") {
        qDebug("We may have a problem. Header not parsed correctly.");
    }

    if(name != 0) {
        *name = _name;
    }
    QChar qc;
    char c;
    if(mode != 0) {
        *mode = 0;
        for(unsigned int i = 0; i < _mode.length(); i++) {
            qc = _mode.at(i);
            c = qc;
            c -= '0'; // convert the ascii value to the decimal value
            *mode = (*mode << 3) | (c & 07);
        }
    }

    QBuffer buf(b);
    buf.open(IO_WriteOnly);

    int num = 0;
    char c0, c1, c2, c3;
    while( ((l = in.readLine()) != QString::null) && (!l.startsWith("end")) ) {
        qc = l[0];
        c = qc;
        num = DEC(c);
        for(int p = 1; num > 0; p += 4, num -= 3) {
            if(num >= 3) {
                qc = l[p + 0];
                c0 = qc;
                qc = l[p + 1];
                c1 = qc;
                qc = l[p + 2];
                c2 = qc;
                qc = l[p + 3];
                c3 = qc;

                c = DEC(c0) << 2 | DEC(c1) >> 4;
                buf.putch(c);
                c = DEC(c1) << 4 | DEC(c2) >> 2;
                buf.putch(c);
                c = DEC(c2) << 6 | DEC(c3);
                buf.putch(c);
            } else {
                if(num >= 1) {
                    qc = l[p + 0];
                    c0 = qc;
                    qc = l[p + 1];
                    c1 = qc;

                    c = DEC(c0) << 2 | DEC(c1) >> 4;
                    buf.putch(c);
                }
                if(num >= 2) {
                    qc = l[p + 1];
                    c1 = qc;
                    qc = l[p + 2];
                    c2 = qc;

                    c = DEC(c1) << 4 | DEC(c2) >> 2;
                    buf.putch(c);
                }
            }
        }
    }

    if(!l.startsWith("end")) {
        qDebug("We seem to have run out of file before we were finished.");
    }

    return b;
}
