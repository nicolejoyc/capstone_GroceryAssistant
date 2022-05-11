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

DROP TABLE Size;
CREATE TABLE Size (
  SizeId SERIAL PRIMARY KEY,
  UserId INT NOT NULL,
  UnitID INT NOT NULL,
  Quantity DECIMAL (4,2) DEFAULT 1.0
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

DROP TABLE ProductSize;
CREATE TABLE ProductSize (
  ProductId INT NOT NULL,
  SizeId INT NOT NULL,
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

INSERT INTO Product (ProductId, UserId, Name) VALUES
  (2, 0, 'Apple'),
  (3, 0, 'Orange'),
  (4, 0, 'Banana'),
  (5, 0, 'Milk'),
  (6, 0, 'Cheese'),
  (7, 0, 'Peas'),
  (8, 0, 'Corn');
  /*
  (2, 0, 'Beans Green French'),
  (3, 0, 'Beans Green Cut'),
  (4, 0, 'Beans Black'),
  (5, 0, 'Beans Red'),
  (6, 0, 'Beans Chile'),
  (7, 0, 'Beans Kidney'),
  (8, 0, 'Peas'),
  (9, 0, 'Corn'),
  (10, 0, 'Broccoli Whole'),
  (11, 0, 'Broccoli Cuts'),
  (12, 0, 'Broccoli Florets'),
  (13, 0, 'Brussel Sprouts'),
  (14, 0, 'Zucchini'),
  (15, 0, 'Apples Macintosh'),
  (16, 0, 'Apples Granny Smith'),
  (17, 0, 'Bannana'),
  (18, 0, 'Oranges'),
  (19, 0, 'Potato Red'),
  (20, 0, 'Potato Yukon'),
  (21, 0, 'Romaine Lettuce'),
  (22, 0, 'Carrots'),
  (23, 0, 'Carrots Sticks'),
  (24, 0, 'Carrots Strings'),
  (25, 0, 'Spinach'),
  (26, 0, 'Pizza'),
  (27, 0, 'Ice Cream'),
  (28, 0, 'Lasagna'),
  (29, 0, 'Potato Fries'),
  (30, 0, 'Potatoe Tots'),
  (31, 0, 'Potatoe Sliced'),
  (32, 0, 'Potato Salad'),
  (33, 0, 'Coleslaw'),
  (34, 0, 'Walnut Pieces'),
  (35, 0, 'Peacan Pieces'),
  (36, 0, 'Peanuts'),
  (37, 0, 'Sunflower Seeds'),
  (38, 0, 'Coffee Regular'),
  (39, 0, 'Coffee Decaf'),
  (40, 0, 'Italian Dressing'),
  (41, 0, 'Ranch Dressing'),
  (42, 0, 'Bread Wheat Sandwich'),
  (43, 0, 'Bread Wheat Breakfast'),
  (44, 0, 'Bread Cinnamin Raison'),
  (45, 0, 'Bread French Toast'),
  (46, 0, 'Chicken Breast'),
  (47, 0, 'Turkey Breast'),
  (48, 0, 'Pork Loin'),
  (49, 0, 'Steak New York'),
  (50, 0, 'Beef Sirloin Tip'),
  (51, 0, 'Ham'),
  (52, 0, 'Lunchmeat Turkey'),
  (53, 0, 'Lunchmeat Beef'),
  (54, 0, 'Lunchmeat Chicken'),
  (55, 0, 'Chips Potatoe'),
  (56, 0, 'Chips Tortilla'),
  (57, 0, 'Pretzels'),
  (58, 0, 'Salsa'),
  (59, 0, 'Ketchup'),
  (60, 0, 'Mustard'),
  (61, 0, 'Salt'),
  (62, 0, 'Pepper'),
  (63, 0, 'Pepper Seasoned'),
  (64, 0, 'Pepper Lemon'),
  (65, 0, 'Soda Diet'),
  (66, 0, 'Soda Diet Decaf'),
  (67, 0, 'Orange Juice'),
  (68, 0, 'Cottage Cheese'),
  (69, 0, 'Sour Cream'),
  (70, 0, 'Yogurt Greek'),
  (71, 0, 'Yogurt Plain'),
  (72, 0, 'Milk 1%'),
  (73, 0, 'Milk 2%'),
  (74, 0, 'Cheese Slices'),
  (75, 0, 'Cheese Block'),
  (76, 0, 'Eggs'),
  (77, 0, 'Laundry Softener'),
  (78, 0, 'Laundry Detergent'),
  (79, 0, 'Paper Plates Sm'),
  (80, 0, 'Paper Plates Lg'),
  (81, 0, 'Paper Towel'),
  (82, 0, 'Napkins'),
  (83, 0, 'Wraps'),
  (84, 0, 'Raison Bran'),
  (85, 0, 'Bran Flakes'),
  (86, 0, 'Shredded Wheat'),
  (87, 0, 'Oatmeal'),
  (88, 0, 'Chocolate Dark'),
  (89, 0, 'Tomatoes Roma'),
  (90, 0, 'Tomatoes TOV'),
  (91, 0, 'Onions Green'),
  (92, 0, 'Onions Red'),
  (93, 0, 'Blueberries'),
  (94, 0, 'Blackberries'),
  (95, 0, 'Card Birthday'),
  (96, 0, 'Card Anniversary'),
  (97, 0, 'Card Christmas'),
  (98, 0, 'Toilet Cleaner'),
  (99, 0, 'Toilet Paper'),
  (100, 0, 'Dishwasher Detergent'),
  (101, 0, 'Paper Towel'),
  (102, 0, 'Vinegar White'),
  (103, 0, 'Mouthwash'),
  (104, 0, 'Toothpaste'),
  (105, 0, 'Soap Hand'),
  (106, 0, 'Soap Dish Ivory'),
  (107, 0, 'Soap Dish Dawn'),
  (108, 0, 'Soap Dish Foam'),
  (109, 0, 'Popcorn Microwave'),
  (110, 0, 'Popcorn'),
  (111, 0, 'Bag Snack Plastic'),
  (112, 0, 'Bag Lunch Paper'),
  (113, 0, 'Bag Sandwich Plastic'),
  (114, 0, 'Bag Pint Plastic'),
  (115, 0, 'Bag Quart Plastic'),
  (116, 0, 'Bag Half-Gallon Plastic'),
  (117, 0, 'Bag Gallon Plastic'),
  (118, 0, 'Bag Pint Plastic Zipper'),
  (119, 0, 'Bag Quart Plastic Zipper'),
  (120, 0, 'Bag Half-Gallon Plastic Zipper'),
  (121, 0, 'Bag Gallon Plastic Zipper'),
  (122, 0, 'Aluminum Foil'),
  (123, 0, 'Rice'),
  (124, 0, 'Butter');
  */

SELECT setval('product_productid_seq', (SELECT MAX(ProductId) FROM Product));

INSERT INTO Category (CategoryId, UserId, Name) VALUES
  (0, 0, 'None'),
  (2, 0, 'Fruit'),
  (3, 0, 'Dairy'),
  (4, 0, 'Canned Goods'),
  (5, 0, 'Frozen'),
  (6, 0, 'Produce'),
  (7, 0, 'Bakery'),
  (8, 0, 'Deli'),
  (9, 0, 'Condiment'),
  (10, 0, 'Meat'),
  (11, 0, 'Organic'),
  (12, 0, 'Prepared Foods'),
  (13, 0, 'Cereal'),
  (14, 0, 'Breads'),
  (15, 0, 'Paper Products'),
  (16, 0, 'Toppings'),
  (17, 0, 'Snacks'),
  (18, 0, 'Nuts'),
  (19, 0, 'Cleaning'),
  (20, 0, 'Laundry'),
  (21, 0, 'Beverage'),
  (22, 0, 'Juice'),
  (23, 0, 'Health Beauty'),
  (24, 0, 'Suppliments'),
  (25, 0, 'Pharmacy'),
  (26, 0, 'Adult Beverages'),
  (27, 0, 'Spices'),
  (28, 0, 'Desserts'),
  (29, 0, 'Household');

SELECT setval('category_categoryid_seq', (SELECT MAX(CategoryId) FROM Category));

INSERT INTO Brand (BrandId, UserId, Name) VALUES
  (0, 0, 'None'),
  (2, 0, 'Johnson & Johnson'),
  (3, 0, 'Dole'),
  (4, 0, 'Heinz'),
  (5, 0, 'Cambell'),
  (6, 0, 'Great Value'),
  (7, 0, 'Archer Farms'),
  (8, 0, 'Food Club'),
  (9, 0, 'Tombstone'),
  (10, 0, 'Del Monte'),
  (11, 0, 'Green Giant'),
  (12, 0, 'Libby''s'),
  (13, 0, 'Tyson'),
  (14, 0, 'Hormel'),
  (15, 0, 'Jennie-O'),
  (16, 0, 'Daisy'),
  (17, 0, 'Kemps'),
  (18, 0, 'Land O''Lakes'),
  (19, 0, 'Famous Daves');

SELECT setval('brand_brandid_seq', (SELECT MAX(BrandId) FROM Brand));

INSERT INTO Size (SizeId, UserId, UnitId, Quantity) VALUES
  (0, 0, 0, 0),
  (1, 0, 1, 0);

SELECT setval('size_sizeid_seq', (SELECT MAX(SizeId) FROM Size));

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
