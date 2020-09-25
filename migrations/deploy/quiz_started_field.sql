-- Deploy esg-bdd:quiz_started_field to pg

BEGIN;

ALTER TABLE QuizTour 
ADD COLUMN is_started BOOLEAN default false;

COMMIT;
