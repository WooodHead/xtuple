CREATE TABLE invhistexpcat (invhistexpcat_id         SERIAL PRIMARY KEY,
                            invhistexpcat_invhist_id INTEGER NOT NULL REFERENCES invhist
                                                     ON DELETE CASCADE ON UPDATE CASCADE,
                            invhistexpcat_expcat_id  INTEGER NOT NULL REFERENCES expcat
                                                     ON DELETE CASCADE ON UPDATE CASCADE,

                            CONSTRAINT invhistexpcat_invhist_id_expcat_id
                                UNIQUE (invhistexpcat_invhist_id, invhistexpcat_expcat_id)
                           );

REVOKE ALL ON invhistexpcat FROM public;
GRANT  ALL ON invhistexpcat TO   xtrole;

REVOKE ALL ON invhistexpcat_invhistexpcat_id_seq FROM public;
GRANT  ALL ON invhistexpcat_invhistexpcat_id_seq TO   public;

COMMENT ON TABLE invhistexpcat IS 'Track the relationship between an EX transaction in the invhist table and the corresponding Expense Category.';
