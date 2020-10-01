-- Deploy esg_v1:number_to_float to pg

BEGIN;

ALTER TABLE category
ALTER COLUMN "weight" TYPE float(2);

COMMIT;
