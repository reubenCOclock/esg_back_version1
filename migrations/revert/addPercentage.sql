-- Revert esg-bdd:addPercentage from pg

BEGIN;

ALTER TABLE quizscores 
DROP COLUMN score 

ALTER TABLE quizscores 
ALTER COLUMN ethical_criteria TYPE float(2);

COMMIT;
