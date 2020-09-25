-- Revert esg-bdd:alter-question from pg

BEGIN;

ALTER TABLE question 
DROP COLUMN isUnclear;

COMMIT;
