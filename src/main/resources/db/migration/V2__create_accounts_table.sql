CREATE TABLE accounts (
  productcode serial PRIMARY KEY,
  productname VARCHAR ( 50 ) UNIQUE NOT NULL,
  unitcost DOUBLE PRECISION NOT NULL,
  prodrprice DOUBLE PRECISION  NOT NULL,
  taxratecode VARCHAR ( 1 )  NOT NULL,
  created_on TIMESTAMP
);