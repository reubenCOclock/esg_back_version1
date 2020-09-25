-- Deploy esg-bdd:user to pg

BEGIN;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email varchar not null UNIQUE
);

CREATE TABLE QuizTour(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    userId int REFERENCES "user"(id)
    
);

CREATE TABLE answer (
    score float(2) NOT null,
    question_id int REFERENCES question(id),
    quiztour_id int REFERENCES QuizTour(id)
);

COMMIT;
