-- Deploy esg_v1:add_hashed_column to pg

BEGIN;

ALTER TABLE "user"
ADD COLUMN is_hashed BOOLEAN default 'false';

COMMIT;
