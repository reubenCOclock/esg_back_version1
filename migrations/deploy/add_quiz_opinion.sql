-- Deploy esg-bdd:add_quiz_opinion to pg

BEGIN;

CREATE TABLE quiz_opinion(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quiztour_id INT REFERENCES QuizTour(id),
    userId INT REFERENCES "user"(id)
);

COMMIT;
