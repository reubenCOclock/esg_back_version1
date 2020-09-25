-- Revert esg-bdd:answerId from pg

BEGIN;

ALTER TABLE answer
DROP COLUMN id;

COMMIT;
