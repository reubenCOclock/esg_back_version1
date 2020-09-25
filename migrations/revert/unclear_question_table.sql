-- Revert esg-bdd:unclear_question_table from pg

BEGIN;

DROP TABLE unclear_question;

COMMIT;
