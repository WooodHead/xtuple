/* -----------------------------------------------------------------------------
 * std_set.i
 * ----------------------------------------------------------------------------- */

%include <std_common.i>

%{
#include <set>
#include <stdexcept>
%}

namespace std {

  template<class T> class set {
    public:
        typedef size_t size_type;
        typedef T value_type;
        typedef const value_type& const_reference;
        set();
        size_type size() const;
        void clear();
  };

}
