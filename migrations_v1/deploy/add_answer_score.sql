-- Deploy esg_v1:add_answer_score to pg

BEGIN;

ALTER TABLE answer 
ADD COLUMN score float(2) NOT NULL;

COMMIT;
