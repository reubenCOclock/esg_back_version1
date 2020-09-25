-- Deploy esg-bdd:unclear_question_table to pg

BEGIN;
CREATE TABLE unclear_question(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    question_id INT references question(id),
    userId INT references "user"(id),
    quiztour_id INT references QuizTour(id)
);
COMMIT;
