BEGIN;

DROP VIEW _custchar;
DROP VIEW _custcomment;
DROP VIEW _custcreditcard;
DROP VIEW _customer;
DROP VIEW _custshipto;
DROP VIEW _custtax;
DROP VIEW _quote;
DROP VIEW _quotecomment;
DROP VIEW _quoteline;
DROP VIEW _quotelinechar;
DROP VIEW _quotelinecomment;
DROP VIEW _salesline;
DROP VIEW _saleslinechar;
DROP VIEW _saleslinecomment;
DROP VIEW _salesorder;
DROP VIEW _salesordercomment;

CREATE SCHEMA api;

COMMIT;