-- Deploy esg-bdd:add_user_salt to pg

BEGIN;

ALTER TABLE "user"
ADD COLUMN salt TEXT NOT NULL;

COMMIT;
