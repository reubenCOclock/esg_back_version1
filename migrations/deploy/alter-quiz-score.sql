-- Deploy esg-bdd:alter-quiz-score to pg

BEGIN;
 
 ALTER TABLE quizscores
 ADD COLUMN ethical_criteria FLOAT(2);

 ALTER TABLE quizscores
 DROP COLUMN ethics_weight;

 ALTER TABLE quizscores 
 DROP COLUMN social_weight;

 ALTER TABLE quizscores
 DROP COLUMN governance_weight;

COMMIT;
