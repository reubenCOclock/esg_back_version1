-- Deploy esg-bdd:init to pg

BEGIN;

CREATE TABLE datapoints (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code varchar not null UNIQUE,
    "weight" float (2),
    ethical_code character NOT NULL
);

CREATE TABLE question(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL

);

CREATE TABLE question_data(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    question_id int REFERENCES question(id),
    datapoint_id int REFERENCES datapoints(id)
);



COMMIT;
