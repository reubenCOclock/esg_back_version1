-- Deploy esg-bdd:drop_role_text_user to pg

BEGIN;

ALTER TABLE "user"
DROP COLUMN "role";

COMMIT;
