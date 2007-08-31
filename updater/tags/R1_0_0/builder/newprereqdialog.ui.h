/****************************************************************************
** ui.h extension file, included from the uic-generated form implementation.
**
** If you wish to add, delete or rename functions or slots use
** Qt Designer which will update this file, preserving your code. Create an
** init() function in place of a constructor, and a destroy() function in
** place of a destructor.
*****************************************************************************/


void NewPrereqDialog::sAccept()
{
  if(_name->text().isEmpty())
  {
    QMessageBox::warning(this, tr("Incomplete information"), tr("You must eneter in a name for this new prerequisite."));
    return;
  }
  
  if(_type->currentText() == "None")
  {
    QMessageBox::warning(this, tr("Incomplete information"), tr("You must select a type, other than None, for this new prerequisite."));
    return;
  }
  
  accept();
}


void NewPrereqDialog::init()
{
  _type->insertStringList(Prerequisite::typeList());
}
