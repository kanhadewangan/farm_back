-- AlterTable
CREATE SEQUENCE farmer_id_seq;
ALTER TABLE "farmer" ALTER COLUMN "id" SET DEFAULT nextval('farmer_id_seq');
ALTER SEQUENCE farmer_id_seq OWNED BY "farmer"."id";
