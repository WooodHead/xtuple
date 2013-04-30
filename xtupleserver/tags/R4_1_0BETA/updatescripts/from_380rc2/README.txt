Per Issue #: 16592

The two files "alterFile.sql" and "dropCreateFile.sql" should only be executed on the upgrade script from 3.8.0rc2 to 3.8.0.

The script "migrateUrl.sql" in from_380beta2 folder has been updated to include the extra "file_descrip" field in "alterFile.sql."