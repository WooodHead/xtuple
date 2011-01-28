/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
/**
    \class xtDatabase
    \brief A connection object to a database.

    This class connects to a database and is used in conjunction with xtQuery
    to query information from that database.

 */

/**
    \class xtQuery
    \brief A query object used to execute and retrieve information from an
           \c xtDatabase object.
 */

/*
   If NO_DB_IMPLEMENTATION is defined then we will not include any
   of the contents of this file. The library will be incomplete but
   will allow a program to define its own implementation that the
   library would use when linked together.

   This is more of a short term solution.
 */
#define NO_DB_IMPLEMENTATION
#ifndef NO_DB_IMPLEMENTATION

#include <stdexcept>

#include "xtDatabase.h"
#include "xtQuery.h"

#include <libpq-fe.h>

//
// xtDatabasePrivate implementation
//
class xtDatabasePrivate
{
  friend class xtQueryPrivate;

  public:
    xtDatabasePrivate();
    virtual ~xtDatabasePrivate();

    bool open(const std::string & options);
    bool close();

    bool isOpen() const;

    bool begin();
    bool commit();
    bool rollback();

    std::string lastErrorString() const;

    std::string escapeString(const std::string &) const;

  protected:
    PGconn *conn;
};

xtDatabasePrivate::xtDatabasePrivate()
{
  conn = 0;
}

xtDatabasePrivate::~xtDatabasePrivate()
{
  close();
}

bool xtDatabasePrivate::open(const std::string & options)
{
  if(conn)
    close();

  conn = PQconnectdb(options.c_str());

  bool ok = true;
  if (PQstatus(conn) != CONNECTION_OK)
  {
    ok = false;
  }

  return ok;
}

bool xtDatabasePrivate::close()
{
  if(conn)
  {
    PQfinish(conn);
    conn = 0;
  }

  return true;
}

bool xtDatabasePrivate::isOpen() const
{
  return (PQstatus(conn) == CONNECTION_OK);
}

bool xtDatabasePrivate::begin()
{
  bool ok = true;
  PGresult *res = PQexec(conn, "BEGIN");
  if (PQresultStatus(res) != PGRES_COMMAND_OK)
  {
    ok = false;
  }
  PQclear(res);

  return ok;
}

bool xtDatabasePrivate::commit()
{
  bool ok = true;
  PGresult *res = PQexec(conn, "COMMIT");
  if (PQresultStatus(res) != PGRES_COMMAND_OK)
  {
    ok = false;
  }
  PQclear(res);

  return ok;
}

bool xtDatabasePrivate::rollback()
{
  bool ok = true;
  PGresult *res = PQexec(conn, "ROLLBACK");
  if (PQresultStatus(res) != PGRES_COMMAND_OK)
  {
    ok = false;
  }
  PQclear(res);

  return ok;
}

std::string xtDatabasePrivate::lastErrorString() const
{
  return PQerrorMessage(conn);
}

std::string xtDatabasePrivate::escapeString(const std::string & original) const
{
  char *to = new char[((original.size()*2)+5)];
  size_t toSize = PQescapeStringConn(conn, to, original.c_str(), original.size(), 0);
  std::string newStr(to, toSize);
  delete [] to;
  return newStr;
}

static xtDatabasePrivate privateSingleton;
static xtDatabase * databaseSingleton = 0;

//
// xtDatabase implementation
//

/**
    \brief Construct a new \c xtDatabase instance.
 */
xtDatabase::xtDatabase()
{
}

/**
    \brief Destruct an \c xtDatabase instance.
 */
xtDatabase::~xtDatabase()
{
}

/**
    \brief Get an instance of the \c xtDatabase object.

    \return A pointer to an \c xtDatabase instance.
 */
xtDatabase * xtDatabase::getInstance()
{
  if(!databaseSingleton)
    databaseSingleton = new xtDatabase();

  return databaseSingleton;
}

