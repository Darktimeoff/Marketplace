-- AlterTable
CREATE SEQUENCE categoryattributefilter_order_seq;
ALTER TABLE "CategoryAttributeFilter" ALTER COLUMN "order" SET DEFAULT nextval('categoryattributefilter_order_seq');
ALTER SEQUENCE categoryattributefilter_order_seq OWNED BY "CategoryAttributeFilter"."order";
