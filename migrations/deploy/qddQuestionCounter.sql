-- Deploy esg-bdd:qddQuestionCounter to pg

BEGIN;

ALTER TABLE question 
ADD COLUMN question_order INT;

COMMIT;