/**
    \brief Open a connection to the database server.

    Takes a string of connection options. The connection options
    are specific to the underlying storage system. The default
    implementation is a \c libpq database driver.
  
    \param options The connection string.
    \throw std::runtime_error If the connection fails a \c std::runtime_error is thrown.
  */
void xtDatabase::open(const std::string & options)
{
  if (! privateSingleton.open(options))
    throw std::runtime_error(privateSingleton.lastErrorString());
}

/**
    \brief Close the connection to the database.

    \throw std::runtime_error If there is an error closing the connection
                              a \c std::runtime_error is thrown.
 */
void xtDatabase::close()
{
  if (! privateSingleton.close())
    throw std::runtime_error(privateSingleton.lastErrorString());
}

/**
    \brief Indicates if a valid connection is open.

    \return \c true if the connection is open and valid.
 */
bool xtDatabase::isOpen() const
{
  return privateSingleton.isOpen();
}

/**
    \brief Begin a transaction.

    \throw std::runtime_error If an error occurs while starting a transaction
                              then a \c std::runtime_error is thrown.
 */
void xtDatabase::begin()
{
  if (! privateSingleton.begin())
    throw std::runtime_error(privateSingleton.lastErrorString());
}

/**
    \brief Commit a transaction.

    \throw std::runtime_error If an error occurs while committing a transaction
                              then a \c std::runtime_error is thrown.
 */
void xtDatabase::commit()
{
  if (! privateSingleton.commit())
    throw std::runtime_error(privateSingleton.lastErrorString());
}

/**
    \brief Rolls back a transaction.

    \throw std::runtime_error If an error occurs while rolling back a transaction
                              then a \c std::runtime_error is thrown.
 */
void xtDatabase::rollback()
{
  if (! privateSingleton.rollback())
    throw std::runtime_error(privateSingleton.lastErrorString());
}

/**
    \brief Returns a textual error message of the last error to occurr
           on this connection.

    \return The last error message.
 */
std::string xtDatabase::lastErrorString() const
{
  return privateSingleton.lastErrorString();
}

/**
    \brief Escapes a string for use with Database.

    This method should be called on every query string submitted to the
    database through xtQuery. It increases the safety of executing the
    query.

    \param original The string to be escaped.

    \return An escaped string of the original.
 */
std::string xtDatabase::escapeString(const std::string & original) const
{
  return privateSingleton.escapeString(original);
}

//
// xtQueryPrivate implementation
//
class xtQueryPrivate {
  public:
    xtQueryPrivate();
    virtual ~xtQueryPrivate();

    void clear();

    bool exec(const std::string &);

    bool isValid() const;
    std::string lastErrorString() const;

    int rowCount() const;
    int columnCount() const;
    int getColumnByName(const std::string &) const;
    std::string getNameByColumn(int) const;
    std::string getValue(int, int) const;

    bool isNull(int, int) const;

  protected:
    PGresult * res;
};

xtQueryPrivate::xtQueryPrivate()
{
  res = 0;
}

xtQueryPrivate::~xtQueryPrivate()
{
  clear();
}

void xtQueryPrivate::clear()
{
  if(res)
  {
    PQclear(res);
    res = 0;
  }
}

bool xtQueryPrivate::exec(const std::string & query)
{ 
  clear();
  res = PQexec(privateSingleton.conn, query.c_str());
  return (PQresultStatus(res) == PGRES_COMMAND_OK ||
          PQresultStatus(res) == PGRES_TUPLES_OK  ||
          PQresultStatus(res) == PGRES_EMPTY_QUERY);
}

bool xtQueryPrivate::isValid() const
{
  if(res)
  {
    if(PQresultStatus(res) == PGRES_COMMAND_OK)
    {
      return true;
    }
  }
  return false;
}

std::string xtQueryPrivate::lastErrorString() const
{
  return PQresultErrorMessage(res);
}

