#include <qapplication.h>

#include "packagewindow.h"

int main(int argc, char *argv[])
{
  QApplication app(argc, argv);

  PackageWindow * mainwin = new PackageWindow();
  mainwin->show();

  app.setMainWidget(mainwin);
  return app.exec();
}

