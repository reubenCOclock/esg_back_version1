-- Deploy esg-bdd:add_user_token to pg

BEGIN;

ALTER TABLE "user"
ADD COLUMN token TEXT NOT NULL;

COMMIT;