int xtQueryPrivate::rowCount() const
{
  return PQntuples(res);
}

int xtQueryPrivate::columnCount() const
{
  return PQnfields(res);
}

int xtQueryPrivate::getColumnByName(const std::string & name) const
{
  return PQfnumber(res, name.c_str());
}

std::string xtQueryPrivate::getNameByColumn(int c) const
{
  return PQfname(res, c);
}

std::string xtQueryPrivate::getValue(int r, int c) const
{
  return PQgetvalue(res, r, c);
}

bool xtQueryPrivate::isNull(int r, int c) const
{
  return PQgetisnull(res, r, c);
}

//
// xtQuery implementation
//

/**
    \brief Construct a default \c xtQuery object.
 */
xtQuery::xtQuery()
{
  _data = new xtQueryPrivate();
}

/**
    \brief Deconstruct an xtQuery object.
 */
xtQuery::~xtQuery()
{
  delete _data;
  _data = 0;
}

/**
    \brief Execute an SQL query against the database.

    \param query The SQL to execute on the database.

    \throw std::runtime_error If there is an error a \c std::runtime_error
                              is thrown with the error message from the database.
 */
void xtQuery::exec(const std::string & query)
{
  bool ok = _data->exec(query);
  if (! ok)
    if (_data->lastErrorString().empty())
      throw std::runtime_error("unknown database error");
    else
      throw std::runtime_error(_data->lastErrorString());
}

/**
    \brief Indicates if the \c xtQuery object is valid.

    \return \c true if the object is currently valid.
 */
bool xtQuery::isValid() const
{
  return _data->isValid();
}

/**
    \brief Returns a textual error message of the last error to occur
           on this xtQuery object.

    \return The last error message.
 */
std::string xtQuery::lastErrorString() const
{
  return _data->lastErrorString();
}

/**
    \brief Returns the number of rows returned by an executed query.

    \return Number of rows.
 */
int xtQuery::rowCount() const
{
  return _data->rowCount();
}

/**
    \brief Returns the number of columns returned by an executed query.

    \return Number of columns.
 */
int xtQuery::columnCount() const
{
  return _data->columnCount();
}

/**
    \brief Get the position of a column in the query by it's name.

    \param name The column name.
    \return Column position of named column.
 */
int xtQuery::getColumnByName(const std::string & name) const
{
  return _data->getColumnByName(name);
}

/**
    \brief Get then name of the column by it's position in the query.

    \param column The position of the column.
    \return Name of the column for the specified position.
 */
std::string xtQuery::getNameByColumn(int column) const
{
  return _data->getNameByColumn(column);
}

/**
    \brief Get a value from the query results for a given row, column pair.

    \param row The row of the result to retrieve.
    \param column The column of the result to retrieve.
    \return String representation value of the result.
 */
std::string xtQuery::getValue(int row, int column) const
{
  return _data->getValue(row, column);
}

/**
    \brief Overloaded function that gets value from query result using row, name pair.

    \param row The row of the result to retrieve.
    \param name The name of the column to retrieve.
    \return String representation value of the result.
 */
std::string xtQuery::getValue(int row, const std::string & name) const
{
  return _data->getValue(row, _data->getColumnByName(name));
}

/**
    \brief Get if a value is null from the query results for a given row, column pair.

    \param row The row of the result to retrieve.
    \param column The column of the result to retrieve.
    \return \c true if the value is null.
 */
bool xtQuery::isNull(int row, int column) const
{
  return _data->isNull(row, column);
}

/**
    \brief Overloaded function that gets if a value is null from query result using row, name pair.

    \param row The row of the result to retrieve.
    \param name The name of the column to retrieve.
    \return \c true if the value is null.
 */
bool xtQuery::isNull(int row, const std::string & name) const
{
  return _data->isNull(row, _data->getColumnByName(name));
}

#endif // NO_DB_IMPLEMENTATION

