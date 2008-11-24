function main()
{

    source(findFile("scripts","functions.js"));
    source(findFile("scripts","Chapter1.js"));
    source(findFile("scripts","Chapter2.js"));
    source(findFile("scripts","Chapter3.js"));
    source(findFile("scripts","Chapter4.js"));
    source(findFile("scripts","Chapter5.js"));
    source(findFile("scripts","Chapter6.js"));
    source(findFile("scripts","Chapter7.js"));
    source(findFile("scripts","Chapter8.js"));
    
//    loginAppl("3.2.0", "2empty320beta","admin");
//    executeChapter1();
//    exitAppl(); //exit once to save the testdata
//    startApplication("xtuple");
    loginAppl("3.2.0", "2empty320beta","user01"); //login with the new user created
//    executeChapter2();
//    executeChapter3();
//    executeChapter4();
//    executeChapter5();
//    executeChapter6();
//    executeChapter7();
    executeChapter8();
 
    exitAppl();	
}
