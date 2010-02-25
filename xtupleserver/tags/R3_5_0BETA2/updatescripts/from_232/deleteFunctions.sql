BEGIN;

DROP FUNCTION fetchCMNumber();
DROP FUNCTION fetchPONumber();
DROP FUNCTION fetchSONumber();
DROP FUNCTION fetchTONumber();
DROP FUNCTION fetchNextNumber(text);
DROP FUNCTION deleteSo(INTEGER, INTEGER);
DROP FUNCTION fetchARMemoNumber();
DROP FUNCTION fetchShipmentNumber();
SELECT dropIfExists('TRIGGER', 'gltransTrigger');
DROP FUNCTION _gltransTrigger();

COMMIT;
