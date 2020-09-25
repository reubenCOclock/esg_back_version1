-- Revert esg-bdd:init from pg

BEGIN;

DROP TABLE datapoints;
DROP TABLE question;
DROP TABLE question_data;

COMMIT;
