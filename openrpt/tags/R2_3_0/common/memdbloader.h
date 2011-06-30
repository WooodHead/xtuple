#ifndef MEMDBLOADER_H
#define MEMDBLOADER_H

#include <QStringList>
#include <QDomElement>

class MemDbLoader 
{
public:
    MemDbLoader();
    ~MemDbLoader();

private:
    
public:
    // Load the DB from a file
    bool load(const QString &filename);
    // Load the DB from a DomElement
    bool load(const QDomElement & elemSource);
    QString lastError() {return _lastError;}
    
private:
    // Parse the table infos
    void parseTable(const QDomElement & elemSource);
    void parseColumns(const QDomElement & elemSource);
    void parseRecord(const QDomElement & elemSource);
    
    QString 	_lastError;
    QString 	_tableName;
    QStringList _columnNames;
    
};

#endif // MEMDBLOADER_H
