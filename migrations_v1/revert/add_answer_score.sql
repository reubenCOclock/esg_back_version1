-- Revert esg_v1:add_answer_score from pg

BEGIN;

ALTER TABLE answer 
DROP COLUMN score

COMMIT;
