-- Revert esg_v1:init from pg

BEGIN;

DROP TABLE quiztour;
DROP TABLE "user";
DROP TABLE answer;
DROP TABLE pillar;
DROP TABLE datapoint;
DROP TABLE category;
DROP TABLE question;
DROP TABLE quiz_score;
DROP TABLE combined_quiz_score;


COMMIT;
