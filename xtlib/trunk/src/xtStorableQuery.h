/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef __xtStorableQuery_H__
#define __xtStorableQuery_H__

#include <boost/regex.hpp>
#include <boost/lexical_cast.hpp>

#include "xtAnyUtility.h"
#include "xtFieldData.h"
#include "xtQuery.h"
#include "xtStorable.h"

// templates must be declared and defined in the .h file

template<class T> class xtStorableQuery
{
  public:
    xtStorableQuery(T *example) :
        _deletePtr(false)
    {
      if (! dynamic_cast<xtStorable *>(example))
        throw std::runtime_error("Cannot query based on an object that isn't xtStorable");

      _example = example;
      _queryResults.clear();
    }
    //added to allow templates to be expanded by SWIG for known types
    //and for those objects to be accessible from within the target language
    xtStorableQuery() :
        _deletePtr(true)
    {
        _example = new T();
        if(! dynamic_cast<xtStorable *>(_example))
            throw std::runtime_error("Cannot query based on an object that isn't xtStorable");
        _queryResults.clear();
    }
    //could be moved down but while testing leaving here
    void setExample(T *example)
    {
        if(! dynamic_cast<xtStorable *>(example))
            throw std::runtime_error("Cannot query based on an object that isn't xtStorable");
        _example = example;
        _queryResults.clear();
    }
    //could be moved down but while testing leaving here
    T* getExample()
    {
        return _example;
    }

    virtual ~xtStorableQuery() 
    {
        if(_deletePtr)
            delete _example;
    }

    /* TODO: this is incredibly inefficient if xtStorable::load() pulls
             from the db every time
     */
    virtual void exec()
    {
      xtStorable *storable = dynamic_cast<xtStorable *>(_example);

      if(! storable)
          throw std::runtime_error("Cannot query based on an object that isn't xtStorable");

      std::string sql = "SELECT " + storable->getFieldPrefix() + "id FROM ";
      sql += storable->getTableName();

      std::string where;
      std::set<std::string> fields = storable->getPropertyNames(xtlib::FieldRole);
      for (std::set<std::string>::const_iterator field = fields.begin();
           field != fields.end();
           field++)
      {
        boost::any pFieldData = storable->getProperty(*field, xtlib::FieldRole);
        boost::any pCriterion = storable->getProperty(*field);
        xtFieldData fd = boost::any_cast<xtFieldData>(pFieldData);
        if (! pCriterion.empty())
        {
          if (! where.empty())
              where += " AND ";
          where += "(\"" + storable->getFieldPrefix() + fd.fieldName + "\"";

          if (pCriterion.type() == typeid(boost::regex))
            where += "~*";
          else
            where += "=";

          where += "'" + xtAnyUtility::toString(pCriterion) + "')";
        }
      }
      if (! where.empty())
        sql += " WHERE (" + where + ")";
      sql += ";";

      xtQuery query;
      query.exec(sql);
      for (int row = 0; row < query.rowCount(); row++)
      {
        T *newone = new T();
        newone->load(boost::lexical_cast<long long>(query.getValue(row, storable->getFieldPrefix() + "id")));
        _queryResults.insert(newone);
      }
    }

    std::set<T*> result() const
    {
      return _queryResults;
    }

  protected:
    T                 *_example;
    std::set<T*>       _queryResults;
  private:
    // this is here only because this is a template class
    bool              _deletePtr;
};

#endif // __xtStorableQuery_H__
