DROP VIEW api.quote;
DROP VIEW api.quotecomment;
DROP VIEW api.quoteline;
DROP VIEW api.quotelinecomment;
DROP VIEW api.quotelinechar;

ALTER TABLE quhead ALTER COLUMN quhead_number TYPE TEXT;