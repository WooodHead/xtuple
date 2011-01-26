#ifndef __xtError_H__
#define __xtError_H__

#include <string>

class xtErrorPrivate;

class xtError
{
  public:
    enum ErrorType {
      NoError,
      ConnectionError,
      StatementError,
      TransactionError,
      UnknownError
    };

    xtError(int number = 0, const std::string & text = std::string(), ErrorType type = NoError);
    virtual ~xtError();

    int getNumber() const;
    virtual void setNumber(int number);

    const std::string & getText() const;
    virtual void setText(const std::string & text);

    enum ErrorType getType() const;
    virtual void setType(enum ErrorType type);

  private:
    xtErrorPrivate * _data;
};

#endif // __xtError_H__

