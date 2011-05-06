ALTER TABLE public.ipsitem RENAME TO ipsiteminfo;

ALTER TABLE public.ipsiteminfo
ADD COLUMN ipsitem_discntprcnt NUMERIC(10, 6) NOT NULL DEFAULT 0.00,
ADD COLUMN ipsitem_fixedamtdiscount NUMERIC(16, 4) NOT NULL DEFAULT 0.00;