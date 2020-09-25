-- Revert esg-bdd:answer-text from pg

BEGIN;

ALTER TABLE answer 
DROP COLUMN response;

COMMIT;
