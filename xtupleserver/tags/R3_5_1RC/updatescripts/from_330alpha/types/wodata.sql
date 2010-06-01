
SELECT dropIfExists('FUNCTION', 'indentedwomatl(integer, integer)');
SELECT dropIfExists('FUNCTION', 'indentedwo(integer, boolean, boolean)');
SELECT dropIfExists('FUNCTION', 'indentedwo(integer, integer, boolean, boolean)');
SELECT dropIfExists('TYPE', 'wodata');

CREATE TYPE wodata AS
   (wodata_id integer,
    wodata_id_type integer,
    wodata_number integer,
    wodata_subnumber integer,
    wodata_status character(1),
    wodata_startdate date,
    wodata_duedate date,
    wodata_adhoc boolean,
    wodata_itemsite_id integer,
    wodata_qoh numeric(18,6),
    wodata_short numeric(18,6),
    wodata_qtyper numeric(18,6),
    wodata_qtyiss numeric(18,6),
    wodata_qtyrcv numeric(18,6),
    wodata_qtyordreq numeric(18,6),
    wodata_scrap numeric(18,6),
    wodata_notes text,
    wodata_ref text,
    wodata_level integer);

