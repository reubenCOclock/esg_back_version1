-- Revert esg-bdd:quizscores from pg

BEGIN;

DROP TABLE quizscores;

COMMIT;
