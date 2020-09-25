-- Deploy esg-bdd:answer-text to pg

BEGIN;

ALTER TABLE answer 
ADD COLUMN response varchar;

COMMIT;
