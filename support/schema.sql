/*
 * Create Grocery Assistant Database
 *
 * Postgres CLI: \ir support/schema.sql
 */
DROP DATABASE grocery_assistant;
CREATE DATABASE grocery_assistant;

/*
 * Postgres CLI command to connect to specific database
 * (only valid for local database)
 */
\c grocery_assistant

DROP TABLE grocery_list;
CREATE TABLE grocery_list (
  id SERIAL PRIMARY KEY,
  UserId INT NOT NULL,
  Name TEXT NOT NULL,
  Filtered BOOLEAN DEFAULT FALSE,
  ColorId INT,
  SourceListId INT,
  StoreId INT,
  CategoryId INT
);

DROP TABLE ListItem;
CREATE TABLE ListItem (
  ListItemId SERIAL PRIMARY KEY,
  ListId INT NOT NULL,
  ProductId INT NOT NULL,
  CategoryId INT NOT NULL,
  BrandId INT NOT NULL,
  UnitId INT,
  UrgencyId Int,
  UnitCount SMALLINT DEFAULT 0,
  ItemCount SMALLINT DEFAULT 1,
  Purchased BOOLEAN DEFAULT FALSE,
  Hidden BOOLEAN DEFAULT FALSE
);

DROP TABLE Urgency;
CREATE TABLE Urgency (
  UrgencyId SERIAL PRIMARY KEY,
  Name TEXT NOT NULL
);

DROP TABLE Product;
CREATE TABLE Product (
  ProductId SERIAL PRIMARY KEY,
  UserId INT NOT NULL,
  Name TEXT NOT NULL
);

DROP TABLE Ordinal;
CREATE TABLE Ordinal (
  OrdinalId SERIAL PRIMARY KEY,
  CategoryId INT NOT NULL,
  SeqNumber SMALLINT NOT NULL
);

DROP TABLE Category;
CREATE TABLE Category (
  CategoryId SERIAL PRIMARY KEY,
  UserId INT NOT NULL,
  Name TEXT NOT NULL
);

DROP TABLE Brand;
CREATE TABLE Brand (
  BrandId SERIAL PRIMARY KEY,
  UserId INT NOT NULL,
  Name TEXT NOT NULL
);

DROP TABLE Store;
CREATE TABLE Store (
  StoreId SERIAL PRIMARY KEY,
  UserId INT NOT NULL,
  OrdinalId INT,
  Name TEXT NOT NULL,
  Website TEXT,
  Phone TEXT
);

DROP TABLE ProductCategory;
CREATE TABLE ProductCategory (
  ProductId INT NOT NULL,
  CategoryId INT NOT NULL,
  UserId INT NOT NULL
);

DROP TABLE ProductBrand;
CREATE TABLE ProductBrand (
  ProductId INT NOT NULL,
  BrandId INT NOT NULL,
  UserId INT NOT NULL
);

DROP TABLE ProductStore;
CREATE TABLE ProductStore (
  ProductId INT NOT NULL,
  StoreId INT NOT NULL,
  UserId INT NOT NULL
);

DROP TABLE FilterLock;
CREATE TABLE FilterLock (
  FilteredListId INT NOT NULL,
  FilterSourceId INT NOT NULL,
  UserId INT NOT NULL
);

DROP TABLE History;
CREATE TABLE History (
  HistoryId INT NOT NULL,
  ProductId INT NOT NULL,
  StoreId INT NOT NULL,
  UserId INT NOT NULL,
  PurchaseData DATE NOT NULL,
  Price DECIMAL(7,2) NOT NULL,
  Agregate BOOLEAN DEFAULT TRUE
);

DROP TABLE Unit;
CREATE TABLE Unit (
  UnitId SERIAL PRIMARY KEY,
  UserId INT NOT NULL,
  Name TEXT NOT NULL
);

DROP TABLE Color;
CREATE TABLE Color (
  ColorId SERIAL PRIMARY KEY,
  UserId INT NOT NULL,
  ColorName TEXT NOT NULL,
  RGBValue Text
);

