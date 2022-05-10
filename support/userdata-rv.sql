/*
 * Create Grocery Assistant Database
 *
 * Postgres CLI: \ir support/userdata.sql
 */

TRUNCATE TABLE grocery_list;
INSERT INTO grocery_list (id, UserId, Name, Filtered, SourceListId, StoreId, CategoryId) VALUES
  ( 1, 1, 'Tom''s Grocery List', FALSE, NULL, NULL, NULL),
  ( 2, 1, 'Jerry''s Grocery List', FALSE, NULL, NULL, NULL),
  ( 3, 1, 'My Aldi List', TRUE, 2, 1, 0);

SELECT setval('grocery_list_id_seq', (SELECT MAX(id) FROM grocery_list));

TRUNCATE TABLE ListItem;
INSERT INTO ListItem (ListItemId, ListId, ProductId, CategoryId, BrandId, UrgencyId, UnitId, UnitCount, ItemCount, Purchased, Hidden) VALUES
  ( 1, 1, 2, 2, 0, 1, NULL, 1.0, 1.0, FALSE, FALSE),
  ( 2, 1, 5, 3, 2, 3, NULL, 1.0, 1.0, FALSE, FALSE),
  ( 3, 1, 6, 3, 2, 3, NULL, 1.0, 1.0, FALSE, FALSE),
  ( 4, 1, 7, 6, 3, 2, NULL, 1.0, 1.0, FALSE, FALSE),
  ( 5, 2, 3, 2, 3, 2, NULL, 1.0, 1.0, FALSE, FALSE),
  ( 6, 2, 8, 6, 4, 1, NULL, 1.0, 1.0, FALSE, FALSE),
  ( 7, 2, 5, 3, 4, 1, NULL, 1.0, 1.0, FALSE, FALSE);
  
SELECT setval('listitem_listitemid_seq', (SELECT MAX(ListItemId) FROM ListItem));

TRUNCATE TABLE Store;
INSERT INTO Store (StoreId, UserId, OrdinalId, Name, Website, Phone) VALUES
  (0, 0, NULL, 'None', '', ''),
  (1, 0, NULL, 'Aldi', 'https://www.aldi.us', '715-235-1111'),
  (2, 0, NULL, 'Walmart', 'https://www.walmart.com/', '715-235-2222'),
  (3, 0, NULL, 'MarketPlace', 'https://www.marketplacefoodswi.com/MFstore2582', '715-235-3333'),
  (4, 0, NULL, 'Target', 'https://www.target.com', '715-235-4444'),
  (5, 0, NULL, 'Kwik Trip', 'https://www.kwiktrip.com', '715-235-5555');

SELECT setval('store_storeid_seq', (SELECT MAX(StoreId) FROM Store));

TRUNCATE TABLE ProductStore;
INSERT INTO ProductStore (ProductId, StoreId, UserId) VALUES
  (5, 1, 1),
  (8, 1, 1),
  (3, 2, 1),
  (4, 3, 1);