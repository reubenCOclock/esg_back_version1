-- Revert esg-bdd:user from pg

BEGIN;

DROP TABLE "user"
DROP TABLE QuizTour
DROP TABLE answer 

COMMIT;
