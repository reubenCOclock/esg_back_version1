-- Revert esg-bdd:qddQuestionCounter from pg

BEGIN;

ALTER TABLE question 
DROP COLUMN question_order;

COMMIT;
