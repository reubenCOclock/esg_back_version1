-- Revert esg-bdd:add_role_entity from pg

BEGIN;

DROP TABLE "role";

ALTER TABLE "user"
DROP COLUMN role_id;

COMMIT;
