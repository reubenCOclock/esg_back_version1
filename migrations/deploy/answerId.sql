-- Deploy esg-bdd:answerId to pg

BEGIN;

 ALTER TABLE answer 
 ADD COLUMN id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY;
 
COMMIT;
