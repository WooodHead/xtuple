#include <QSettings>
#include <QLocale>
#include <QApplication>

#include "languageoptions.h"


LanguageOptions::LanguageOptions(QObject *parent)
    : QObject(parent)
{
    _defaultLanguage = "default";
    addLanguage(_defaultLanguage, _defaultLanguage);

    QSettings settings;
    settings.setPath("OpenMFG.com", "OpenRPT", QSettings::UserScope);
    _selectedLanguage = settings.readEntry("/OpenRPT/_selectedLanguage", _defaultLanguage);

    addLanguage("en", "English");
}



LanguageOptions::~LanguageOptions()
{
}


void LanguageOptions::addLanguage(QString languageID, QString languageTitle)
{
    if(_languages.contains(languageID)) 
    {
        return;
    }

    QStringList content;
    content << languageTitle;
    _languages.insert(languageID,content);
}



void LanguageOptions::addTranslation(QString languageID, QString translationFile)
{
    if(_languages.contains(languageID)) 
    {
        _languages[languageID] << translationFile;
    }    
}


void LanguageOptions::select(QString languageID)
{
    _selectedLanguage = languageID;

    QSettings settings;
    settings.setPath("OpenMFG.com", "OpenRPT", QSettings::UserScope);
    settings.writeEntry("/OpenRPT/_selectedLanguage", _selectedLanguage);
}



void LanguageOptions::installLanguage(QString languageID)
{
    QStringList content = _languages[languageID];

    for (int i=1; i<content.size(); i++) 
    {
        QTranslator *ptranslator = new QTranslator;
        ptranslator->load(content[i]);
        qApp->installTranslator(ptranslator);
    }

    // translation for Default title (can't do it before because the translations are not loaded)
    _languages[_defaultLanguage][0] = tr("Default");
}



void LanguageOptions::installSelected(void)

{
    installLanguage(_selectedLanguage);
}



void LanguageOptions::addTranslationToDefault(QString file)

{
    addTranslation(_defaultLanguage, file);
}



QStringList LanguageOptions::languageTitlesList(void)
{
    QStringList res;

    foreach (QStringList value, _languages) 
    {
        res << value[0];
    }

    return res;
}


QString LanguageOptions::selectedTitle()
{
    return _languages.value(_selectedLanguage)[0];

}


void LanguageOptions::selectFromTitle(QString title)
{
    QString id = _defaultLanguage;

    QMapIterator<QString,QStringList> i(_languages);

     while (i.hasNext()) 
    {
         i.next();
        QString currentTitle = i.value()[0];
        if(currentTitle==title) {
            id = i.key();
            break;
        }
    }

    select(id);
}

