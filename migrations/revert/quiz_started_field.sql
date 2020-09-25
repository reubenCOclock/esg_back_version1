-- Revert esg-bdd:quiz_started_field from pg

BEGIN;

ALTER TABLE QuizTour
DROP COLUMN is_started;

COMMIT;
