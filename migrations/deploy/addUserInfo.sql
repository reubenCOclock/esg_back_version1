-- Deploy esg-bdd:addUserInfo to pg

BEGIN;

ALTER TABLE "user"
ADD COLUMN "role" VARCHAR;
ALTER TABLE "user"
ADD COLUMN "password" TEXT;
ALTER TABLE "user"
ADD COLUMN needs_auth BOOLEAN DEFAULT 'false';

ALTER TABLE "user"
ADD COLUMN is_hashed BOOLEAN DEFAULT 'false'

COMMIT;
