-- Deploy esg-bdd:quizscores to pg

BEGIN;

CREATE TABLE quizscores(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ethics_weight float(2),
    social_weight float(2),
    governance_weight float(2),
    quiztour_id INT REFERENCES QuizTour(id),
    userId INT REFERENCES "user"(id)
);

COMMIT;
