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

/*
 *     This file contains the code that will render the extended 3of9 barcode.
 * This code will parse a string and build a compliant 3of9 string and then
 * call the 3of9 renderer to do the actual drawing.
 */

#include <qstring.h>
#include <qrect.h>
#include <QPainter>

void render3of9(const QRect &, const QString &, int, QPainter *);


struct _ext3of9map {
    char code;
    QString conversion;
};
const struct _ext3of9map ext3of9map[] = {
    { '\0' , "%U" }, // NUL
    { '\001' , "$A" }, // SOH
    { '\002' , "$B" }, // STX
    { '\003' , "$C" }, // ETX
    { '\004' , "$D" }, // EOT
    { '\005' , "$E" }, // ENQ
    { '\006' , "$F" }, // ACK
    { '\007' , "$G" }, // BEL
    { '\010' , "$H" }, // BS
    { '\011' , "$I" }, // HT
    { '\012' , "$J" }, // LF
    { '\013' , "$K" }, // VT
    { '\014' , "$L" }, // FF
    { '\015' , "$M" }, // CR
    { '\016' , "$N" }, // SO
    { '\017' , "$O" }, // SI
    { '\020' , "$P" }, // DLE
    { '\021' , "$Q" }, // DC1
    { '\022' , "$R" }, // DC2
    { '\023' , "$S" }, // DC3
    { '\024' , "$T" }, // DC4
    { '\025' , "$U" }, // NAK
    { '\026' , "$V" }, // SYN
    { '\027' , "$W" }, // ETB
    { '\030' , "$X" }, // CAN
    { '\031' , "$Y" }, // EM
    { '\032' , "$Z" }, // SUB
    { '\033' , "%A" }, // ESC
    { '\034' , "%B" }, // FS
    { '\035' , "%C" }, // GS
    { '\036' , "%D" }, // RS
    { '\037' , "%E" }, // US
    { ' ' , " " }, // SPACE
    { '!' , "/A" },
    { '"' , "/B" },
    { '#' , "/C" },
    { '$' , "/D" },
    { '%' , "/E" },
    { '&' , "/F" },
    { '\'' , "/G" },
    { '(' , "/H" },
    { ')' , "/I" },
    { '*' , "/J" },
    { '+' , "/K" },
    { ',' , "/L" },
    { '-' , "-" }, // /M
    { '.' , "." }, // /N
    { '/' , "/O" },
    { '0' , "0" }, // /P
    { '1' , "1" }, // /Q
    { '2' , "2" }, // /R
    { '3' , "3" }, // /S
    { '4' , "4" }, // /T
    { '5' , "5" }, // /U
    { '6' , "6" }, // /V
    { '7' , "7" }, // /W
    { '8' , "8" }, // /X
    { '9' , "9" }, // /Y
    { ':' , "/Z" },
    { ';' , "%F" },
    { '<' , "%G" },
    { '=' , "%H" },
    { '>' , "%I" },
    { '?' , "%J" },
    { '@' , "%V" },
    { 'A' , "A" },
    { 'B' , "B" },
    { 'C' , "C" },
    { 'D' , "D" },
    { 'E' , "E" },
    { 'F' , "F" },
    { 'G' , "G" },
    { 'H' , "H" },
    { 'I' , "I" },
    { 'J' , "J" },
    { 'K' , "K" },
    { 'L' , "L" },
    { 'M' , "M" },
    { 'N' , "N" },
    { 'O' , "O" },
    { 'P' , "P" },
    { 'Q' , "Q" },
    { 'R' , "R" },
    { 'S' , "S" },
    { 'T' , "T" },
    { 'U' , "U" },
    { 'V' , "V" },
    { 'W' , "W" },
    { 'X' , "X" },
    { 'Y' , "Y" },
    { 'Z' , "Z" },
    { '[' , "%K" },
    { '\\' , "%L" },
    { ']' , "%M" },
    { '^' , "%N" },
    { '_' , "%O" },
    { '`' , "%W" },
    { 'a' , "+A" },
    { 'b' , "+B" },
    { 'c' , "+C" },
    { 'd' , "+D" },
    { 'e' , "+E" },
    { 'f' , "+F" },
    { 'g' , "+G" },
    { 'h' , "+H" },
    { 'i' , "+I" },
    { 'j' , "+J" },
    { 'k' , "+K" },
    { 'l' , "+L" },
    { 'm' , "+M" },
    { 'n' , "+N" },
    { 'o' , "+O" },
    { 'p' , "+P" },
    { 'q' , "+Q" },
    { 'r' , "+R" },
    { 's' , "+S" },
    { 't' , "+T" },
    { 'u' , "+U" },
    { 'v' , "+V" },
    { 'w' , "+W" },
    { 'x' , "+X" },
    { 'y' , "+Y" },
    { 'z' , "+Z" },
    { '{' , "%P" },
    { '|' , "%Q" },
    { '}' , "%R" },
    { '~' , "%S" },
    { '\177' , "%T" }, // DEL

    { -1 , NULL }
};

QString convertTo3of9(QChar c) {
    for(int i = 0; ext3of9map[i].conversion != QString::null; i++) {
        if(ext3of9map[i].code == c.toAscii()) return ext3of9map[i].conversion;
    }
    return QString::null;
}


void renderExtended3of9(const QRect & r, const QString & str, int align, QPainter * pPainter) {
    QString new_str;
    QChar c;

    for(unsigned int i = 0; i < str.length(); i++) {
        c = str.at(i);
        new_str += convertTo3of9(c);
    }

    render3of9(r, new_str, align, pPainter);

    return;
}
