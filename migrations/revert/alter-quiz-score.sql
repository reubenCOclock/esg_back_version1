-- Revert esg-bdd:alter-quiz-score from pg

BEGIN;

ALTER TABLE quizscores 
 DROP COLUMN ethical_criteria 

 ALTER TABLE quizscores
 ADD COLUMN ethics_weight float(2);

 ALTER TABLE quizscores 
 ADD COLUMN social_weight float(2);

 ALTER TABLE quizscores
 ADD COLUMN governance_weight float(2);

COMMIT;
