-- Revert esg_v1:alter_userid from pg

BEGIN;

BEGIN;

ALTER TABLE quiztour 
ADD COLUMN user_id int REFERENCES "user"(id);

ALTER TABLE quiztour
DROP COLUMN userId;

COMMIT;


COMMIT;
