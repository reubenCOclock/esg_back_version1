-- Deploy esg_v1:init to pg

BEGIN;

CREATE TABLE pillar(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pillar_name VARCHAR NOT NULL 
);

CREATE TABLE category(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "weight" NUMERIC(2,2),
    pillar_id INT references pillar(id)
);

CREATE TABLE datapoint(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code VARCHAR NOT NULL,
    pillar_id INT references pillar(id),
    category_id INT references category(id)
);

CREATE TABLE question(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    question_order int DEFAULT NULL,
    datapoint_id INT references datapoint(id)
);

CREATE TABLE "role"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title varchar NOT NULL
);

CREATE TABLE "user"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email varchar NOT NULL UNIQUE,
    "password" text NOT NULL,
    token text NOT NULL,
    salt text NOT NULL,
    role_id int references "role"(id)
);



CREATE TABLE quiztour(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    is_started BOOLEAN default 'false',
    user_id int REFERENCES "user"(id)
);

CREATE TABLE answer(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content VARCHAR NOT NULL,
    question_id int REFERENCES question(id),
    quiztour_id int REFERENCES quiztour(id)
);

CREATE TABLE quiz_score(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    criteria varchar NOT NULL,
    categories_score varchar [],
    quiztour_id int references quiztour(id)
);

CREATE TABLE combined_quiz_score(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quiztour_id int references quiztour(id)
);

COMMIT;
