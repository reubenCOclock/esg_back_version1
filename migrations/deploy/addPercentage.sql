-- Deploy esg-bdd:addPercentage to pg

BEGIN;

ALTER TABLE quizscores 
ADD COLUMN score float(2);

ALTER TABLE quizscores 
ALTER COLUMN ethical_criteria TYPE VARCHAR;

COMMIT;
