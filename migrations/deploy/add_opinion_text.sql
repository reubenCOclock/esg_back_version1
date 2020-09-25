-- Deploy esg-bdd:add_opinion_text to pg

BEGIN;

ALTER TABLE quiz_opinion
ADD COLUMN opinion_text TEXT;

COMMIT;
