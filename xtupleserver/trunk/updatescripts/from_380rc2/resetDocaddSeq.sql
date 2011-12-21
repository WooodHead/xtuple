SELECT SETVAL('docass_docass_id_seq',
              GREATEST(NEXTVAL('docass_docass_id_seq'),
                       NEXTVAL('imageass_imageass_id_seq'));
