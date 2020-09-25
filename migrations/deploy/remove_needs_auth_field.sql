-- Deploy esg-bdd:remove_needs_auth_field to pg

BEGIN;

ALTER TABLE "user"
DROP COLUMN needs_auth;

COMMIT;
