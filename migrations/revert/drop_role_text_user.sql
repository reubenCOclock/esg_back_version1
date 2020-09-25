-- Revert esg-bdd:drop_role_text_user from pg

BEGIN;

ALTER TABLE "user"
DROP COLUMN "role";

COMMIT;
