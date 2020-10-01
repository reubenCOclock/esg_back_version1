-- Deploy esg_v1:question_polarity to pg

BEGIN;

ALTER TABLE question 
ADD COLUMN polarity VARCHAR default 'positive';

COMMIT;
