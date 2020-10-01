-- Revert esg_v1:number_to_float from pg

BEGIN;

ALTER TABLE category 
ATLER COLUMN 'weight' TYPE numeric(2,2)

COMMIT;
