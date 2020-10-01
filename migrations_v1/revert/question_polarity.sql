-- Revert esg_v1:question_polarity from pg

BEGIN;

ALTER TABLE question 
DROP COLUMN polarity;

COMMIT;
