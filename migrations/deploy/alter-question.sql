-- Deploy esg-bdd:alter-question to pg

BEGIN;

ALTER TABLE question 
ADD COLUMN isUnclear boolean NOT NULL DEFAULT false;

COMMIT;
