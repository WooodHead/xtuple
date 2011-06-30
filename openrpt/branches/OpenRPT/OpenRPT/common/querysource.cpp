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

#include "querysource.h"

//
// QuerySource method implementations
//
QuerySource::QuerySource()
  : _inList(0)
{
}

QuerySource::QuerySource(const QString & n, const QString & q)
  : _name(n), _query(q), _inList(0)
{
}

QuerySource::~QuerySource()
{
  if (_inList != 0)
    _inList->remove(this);
}

QString QuerySource::name()
{
  return _name;
}
void QuerySource::setName(const QString & n)
{
  if (_name != n)
  {
    _name = n;
    updated();
  }
}
QString QuerySource::query()
{
  return _query;
}
void QuerySource::setQuery(const QString & q)
{
  if (_query != q)
  {
    _query = q;
    updated();
  }
}

void QuerySource::updated()
{
  if (_inList != 0)
    _inList->childUpdated(this);
}

//
// QuerySourceList method implementations
//
QuerySourceList::QuerySourceList(QObject * parent, const char *name)
  : QObject(parent, name)
{
  _srcList.clear();
  _srcList.setAutoDelete(FALSE);
}

QuerySourceList::~QuerySourceList()
{
  // since we are coupled with QuerySource pretty firmly
  // We will go through the _srcList and remove the values
  // so as to prevent any confusion about what gets deleted
  // when and how
  QuerySource *qs = 0;
  while (size() > 0)
  {
    qs = remove(0);             // remove from list
    if (qs)
    {
      delete qs;                // delete
      qs = 0;
    }
  }
}

unsigned int QuerySourceList::size()
{
  return _srcList.count();
}

bool QuerySourceList::add(QuerySource * qs)
{
  if (qs && !qs->_name.isEmpty())
  {
    if (get(qs->_name) == 0)
    {
      if (qs->_inList != 0)
        qs->_inList->remove(qs);
      qs->_inList = this;
      _srcList.append(qs);
      emit updated();
      return TRUE;
    }
  }
  return FALSE;
}

QuerySource *QuerySourceList::remove(int i)
{
  QuerySource *qs = 0;

  if (i >= 0 && (unsigned int)i < size())
  {
    qs = (QuerySource *) _srcList.at(i);
    _srcList.take(i);
  }

  if (qs != 0)
  {
    qs->_inList = 0;            // mark this object as not being in any list
    emit updated();
  }

  return qs;
}

QuerySource *QuerySourceList::remove(QuerySource * qs)
{
  if (qs && !qs->_name.isEmpty())
    return remove(qs->_name);
  return 0;
}

QuerySource *QuerySourceList::remove(const QString & name)
{
  if (!name.isEmpty())
  {
    QuerySource *qs = 0;
    for (unsigned int i = 0; i < size(); i++)
    {
      qs = (QuerySource *) _srcList.at(i);
      if (qs->_name == name)
        return remove(i);
    }
  }
  return 0;
}

QuerySource *QuerySourceList::get(int i)
{
  if (i >= 0 && (unsigned int)i < size())
    return _srcList.at(i);
  return 0;
}

QuerySource *QuerySourceList::get(const QString & name)
{
  if (!name.isEmpty())
  {
    QuerySource *qs = 0;
    for (unsigned int i = 0; i < size(); i++)
    {
      qs = (QuerySource *) _srcList.at(i);
      if (qs->_name == name)
        return qs;
    }
  }
  return 0;
}

void QuerySourceList::childUpdated(QuerySource * /*qs */ )
{
  // one of the items in our list has been updated
  // don't really care which one although we do have
  // that information. Just pass along that our list
  // has been updated to any one who wants to know that
  // information
  emit updated();
}
