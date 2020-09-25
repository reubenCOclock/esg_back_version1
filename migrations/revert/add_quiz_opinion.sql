-- Revert esg-bdd:add_quiz_opinion from pg

BEGIN;

DROP TABLE quiz_opinion;

COMMIT;
