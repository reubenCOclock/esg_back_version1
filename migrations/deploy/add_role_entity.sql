-- Deploy esg-bdd:add_role_entity to pg

BEGIN;

CREATE TABLE "role"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL
);

ALTER TABLE "user"
ADD COLUMN role_id int REFERENCES "role"(id);

COMMIT;
