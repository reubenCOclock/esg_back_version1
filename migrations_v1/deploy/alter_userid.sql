-- Deploy esg_v1:alter_userid to pg

BEGIN;

ALTER TABLE quiztour 
DROP COLUMN user_id;

ALTER TABLE quiztour
ADD COLUMN userId int REFERENCES "user"(id);

COMMIT;