INSERT INTO Urgency (UrgencyId, Name) VALUES
  (1, 'Very'),
  (2, 'Somewhat'),
  (3, 'Not');

SELECT setval('urgency_urgencyid_seq', (SELECT MAX(UrgencyId) FROM Urgency));

INSERT INTO Category (CategoryId, UserId, Name) VALUES
  (0, 0, 'None');

SELECT setval('category_categoryid_seq', 1);

INSERT INTO Brand (BrandId, UserId, Name) VALUES
  (0, 0, 'None');

SELECT setval('brand_brandid_seq', 1);

INSERT INTO Unit (UnitId, UserId, Name) VALUES
  (2, 0, 'pt'),
  (3, 0, 'qt'),
  (4, 0, 'gal'),
  (5, 0, 'ml'),
  (6, 0, 'l'),
  (7, 0, 'c'),
  (8, 0, 'lb'),
  (9, 0, 'oz'),
  (10, 0, 'mg'),
  (11, 0, 'g'),
  (12, 0, 'in'),
  (13, 0, 'ft'),
  (14, 0, 'yd'),
  (15, 0, 'cm'),
  (16, 0, 'm'),
  (17, 0, 'sm'),
  (18, 0, 'med'),
  (19, 0, 'lg');

SELECT setval('unit_unitid_seq', (SELECT MAX(UnitId) FROM Unit));

INSERT INTO Color (ColorId, UserId, ColorName, RGBValue) VALUES
  (0, 0, 'default', ''),
  (1, 0, 'black', '#000000'),
  (2, 0, 'white', '#FFFFFF'),
  (3, 0, 'red',   '#FF0000'),
  (4, 0, 'lime',   '#00FF00'),
  (5, 0, 'dark orange',	'#FF8C00'),
  (6, 0, 'orange',	'#FFA500'),
  (7, 0, 'yellow',  '#FFFF00'),
  (8, 0, 'cyan', 	  '#00FFFF'),
  (9, 0, 'magenta', '#FF00FF'),
  (10, 0, 'silver', 	'#C0C0C0'),
  (11, 0, 'gray', 	  '#808080'),
  (12, 0, 'maroon', 	'#800000'),
  (13, 0, 'olive', 	'#808000'),
  (14, 0, 'medium green', '#006400'),
  (15, 0, 'office green','#008000'),
  (16, 0, 'purple', 	'#800080'),
  (17, 0, 'teal', 	  '#008080'),
  (18, 0, 'blue', 	  '#0000FF'),
  (19, 0, 'navy', 	  '#000080'),
  (20, 0, 'medium blue', '#0000CD'),
  (21, 0, 'royal blue',  '#4169E1'),
  (22, 0, 'saddle brown', '#8B4513'),
  (23, 0, 'sienna', 	   '#A0522D'),
  (24, 0, 'chocolate', 	 '#D2691E'),
  (25, 0, 'peru', 	     '#CD853F'),
  (26, 0, 'sandy brown', '#F4A460'),
  (27, 0, 'burly wood',  '#DEB887'),
  (28, 0, 'tan', 	       '#D2B48C'),
  (29, 0, 'rosy brown',  '#BC8F8F'),
  (30, 0, 'pecan',  '#4A2511'),
  (31, 0, 'caramel',  '#65350F'),
  (32, 0, 'tawny',  '#80471C'),
  (33, 0, 'brunette',  '#3B1E08'),
  (34, 0, 'cinnamon',  '#652A0E'),
  (35, 0, 'peanut',  '#795C34');

INSERT INTO Store (StoreId, UserId, OrdinalId, Name, Website, Phone) VALUES
  (0, 0, NULL, 'None', '', '');

SELECT setval('store_storeid_seq', 1);

TRUNCATE TABLE grocery_list;
INSERT INTO grocery_list (id, UserId, Name, Filtered, ColorId, SourceListId, StoreId, CategoryId) VALUES
  ( 0, 0, 'None', FALSE, 0, 0, 0, 0);

SELECT setval('grocery_list_id_seq', 1);
