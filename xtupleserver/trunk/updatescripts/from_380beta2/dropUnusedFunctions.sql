SELECT dropIfExists('FUNCTION', 'postPurchaseOrder(INTEGER)', 'public');
SELECT dropIfExists('TRIGGER',  'ipsitembeforetrigger');
SELECT dropIfExists('FUNCTION', '_ipsitembeforetrigger()');
