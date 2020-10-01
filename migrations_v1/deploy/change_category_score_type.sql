-- Deploy esg_v1:change_category_score_type to pg

BEGIN;

ALTER TABLE quiz_score
ADD COLUMN score float(2);

ALTER TABLE combined_quiz_score
ADD COLUMN score float(2);

COMMIT;
