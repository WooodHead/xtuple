//********** This Test Suite is developed to execute the xTuple Training Guide ****************
//---All the scripts pertaining to Chapters of the Training Guide are placed under 'shared/scripts' folder
//---Functions/common libraries created are placed in 'shared/scripts/functions.js' script

//-------***-----This is the Main Driver Script which will control the execution flow of scripts-----***-------


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
    source(findFile("scripts","Chapter9.js"));
    source(findFile("scripts","Chapter10.js"));
    source(findFile("scripts","Chapter11.js"));
    
    loginAppl("3.2.0beta", "6empty320beta","admin"); 
    executeChapter1();
    exitAppl(); //exit and login with new user created
    startApplication("xtuple");
    loginAppl("3.2.0beta", "6empty320beta","user01"); //login with the new user created
    executeChapter2();
    executeChapter3();
    executeChapter4();
    executeChapter5();
    executeChapter6();
    executeChapter7();
    executeChapter8();
    executeChapter9();
    executeChapter10();
    executeChapter11();
    exitAppl();	
}
