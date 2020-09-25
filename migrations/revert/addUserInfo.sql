-- Revert esg-bdd:addUserInfo from pg

BEGIN;

ALTER TABLE "user"
DROP COLUMN "password";

ALTER TABLE "user"
DROP COLUMN "role";

ALTER TABLE "user"
DROP COLUMN needs_auth;





COMMIT;
