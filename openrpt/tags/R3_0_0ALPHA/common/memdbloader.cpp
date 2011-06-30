#include <QFile>
#include <QDomElement>
#include <QSqlQuery>
#include <QSqlDatabase>

#include "memdbloader.h"

MemDbLoader::MemDbLoader()
{
}

MemDbLoader::~MemDbLoader()
{
}

// Load the DB from a file
bool MemDbLoader::load(const QString &filename)
{
    QFile * f = new QFile(filename);

    QDomDocument doc = QDomDocument();
    QString errMsg;
    int errLine, errCol;

    if(!doc.setContent(f,&errMsg,&errLine,&errCol)) {
        _lastError = QString().sprintf("Encountered and error while parsing %s\n\n\t%s (Line %d Column %d)",filename.toLatin1().data(),errMsg.toLatin1().data(),errLine,errCol);
        return false;
    }

    QDomElement root = doc.documentElement();

    return load(root);
}

// Load the DB from a DomElement
bool MemDbLoader::load(const QDomElement & elemSource)
{
    _lastError = "";
    
    // Login to the SQLITE memory DB

    if(!QSqlDatabase::isDriverAvailable("QSQLITE")) {
        _lastError = "SQLITE plugin not available - data can't be loaded";
        return false;
    }
    QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");
    db.setDatabaseName(":memory:");

    if(!db.open()) {
        _lastError = "Error opening QSQLITE memory database";
        return false;
    }    

    QDomNodeList nlist = elemSource.childNodes();
    for(int i = 0; i < nlist.count(); i++ ) {
        QDomElement it = nlist.item(i).toElement();
        if(it.tagName()=="table") {
            parseTable(it.toElement());
        }
    }
    return _lastError.isEmpty();
}

void MemDbLoader::parseTable(const QDomElement & elemSource)
{
    _tableName = elemSource.attribute("name");
    _columnNames.clear();

    QDomNodeList nlist = elemSource.childNodes();
    for(int i = 0; i < nlist.count(); i++ ) {
        QDomElement it = nlist.item(i).toElement();
        if(it.tagName()=="columns") {
            parseColumns(it);
        }
        else if(it.tagName()=="record") {
            parseRecord(it);
        }
    }
}

void MemDbLoader::parseColumns(const QDomElement & elemSource)
{
    if(_tableName.isEmpty()) {
        _lastError = "Error: missing table name";
        return;
    }
    
    QString	myQuery = "CREATE TABLE " + _tableName + " (";

    QDomNodeList nlist = elemSource.childNodes();
    bool firstCol = true;
    for(int i = 0; i < nlist.count(); i++ ) {
        QDomElement it = nlist.item(i).toElement();
        if(it.tagName()=="column") {
            QString colName = it.text();
            QString colType = it.attribute("type");
            if(colType.isEmpty()) {
                colType = "TEXT";
            }
            if(!firstCol) {
                myQuery += ", ";
            }
            firstCol = false;

            myQuery += colName + " " + colType;
            _columnNames << colName;
        }
    }
    
    myQuery += ")";
    
    QSqlQuery	query;

    if(!query.exec(myQuery)) {
        _lastError = "Failed Query: " + myQuery;
        return;
    }    
}

void MemDbLoader::parseRecord(const QDomElement & elemSource)
{
    QString	myQuery = "INSERT INTO " + _tableName + " (";
    
    bool firstCol = true;
    foreach (QString val, _columnNames) {
        if(!firstCol) {
            myQuery += ", ";
        }
        firstCol = false;
        myQuery += val;
    }

    myQuery += ") VALUES (";

    QDomNodeList nlist = elemSource.childNodes();
    firstCol = true;
    for(int i = 0; i < nlist.count(); i++ ) {
        QDomElement it = nlist.item(i).toElement();
        if(it.tagName()=="val") {
            if(!firstCol) {
                myQuery += ", ";
            }
            firstCol = false;
            myQuery += "'" + it.text() + "'";
        }
    }
    
    myQuery += ")";
    
    QSqlQuery	query;

    if(!query.exec(myQuery)) {
        _lastError = "Failed Query: " + myQuery;
        return;
    }
}
