SELECT dropIfExists('function','locksohead(integer)');
SELECT dropIfExists('function','releasesohead(integer)');
SELECT dropIfExists('function','lockhead(text, integer)');
SELECT dropIfExists('function','releaseheadlock(text, integer)');
SELECT dropIfExists('FUNCTION','calcAsOfQoh(integer, integer, date)');
SELECT dropIfExists('FUNCTION','calcAsOfQoh(integer, date)');
SELECT dropIfExists('FUNCTION','recalculateinvhist(integer) ');
