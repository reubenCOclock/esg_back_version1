-- Revert esg_v1:add_hashed_column from pg

BEGIN;

ALTER TABLE "user"
DROP COLUMN is_hashed;

COMMIT;
