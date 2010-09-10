DELETE FROM xtpos.pkgcmdarg
WHERE cmdarg_cmd_id IN (
  SELECT cmd_id
  FROM xtpos.pkgcmd
  WHERE (cmd_title IN ('Retail Site','Retail Sites')));

DELETE FROM xtpos.pkgcmd
WHERE (cmd_title IN ('Retail Site','Retail Sites'));