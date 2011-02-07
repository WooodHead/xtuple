/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

// documentation only since the entire implementation is in the header file

/**
  \class xtStorableQuery
  
  \brief A templated class for query-by-example for xtStorable objects.

  xtStorableQuery provides a way to avoid embedding direct database
  queries in xtlib code. It works by implementing Query By Example
  using an xtStorable object. The caller must instantiate a new
  example object, initialize the xtlib::ValueRole properties to be
  used to build the query, then instantiate the xtStorableQuery
  using this example object and execute the query.

  The following example shows how to build and execute a query for
  xtClassCode objects, then send the results to \c std::cout. Several
  variables have been set prior to this point:

  \li \c exval is the example value entered by the user.
  \li \c isregex is a \c bool indicating whether to do a
      regular expression search or exact match.
  \li \c expn has been set to either \c code or \c description to
      choose which property of the xtClassCode to search on.

  \dontinclude classcode/cli/main.cpp
  \skip xtClassCode ex;
  \until }

  \todo Add support for other query methods, such as <, >, and ranges.
  \todo Add support for case-sensitive vs. case-insensitive regular expression
        searches.



  \fn xtStorableQuery::xtStorableQuery(T *example)

  \brief Construct an xtStorableQuery object using the example object.

  This creates an xtStorableQuery object using the example object as a
  template. The query is executed by the exec() method and the results
  can be obtained with result().

  The example object should be constructed and initialized before calling
  xtStorableQuery(). To initialize it, choose the properties of the object
  to use as the basis of the query, then set those properties on the example.
  Use a \c std::string value to get an exact match or a \c QRegExp to
  look for multiple values.
  
  \param example A pointer to a freshly-constructed and initialized xtStorable.

  \throw std::runtime_error The example is not a pointer to an xtStorable.



  \fn xtStorableQuery::~xtStorableQuery()

  \brief Destructor for the xtStorableQuery object.



  \fn xtStorableQuery::exec()

  \brief Execute the query-by-example.

  exec() converts the xtlib::ValueRole properties of the \c example object
  into a query and runs the query. Every object of the class T that
  matches the query is added to the \c std::set _queryResults. These
  retrieved objects can be obtained by calling result().



  \fn std::set<T*> xtStorableQuery::result() const

  \brief Return the results of a previously-executed query.

  \return The results of the query as a \c std::set of pointers to
	  the appropriate xtStorable subclass. If exec() has not
	  been called, this returns an empty set.



  \var T* xtStorableQuery<T>::_example

  \brief The the xtStorable object pointer passed to the constructor.

*/
// comment close/reopen is required to separate the docs for the two vars; i don't know why
/**

  \var std::set<T*> xtStorableQuery<T>::_queryResults

  \brief The \c std::set to hold the query results.

  The results of the query as a \c std::set of pointers to the appropriate
  xtStorable subclass. If exec() has not been called, this set is empty.

 */
