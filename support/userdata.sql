/*
 * Create Grocery Assistant Database
 *
 * Postgres CLI: \ir support/userdata.sql
 */

TRUNCATE TABLE grocery_list;
INSERT INTO grocery_list (id, Name) VALUES
  ( 1, 'Tom''s Grocery List'),
  ( 2, 'Jerry''s Grocery List');

SELECT setval('grocery_list_id_seq', (SELECT MAX(id) FROM grocery_list));

TRUNCATE TABLE ListItem;
INSERT INTO ListItem (ListItemId, ListId, ProductId, CategoryId, BrandId, SizeId, UrgencyId, UrgencyAlert, ItemCount, SaverAlertId, Purchased, Hide) VALUES
  ( 1, 1, 2, 2, 0, 0, NULL, NULL, 1.0, NULL, FALSE, FALSE),
  ( 2, 2, 5, 3, 0, 0, NULL, NULL, 1.0, NULL, FALSE, FALSE);
  
SELECT setval('listitem_listitemid_seq', (SELECT MAX(ListItemId) FROM ListItem));

INSERT INTO Store (StoreId, UserId, OrdinalId, Name, Website, Phone) VALUES
  (1, 0, NULL, 'Aldi', 'https://www.aldi.us', '715-235-1111'),
  (2, 0, NULL, 'Walmart', 'https://www.walmart.com/', '715-235-2222'),
  (3, 0, NULL, 'MarketPlace', 'https://www.marketplacefoodswi.com/MFstore2582', '715-235-3333'),
  (4, 0, NULL, 'Target', 'https://www.target.com', '715-235-4444'),
  (5, 0, NULL, 'Kwik Trip', 'https://www.kwiktrip.com', '715-235-5555');

SELECT setval('store_storeid_seq', (SELECT MAX(StoreId) FROM Store));

TRUNCATE TABLE ProductStore;
INSERT INTO ProductStore (ProductId, StoreId, UserId) VALUES
  (2, 1, 1),
  (3, 2, 1),
  (4, 3, 1),
  (4, 3, 2);