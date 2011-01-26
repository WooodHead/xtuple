%module xtlib

/**
 * These files are specifically ordered according to the
 * current status of the library source-code as of 1/24/2011
 * and needs to be maintained according to any changes
 */

%{
#include <set>
#include "xtlib.h"
#include "xtObject.h"
#include "xtStorable.h"
#include "xtAbstractCode.h"
#include "xtAnyUtility.h"
#include "xtClassCode.h"
#include "xtDatabase.h"
#include "xtError.h"
#include "xtQuery.h"
#include "xtStorableQuery.h"
%}

/**
 * PRE-PARSE CUSTOMIZATIONS
 */
%include "typemaps.i"
%include "std_string.i"
%include "std_vector.i"
%include "std_common.i"

/**
 * Necessary function typemap for the overloaded operator of xtFieldData
 */
%rename(xtfield_data_equals) xtFieldData::operator=(const xtFieldData &);

/**
 * TYPE-MAPS
 */


/**
 * NOTE: NEARLY ALL OF THESE TYPEMAPS NEED TO BE REASSESSED AND ARE NOT
 *       INTENDED FOR PRODUCTION USE
 */


/**
 * This typemap converts C++ std::vector<std::string> to PHP native
 * array of type string
 */
%typemap(out) std::vector<std::string>
{
    array_init(return_value);
    for(unsigned int i=0;i<$1.size();++i)
        add_next_index_string(return_value,$1[i].c_str(),1);
}

/**
 * This typemap converts C++ boost::any values to their string equivalent
 * to be returned to PHP for native use
 */
%typemap(out) boost::any 
{
  std::string value = xtAnyUtility::toString($1);
  ZVAL_STRINGL(return_value,value.c_str(),value.size(),1);
}

/**
 * This typemap converts C++ std::set<xtClassCode*> to a native PHP array
 * of xtClassCode references (used as normal objects in PHP) 
 * EX: after calling exec() on a xtStorableQuery<xtClassCode> and proceeding to
 * call result() normally returns a std::set<xtClassCode*> but this is not
 * useful in PHP - thus converting it to an array of xtClassCode which IS
 * useful since the class has been exposed to PHP but std::set has not
 */
%typemap(out) std::set<xtClassCode*>
{
    array_init(return_value);
    std::set<xtClassCode*>::iterator itr;
    itr = $1.begin();
    for(itr; itr != $1.end(); itr++) {
        zval *tmp;
        xtClassCode* tmpcc = 0;
        MAKE_STD_ZVAL(tmp);
        tmpcc = (xtClassCode*) new xtClassCode(**itr);
        SWIG_SetPointerZval(tmp,(void*)tmpcc,$descriptor(xtClassCode*),2);
        add_next_index_zval(return_value,tmp);
    }
}

/**
 * This typemap converts a std::set<std::string> to a native PHP array of
 * type string
 */
%typemap(out) std::set<std::string>
{
  array_init(return_value);
  std::set<std::string>::iterator itr;
  itr = $1.begin();
  for(itr; itr != $1.end(); itr++) {
    add_next_index_string(return_value,(*itr).c_str(),1);
  }
}

/**
 * Typemap for C++ functions that take a std::vector<std::string>& (reference) but
 * are always expecting a PHP array of type string
 * 
 * NOTE: if there is an occasion where we need to convert something ELSE to
 *       std::vector<std::string>& from PHP they will need to be explicitly
 *       applied or we will have problems with which one gets applied where
 */
%typemap(in) std::vector<std::string>& (std::vector<std::string> vec)
{
    zval **data;
    HashTable *hash;
    HashPosition ptr;
    int elem_count, i=0;

    hash = Z_ARRVAL_PP($input);
    elem_count = zend_hash_num_elements(hash);
    for(
        zend_hash_internal_pointer_reset_ex(hash,&ptr);
        zend_hash_get_current_data_ex(hash,(void**)&data,&ptr) == SUCCESS;
        zend_hash_move_forward_ex(hash,&ptr)
       )
    {
        zval temp, *str;
        int is_str = 1;
        if(Z_TYPE_PP(data) != IS_STRING)
        {
            temp = **data;
            zval_copy_ctor(&temp);
            convert_to_string(&temp);
            str = &temp;
            is_str = 0;
        }
        else
            str = *data;
        vec.push_back(std::string(Z_STRVAL_P(str)));

        if(!is_str)
            zval_dtor(&temp);
        ++i;
    }
    $1 = &vec;
}

