-- Revert esg-bdd:remove_needs_auth_field from pg

BEGIN;

ALTER TABLE "user"
ADD COLUMN needs_auth BOOLEAN DEFAULT 'false';

COMMIT;
