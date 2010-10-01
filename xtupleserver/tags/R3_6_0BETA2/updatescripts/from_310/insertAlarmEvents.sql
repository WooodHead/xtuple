BEGIN;

INSERT INTO 
     evnttype	
          (evnttype_name,
           evnttype_descrip,
           evnttype_module)
VALUES 	
          ('TodoAlarm',
           'To-Do Item Alarm',
            'CRM');

INSERT INTO 
     evnttype	
          (evnttype_name,
           evnttype_descrip,
           evnttype_module)
VALUES 	
          ('IncidentAlarm',
           'Incident Alarm',
            'CRM');

INSERT INTO 
     evnttype	
          (evnttype_name,
           evnttype_descrip,
           evnttype_module)
VALUES 	
          ('TaskAlarm',
           'Project Task Alarm',
            'CRM');
COMMIT;