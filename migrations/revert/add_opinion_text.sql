-- Revert esg-bdd:add_opinion_text from pg

BEGIN;

ALTER TABLE quiz_opinion
DROP COLUMN opinion_text;

COMMIT;