/**
 * This typemap is used in tandem with the previous std::vector<std::string>& typemap
 * for being able to return the original array of type string with any modifications
 * instead of requiring there to have been a return variable that replaced the original
 */
%typemap(argout,noblock=1) std::vector<std::string>&
{
    array_init((*$input));
    for(unsigned int i=0;i<$1->size();++i)
        add_next_index_string((*$input),(*$1)[i].c_str(),1);
}

/**
 * Kept for example of how we could use char** if we needed/wanted to
 * for any reason - replaced by use of std::string and std::vector<std::string>
 */

/**
 * %typemap(in) char**
 * {
 *     zval **data;
 *     HashTable *arr_hash;
 *     HashPosition pointer;
 *     int cnt, i=0;
 * 
 *     arr_hash = Z_ARRVAL_PP($input);
 *     cnt = zend_hash_num_elements(arr_hash);
 * 
 *     $1 = (char**)malloc(sizeof(char*)*(cnt+1));
 *     for(
 *         zend_hash_internal_pointer_reset_ex(arr_hash,&pointer);
 *         zend_hash_get_current_data_ex(arr_hash,(void**)&data,&pointer) == SUCCESS;
 *         zend_hash_move_forward_ex(arr_hash,&pointer)
 *        )
 *     {
 *         zval temp, *php_str;
 *         int is_str = 1;
 *         if(Z_TYPE_PP(data) != IS_STRING)
 *         {
 *             temp = **data;
 *             zval_copy_ctor(&temp);
 *             convert_to_string(&temp);
 *             php_str = &temp;
 *             is_str = 0;
 *         }
 *         else
 *         {
 *             php_str = *data;
 *         }
 * 
 *         $1[i] = (char*)malloc(sizeof(char)*(Z_STRLEN_P(php_str)+1));
 *         strncpy($1[i],Z_STRVAL_P(php_str),Z_STRLEN_P(php_str)+1);
 * 
 *         if(!is_str)
 *         {
 *             zval_dtor(&temp);
 *         }
 *         i++;
 *     }
 *     $1[i] = 0;
 * }
 */

/**
 * END TYPE-MAPS
 */

/**
 * END PRE-PARSE CUSTOMIZATIONS
 */

/**
 * These files are specifically ordered according to the
 * current status of the library source-code as of 1/24/2011
 * and needs to be maintained according to any changes
 */

%include "xtlib.h"
%include "xtObject.h"
%include "xtStorable.h"
%include "xtAbstractCode.h"
%include "xtAnyUtility.h"
%include "xtClassCode.h"
%include "xtDatabase.h"
%include "xtError.h"
%include "xtQuery.h"
%include "xtStorableQuery.h"

/**
 * POST-PARSE CUSTOMIZATIONS
 */

%template(xtClassCodeStorable) xtStorableQuery<xtClassCode>;
%template(stringVector) std::vector<std::string>;

/**
 * An example of how to extend a class
 */

/**
 * %template(stringSet) std::set<std::string>;
 * %extend std::set<std::string> {
 *     std::string getContents() {
 *         std::string contents = "";
 *         std::string ret = "";
 *         std::set<std::string>::iterator it;
 *         for(it=(*self).begin();it!=(*self).end();it++)
 *             contents += ", "+(*it);
 *         ret = contents.substr(2,contents.length());
 *         return ret;
 *     }
 * };
 */

/**
 * This extension to xtClassCode provides an overloaded function for PHP
 * to call a method that actually exists in the C++ but requires datatypes
 * that are NOT available to the PHP. It attempts to determine whether or
 * not the intention of the string supplied from PHP was supposed to be
 * a string literal or a regex expression and supplies it to the C++
 * accordingly. This could be avoided if the C++ method instead did
 * something similar
 */
%extend xtClassCode
{
  void setProperty(const std::string & name, const std::string & value, int role = xtlib::ValueRole)
  {
    if(role == xtlib::RequiredRole
    || role == xtlib::PreviousValueRole
    || role == xtlib::StatusRole
    || role == xtlib::FieldRole
    || role == xtlib::CheckerRole)
      throw std::runtime_error("setProperty called with proected role id.");

    boost::smatch what;
    boost::regex e("^/.*/$");
    if(boost::regex_match(value,what,e,boost::match_extra))
    {
      std::string rep = value.substr(1,value.size()-2);
      $self->setProperty(name,boost::regex(rep),role);
    }
    else
      $self->setProperty(name,boost::any(value),role);
  }
};
 
/**
 * END POST-PARSE CUSTOMIZATIONS
 */
