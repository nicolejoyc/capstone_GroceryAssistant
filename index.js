const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const { fileURLToPath } = require('url');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async (req, res) => {
    try {
      const client = await pool.connect();

      const grocery_list = await client.query(
        `SELECT id, g.name AS name, c.rgbvalue
         FROM grocery_list AS g
            INNER JOIN
         Color AS c USING(ColorId)
            WHERE id != 0
            ORDER BY id ASC`
      );
      const locals = {
        'preference': false,
        'table': 'grocery_list',
        'title': 'Grocery Assistant',
        'url_control': { 'name' : 'Settings', 'url': 'grocery-data-manager' },
        'items': (grocery_list) ? grocery_list.rows : null
      };
      res.render('pages/index', locals);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('//add', async (req, res) => {
    try {
      const client = await pool.connect();

      const inputForm = [
        { "label" : "Grocery List Name", "hint": "My List", "value": "" }
      ];
      const groceryLists = await client.query(
        `SELECT * FROM grocery_list WHERE Filtered = false ORDER BY Name ASC`
      );
      const colors = await client.query(
        `SELECT ColorId AS id, ColorName AS name FROM Color ORDER BY Name ASC`
      );
      const categories = await client.query(
        `SELECT CategoryId AS id, Name FROM category ORDER BY Name ASC`
      );
      const stores = await client.query(
        `SELECT StoreId AS id, Name FROM Store ORDER BY Name ASC`
      );

      const parms = {
        'operation': 'add',
        'title': 'Add Grocery List',
        'name': 'grocery-list',
        'filter_lock': (groceryLists.rowCount <= 1) ? true : false,
        'filtered': false,
        'source_list_id': 0,
        'source_lists': (groceryLists) ? groceryLists.rows : null,
        'color_id': 0,
        'colors': (colors) ? colors.rows : null,
        'category_id': 0,
        'categories': (categories) ? categories.rows : null,
        'store_id': 0,
        'stores': (stores) ? stores.rows : null,
        'inputform': inputForm
      };

      res.render('pages/interface-9', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('//view', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT id, * FROM grocery_list WHERE id = ` + id
      );
      const groceryLists = await client.query(
        `SELECT * FROM grocery_list WHERE Filtered = false AND id != ${id} ORDER BY Name ASC`
      );
      const filterLock = await client.query(
        `SELECT FilterSourceId FROM FilterLock WHERE FilterSourceId = ${id}`
      );
      const colors = await client.query(
        `SELECT ColorId AS id, ColorName AS name FROM Color ORDER BY Name ASC`
      );
      const categories = await client.query(
        `SELECT CategoryId AS id, Name FROM category ORDER BY Name ASC`
      );
      const stores = await client.query(
        `SELECT StoreId AS id, Name FROM Store ORDER BY Name ASC`
      );

      const inputForm = [
        { "label" : "List Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'view',
        'title': 'View Grocery List',
        'name': 'list',
        'item_id': id,
        'filter_lock': (filterLock.rowCount  || (groceryLists.rowCount <= 1)) ? true : false,
        'filtered': (item) ? item.rows[0].filtered :  null,
        'color_id': (item) ? item.rows[0].colorid : null,
        'colors': (colors) ? colors.rows : null,
        'source_list_id': (item) ? item.rows[0].sourcelistid : null,
        'source_lists': (groceryLists) ? groceryLists.rows : null,
        'category_id': (item) ? item.rows[0].categoryid : null,
        'categories': (categories) ? categories.rows : null,
        'store_id': (item) ? item.rows[0].storeid : null,
        'stores': (stores) ? stores.rows : null,
        'inputform': inputForm
      };

      res.render('pages/interface-9', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('//edit', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT id, * FROM grocery_list WHERE id = ${id}`
      );
      const groceryLists = await client.query(
        `SELECT * FROM grocery_list WHERE Filtered = false AND id != ${id} ORDER BY Name ASC`
      );
      const filterLock = await client.query(
        `SELECT FilterSourceId FROM FilterLock WHERE FilterSourceId = ${id}`
      );
      const colors = await client.query(
        `SELECT ColorId AS id, ColorName AS name FROM Color ORDER BY Name ASC`
      );
      const categories = await client.query(
        `SELECT CategoryId AS id, Name FROM category ORDER BY Name ASC`
      );
      const stores = await client.query(
        `SELECT StoreId AS id, Name FROM Store ORDER BY Name ASC`
      );

      const inputForm = [
        { "label" : "List Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'edit',
        'title': 'Edit Grocery List',
        'name': 'list',
        'item_id': id,
        'filter_lock': (filterLock.rowCount  || (groceryLists.rowCount <= 1)) ? true : false,
        'filtered': (item) ? item.rows[0].filtered : null, 
        'color_id': (item) ? item.rows[0].colorid : null, 
        'colors': (colors) ? colors.rows : null,
        'source_list_id': (item) ? item.rows[0].sourcelistid : null, 
        'source_lists': (groceryLists) ? groceryLists.rows : null,
        'category_id': (item) ? item.rows[0].categoryid : null, 
        'categories': (categories) ? categories.rows : null,
        'store_id': (item) ? item.rows[0].storeid : null, 
        'stores': (stores) ? stores.rows : null,
        'inputform': inputForm
      };

      res.render('pages/interface-9', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/list', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;
      const orderBy = (req.query.orderBy) ? req.query.orderBy : 'name';
      const showPurchased = (req.query.showPurchased) ? req.query.showPurchased : 'false';
      const showHidden = (req.query.showHidden) ? req.query.showHidden : 'false';
      const boolShowPurchased = (showPurchased === 'true') ? true : false;
      const boolShowHidden = (showHidden === 'true') ? true : false;

      const groceryList = await client.query(
        `SELECT * FROM grocery_list INNER JOIN color USING (colorid) WHERE id = ${id}`
      );

      // Preload query parameters
      let storeSubquery = "";
      let categorySubquery = "INNER JOIN Category AS c USING (CategoryId)";
      let storeCondition = "";
      let categoryCondition = "";
      let sourceListId = id;

      // Process filtered list
      if(groceryList && groceryList.rowCount) {
        let rowItem = groceryList.rows[0];
        if(rowItem.filtered) {
          sourceListId = rowItem.sourcelistid;
          if(rowItem.storeid !== 0) {
            storeSubquery = ` LEFT JOIN (SELECT * FROM ProductStore) AS ps USING(ProductId) `;
            storeCondition = `AND StoreId = ${rowItem.storeid}`;
          }
          if(rowItem.categoryid !== 0) {
            categorySubquery = ` LEFT JOIN (SELECT * FROM Category LEFT JOIN
              ProductCategory USING (CategoryId)) AS c USING(ProductId) `;
            categoryCondition += `AND c.CategoryId = ${rowItem.categoryid}`;
          }
        }
      }

      // Query database for listitem info
      const items = await client.query(
        `SELECT
            listid,
            listitemid as id,
            itemcount AS quantity,
            Product.name AS name,
            c.name AS category,
            c.CategoryId AS Categoryid,
            Brand.name AS brand,
            color.RGBValue,
            UrgencyId AS urgency,
            purchased,
            hidden
          FROM ListItem AS li
            ${storeSubquery}
            ${categorySubquery}
            INNER JOIN Product USING (ProductId)
            INNER JOIN Brand USING (BrandId)
            INNER JOIN
              (SELECT id AS ListId, RGBValue FROM grocery_list
                INNER JOIN
               color USING (colorid)) AS color USING (listid)
            LEFT JOIN Urgency USING (UrgencyId)
          WHERE ((listid = ${sourceListId} ${storeCondition} ${categoryCondition})
            OR (listid = ${id}))
            AND ((((purchased = false) OR (${boolShowPurchased} = true)) 
            AND ((hidden = false) OR (${boolShowHidden} = true)))
            OR ((purchased = true) AND (hidden = true) AND (${boolShowHidden} = true)))
          ORDER BY ` + orderBy
      );
      //console.log(items);

      let ordering = '';
      switch (orderBy) {
        case 'name':
          ordering = 'product';
          break;
        case 'category, name':
          ordering = 'category';
          break;
        case 'urgency, name':
          ordering = 'urgency';
          break;
      }

      const locals = {
        'orderBy': ordering,
        'show_purchased': showPurchased,
        'show_hidden': showHidden,
        'preference': false,
        'table': 'listitem',
        'title': name,
        'id': id,
        'items': (items) ? items.rows : null,
        'border_color': groceryList.rows[0].rgbvalue
      };

      res.render('pages/interface-8', locals);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager', async (req, res) => {
    try {
      const client = await pool.connect();

      const params = { 'title' : 'Grocery Data Manager'};
      
      res.render('pages/groceryDataManager', params);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/category', async (req, res) => {
    try {
      const client = await pool.connect();

      const categories = await client.query(
        `SELECT CategoryId AS id, Name FROM category WHERE CategoryId != 0 ORDER BY name ASC`
      );

      const locals = {
        'preference': false,
        'table': 'category',
        'title': 'Categories',
        'items': (categories) ? categories.rows : null
      };

      res.render('pages/interface-1', locals);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/store', async (req, res) => {
    try {
      const client = await pool.connect();

      const stores = await client.query(
        `SELECT StoreId AS id, Name FROM store WHERE StoreId != 0 ORDER BY name ASC`
      );
      const locals = {
        'preference': false,
        'table': 'store',
        'title': 'Stores',
        'items': (stores) ? stores.rows : null
      };
      res.render('pages/interface-1', locals);

      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/product', async (req, res) => {
    try {
      const client = await pool.connect();

      const products = await client.query(
        `SELECT ProductId AS id, Name FROM product ORDER BY name ASC`
      );
      const locals = {
        'preference': false,
        'table': 'product',
        'title': 'Products',
        'items': (products) ? products.rows : null
      };
      res.render('pages/interface-1', locals);

      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/brand', async (req, res) => {
    try {
      const client = await pool.connect();

      const brands = await client.query(
        `SELECT BrandId AS id, Name FROM Brand WHERE BrandId != 0 ORDER BY name ASC`
      );
      const locals = {
        'preference': false,
        'table': 'brand',
        'title': 'Brands',
        'items': (brands) ? brands.rows : null
      };
      res.render('pages/interface-1', locals);

      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/product-preferences', async (req, res) => {
    try {
      const client = await pool.connect();

      const products = await client.query(
        `SELECT ProductId AS id, Name FROM product ORDER BY name ASC`
      );
      const locals = {
        'preference': true,
        'table': 'product',
        'title': 'Product Preferences',
        'url_list': (products) ? products.rows : null
      };
      res.render('pages/interface-3', locals);

      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/product-preferences/view', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT ProductId AS id, Name FROM product WHERE ProductId = ` + id
      );

      const categories = await client.query(
        `SELECT CategoryId AS id, Name FROM category WHERE CategoryId != 0 ORDER BY name ASC`
      );

      const preferredCategories = await client.query(
        `SELECT ProductId, CategoryId, UserId FROM productcategory`
      );

      const stores = await client.query(
        `SELECT StoreId AS id, Name FROM store WHERE StoreId != 0 ORDER BY name ASC`
      );

      const preferredStores = await client.query(
        `SELECT ProductId, StoreId, UserId FROM productstore`
      );

      const brands = await client.query(
        `SELECT BrandId AS id, Name FROM Brand WHERE BrandId != 0 ORDER BY name ASC`
      );

      const preferredBrands = await client.query(
        `SELECT ProductId, BrandId, UserId FROM productbrand`
      );

      const locals = {
        'title': name,
        'item': (item) ? item.rows : null,
        'categories': (categories) ? categories.rows : null,
        'prefCat': (preferredCategories) ? preferredCategories.rows : null,
        'stores': (stores) ? stores.rows : null,
        'prefStore': (preferredStores) ? preferredStores.rows : null,
        'brands': (brands) ? brands.rows : null,
        'prefBrand': (preferredBrands) ? preferredBrands.rows : null
      };
      res.render('pages/interface-6', locals);

      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/category/add', async (req, res) => {
    try {
      const client = await pool.connect();

      const inputForm = [
        { "label" : "Category Name", "hint": "e.g. Dairy, Meat, Household, etc.", "value": "" }
      ];

      const parms = {
        'operation': 'add',
        'title': 'Add Category',
        'name': 'category',
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/store/add', async (req, res) => {
    try {
      const client = await pool.connect();

      const inputForm = [
        { "label" : "Store Name", "hint": "e.g. Kwik Trip, Aldi, etc.", "value": "" },
        { "label" : "Website", "hint": "e.g. www.walmart.com", "value": "" },
        { "label" : "Phone", "hint": "e.g. 555-555-5555", "value": "" }
      ];

      const parms = {
        'operation':'add',
        'title':'Add Store',
        'name': 'store',
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();

      
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/product/add', async (req, res) => {
    try {
      const client = await pool.connect();

      const inputForm = [
        { "label" : "Product Name", "hint": "e.g. Milk, Butter, etc.", "value": "" },
      ];

      const parms = {
        'operation': 'add',
        'title': 'Add Product',
        'name': 'product',
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/brand/add', async (req, res) => {
    try {
      const client = await pool.connect();

      const inputForm = [
        { "label" : "Brand Name", "hint": "e.g. Kemps, Heinz etc.", "value": "" }
      ];

      const parms = {
        'operation': 'add',
        'title': 'Add Brand',
        'name': 'brand',
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/list/listitem/add', async (req, res) => {
    try {
      const client = await pool.connect();
      const listId = req.query.listid;
      const listName = req.query.listname;
      
      const products = await client.query(
        `SELECT ProductId AS id, Name FROM product ORDER BY name ASC`
       
      );     
      
      const product_id = req.query.productid ? req.query.productid : (products.rowCount) ? products.rows[0].id : 0;
      const productID = parseInt(product_id);
      const productcategory = await client.query(
        `SELECT CategoryId AS id, Name FROM productcategory INNER JOIN category USING (categoryid) WHERE ProductId = ${productID} ORDER BY name ASC`
      );
      let categories;
      if (productcategory.rowCount) {
        categories = productcategory;
      } else {
        categories = await client.query(
          `SELECT CategoryId AS id, Name FROM category WHERE CategoryId = 0 ORDER BY id ASC`
        );
      }
      const productbrand = await client.query(
        `SELECT BrandId AS id, Name FROM productbrand INNER JOIN brand USING (brandid) WHERE ProductId = ${productID} ORDER BY name ASC`
      );
      let brands;
      if (productbrand.rowCount) {
        brands = productbrand;
      } else {
        brands = await client.query(
          `SELECT BrandId AS id, Name FROM Brand WHERE BrandId = 0 ORDER BY id ASC`
        );
      }
      const urgencies = await client.query(
        `SELECT UrgencyId AS id, Name FROM Urgency ORDER BY id DESC`
      );

      const locals = {
        'operation': 'add',
        'title': listName,
        'list_id' : listId,
        'list_name' : listName,
        'listitem_id': 0,
        'product_id': productID, 
        'products': (products) ? products.rows : null,
        'category_id': (categories.rowCount) ? categories.rows[0].categoryid : 0, 
        'categories': (categories) ? categories.rows : null,
        'brand_id':  (brands.rowCount) ? brands.rows[0].brandid : 0,  
        'brands': (brands) ? brands.rows : null,
        'urgency_id': 0,
        'urgencies': (urgencies) ? urgencies.rows : null,
        'purchased': false,
        'hidden': false,
        'itemcount': 1
      };

      res.render('pages/interface-7', locals);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/list/listitem/edit', async (req, res) => {
    try {
      const client = await pool.connect();
      const listId = req.query.listid;
      const listName = req.query.listname;
      const listItemId = req.query.id;

      const listItem = await client.query(
        `SELECT * FROM listitem WHERE ListItemId = ` + listItemId
      );
      const productID = listItem.rows[0].productid;

      const products = await client.query(
        `SELECT ProductId AS id, Name FROM product WHERE ProductId = ${productID}`
      );
      const productcategory = await client.query(
        `SELECT CategoryId  As id, Name FROM productcategory INNER JOIN category USING (categoryid) WHERE ProductId = ${productID} ORDER BY name ASC`
      );
      let categories;
      if (productcategory.rowCount) {
        categories = productcategory;
      } else {
        categories = await client.query(
          `SELECT CategoryId AS id, Name FROM category WHERE CategoryId = 0 ORDER BY id ASC`
        );
      }
      const productbrand = await client.query(
        `SELECT BrandId AS id,  Name FROM productbrand INNER JOIN brand USING (brandid) WHERE ProductId = ${productID} ORDER BY name ASC`
      );
      let brands;
      if (productbrand.rowCount) {
        brands = productbrand;
      } else {
        brands = await client.query(
          `SELECT BrandId AS id, Name FROM Brand WHERE BrandId = 0 ORDER BY id ASC`
        );
      }
      const urgencies = await client.query(
        `SELECT UrgencyId AS id, Name FROM Urgency ORDER BY id DESC`
      );
      
      const locals = {
        'operation': 'edit',
        'title': listName,
        'list_id' : listId,
        'list_name' : listName,
        'listitem_id': listItemId,
        'product_id': (listItem) ? listItem.rows[0].productid :null, 
        'products': (products) ? products.rows : null,
        'category_id': (listItem) ? listItem.rows[0].categoryid :null, 
        'categories': (categories) ? categories.rows : null,
        'brand_id': (listItem) ? listItem.rows[0].brandid :null, 
        'brands': (brands) ? brands.rows : null,
        'urgency_id': (listItem) ? listItem.rows[0].urgencyid :null,
        'urgencies': (urgencies) ? urgencies.rows : null,
        'purchased':(listItem) ? listItem.rows[0].purchased: null,
        'hidden':(listItem) ? listItem.rows[0].hidden: null,
        'itemcount':(listItem) ? listItem.rows[0].itemcount: null
      };
      res.render('pages/interface-7', locals);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/list/listitem/view', async (req, res) => {
    try {
      const client = await pool.connect();
      const listId = req.query.listid;
      const listName = req.query.listname;
      const listItemId = req.query.id;

      const listItem = await client.query(
        `SELECT * FROM listitem WHERE ListItemId = ` + listItemId
      );
      const productID = listItem.rows[0].productid;

      const products = await client.query(
        `SELECT ProductId AS id, Name FROM product WHERE ProductId = ${productID}`
      );
      const productcategory = await client.query(
        `SELECT CategoryId  As id, Name FROM productcategory INNER JOIN category USING (categoryid) WHERE ProductId = ${productID} ORDER BY name ASC`
      );
      let categories;
      if (productcategory.rowCount) {
        categories = productcategory;
      } else {
        categories = await client.query(
          `SELECT CategoryId AS id, Name FROM category WHERE CategoryId = 0 ORDER BY id ASC`
        );
      }
      const productbrand = await client.query(
        `SELECT BrandId AS id,  Name FROM productbrand INNER JOIN brand USING (brandid) WHERE ProductId = ${productID} ORDER BY name ASC`
      );
      let brands;
      if (productbrand.rowCount) {
        brands = productbrand;
      } else {
        brands = await client.query(
          `SELECT BrandId AS id, Name FROM Brand WHERE BrandId = 0 ORDER BY id ASC`
        );
      }
      const urgencies = await client.query(
        `SELECT UrgencyId AS id, Name FROM Urgency ORDER BY id DESC`
      );
      
      const locals = {
        'operation': 'view',
        'title': listName,
        'list_id' : listId,
        'list_name' : listName,
        'listitem_id': listItemId,
        'product_id': (listItem) ? listItem.rows[0].productid :null, 
        'products': (products) ? products.rows : null,
        'category_id': (listItem) ? listItem.rows[0].categoryid :null, 
        'categories': (categories) ? categories.rows : null,
        'brand_id': (listItem) ? listItem.rows[0].brandid :null, 
        'brands': (brands) ? brands.rows : null,
        'urgency_id': (listItem) ? listItem.rows[0].urgencyid :null,
        'urgencies': (urgencies) ? urgencies.rows : null,
        'purchased':(listItem) ? listItem.rows[0].purchased: null,
        'hidden':(listItem) ? listItem.rows[0].hidden: null,
        'itemcount':(listItem) ? listItem.rows[0].itemcount: null
      };
      res.render('pages/interface-7', locals);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/product/view', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT ProductId AS id, Name FROM product WHERE ProductId = ` + id
      );

      const inputForm = [
        { "label" : "Product Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'view',
        'title': 'View Product',
        'name': 'product',
        'item_id': id,
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/category/view', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT CategoryId AS id, Name FROM category WHERE CategoryId = ` + id
      );

      const inputForm = [
        { "label" : "Category Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'view',
        'title': 'View Category',
        'name': 'category',
        'item_id': id,
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/store/view', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT StoreId AS id, * FROM store WHERE StoreId = ` + id
      );

      const inputForm = [
        { "label" : "Store Name", "hint": "", "value": item.rows[0].name },
        { "label" : "Website", "hint": "", "value": item.rows[0].website },
        { "label" : "Phone", "hint": "", "value": item.rows[0].phone }
      ];

      const parms = {
        'operation': 'view',
        'title': 'View Store',
        'name': 'store',
        'item_id': id,
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/brand/view', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT BrandId AS id, Name FROM brand WHERE BrandId = ` + id
      );

      const inputForm = [
        { "label" : "Brand Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'view',
        'title': 'View Brand',
        'name': 'brand',
        'item_id': id,
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/product/edit', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT ProductId AS id, Name FROM product WHERE ProductId = ${id}`
      );

      const inputForm = [
        { "label" : "Product Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'edit',
        'title': 'Edit Product',
        'name': 'product',
        'item_id': id,
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/category/edit', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT CategoryId AS id, Name FROM category WHERE CategoryId = ${id}`
      );

      const inputForm = [
        { "label" : "Category Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'edit',
        'title': 'Edit Category',
        'name': 'category',
        'item_id': id,
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/brand/edit', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT BrandId AS id, Name FROM brand WHERE BrandId = ${id}`
      );

      const inputForm = [
        { "label" : "Brand Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'edit',
        'title': 'Edit Brand',
        'name': 'brand',
        'item_id': id,
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-data-manager/store/edit', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT StoreId AS id, Name, Website, Phone FROM store WHERE StoreId = ${id}`
      );

      const inputForm = [
        { "label" : "Store Name", "hint": "", "value": item.rows[0].name },
        { "label" : "Website", "hint": "", "value": item.rows[0].website },
        { "label" : "Phone", "hint": "", "value": item.rows[0].phone }
      ];

      const parms = {
        'operation': 'edit',
        'title': 'Edit Store',
        'name': 'store',
        'item_id': id,
        'message': '',
        'inputform': inputForm
      };

      res.render('pages/interface-2', parms);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/dbsnapshot', async (req, res) => {
    try {
      const client = await pool.connect();

      let qstr = ''; // Database initialization query string
      const params = { 'title' : 'Database Backup File: support/dbsnapshot.sql'};
      const fpath = './support/dbsnapshot.sql';
      // Database tables (name: requires set id)
      const tablenames = {
        'grocery_list': true,
        'filterlock': false,
        'listitem': true,
        'product': true,
        'category': true,
        'brand': true,
        'store': true,
        'productcategory': false,
        'productbrand': false,
        'productstore': false,
        //'urgency': true,
        //'color': true
      };
      // Generate query insert strings
      const genInsertString = (r) => {
        qstr += `  (`;
        for (let key in r) {
          if(typeof r[key] === 'string') {
            let str = r[key].replace(/'/g, "''");
            qstr += '\'' + str + '\'';
          } else {
            qstr += r[key];
          }
          qstr += ',';
        }
        qstr = qstr.slice(0, -1);
        qstr += `),\n`;
      };
      for(let table in tablenames) {
        const dbTable = await client.query(
          `SELECT * FROM ${table};`
        );
        if(dbTable.rowCount) {
          let r0 = dbTable.rows[0];
          qstr += `TRUNCATE TABLE ${table};`;
          qstr += `INSERT INTO ${table} (`;
          for (let key in r0) {
            qstr += key + ',';
          }
          qstr = qstr.slice(0, -1);
          qstr += `) VALUES \n`;
          dbTable.rows.forEach((r) => genInsertString(r));
          qstr = qstr.slice(0, -3);
          qstr += `);\n`;
          if(tablenames[table]) {
            qstr += `SELECT setval('${table}_${Object.keys(r0)[0]}_seq', (SELECT MAX(${Object.keys(r0)[0]}) FROM ${table}));\n`;
          }
        }
      }
      //console.log(qstr);
      fs.writeFile(fpath, qstr, (err) => {
        if(err) {
          console.log("File Write Failed");
        }
      });
      
      res.render('pages/interface-4', params);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/about-us', async (req, res) => {
    try {
      const client = await pool.connect();

      const params = { 'title' : 'About Us'};
      
      res.render('pages/aboutUs', params);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .post('/add', async(req, res) => {
		try {
      const client = await pool.connect();
			const groceryListName = req.body.grocery_list_name;
			const userId = req.body.user_id;
      const colorId = req.body.color_id;
      const filtered = req.body.filtered;
      const sourceListId = req.body.source_list_id;
      const categoryId = req.body.category_id;
      const storeId = req.body.store_id;

			const sqlInsert = await client.query(
        `INSERT INTO grocery_list (Name, UserId, Filtered, ColorId, SourceListId, Categoryid, Storeid)
        VALUES (${groceryListName}, ${userId}, ${filtered}, ${colorId}, ${sourceListId},  ${categoryId}, ${storeId})
        RETURNING id AS new_id;`);

      // Add filter lock
      if((filtered === "'true'") && sqlInsert.rowCount) {
        const sqlInsertLock = await client.query(
            `INSERT INTO FilterLock (FilteredListId, FilterSourceId, UserId)
            VALUES (${sqlInsert.rows[0].new_id}, ${sourceListId}, ${userId})`
        );
      }
      
			const result = {
				'response': (sqlInsert) ? (sqlInsert.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/category/add', async(req, res) => {
		try {
			const client = await pool.connect();
			const categoryName = req.body.category_name;
			const userId = req.body.user_id;
			
			const sqlInsert = await client.query(
        `INSERT INTO Category (Name, UserId)
        VALUES (${categoryName}, ${userId})
        RETURNING CategoryId AS new_id;`);
			
			const result = {
				'response': (sqlInsert) ? (sqlInsert.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/store/add', async(req, res) => {
		try {
      const client = await pool.connect();
			const storeName = req.body.store_name;
      const userId = req.body.user_id;
			const storeWebsite = req.body.store_website;
      const storePhone = req.body.store_phone;
      	
			const sqlInsert = await client.query(
        `INSERT INTO Store (Name, UserId, Website, Phone)
        VALUES (${storeName}, ${userId}, ${storeWebsite}, ${storePhone})
        RETURNING StoreId AS new_id;`);
			
			const result = {
				'response': (sqlInsert) ? (sqlInsert.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/product/add', async(req, res) => {
		try {
			const client = await pool.connect();
			const productName = req.body.product_name;
			const userId = req.body.user_id;
      	
			const sqlInsert = await client.query(
        `INSERT INTO Product (Name, UserId)
        VALUES (${productName}, ${userId})
        RETURNING ProductId AS new_id;`);
			
			const result = {
				'response': (sqlInsert) ? (sqlInsert.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/brand/add', async(req, res) => {
		try {
			const client = await pool.connect();
			const brandName = req.body.brand_name;
			const userId = req.body.user_id;
      	
			const sqlInsert = await client.query(
        `INSERT INTO Brand (Name, UserId)
        VALUES (${brandName}, ${userId})
        RETURNING BrandId AS new_id;`);
			
			const result = {
				'response': (sqlInsert) ? (sqlInsert.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/list/listitem/add', async(req, res) => {
		try {
			const client = await pool.connect();
      const listId = req.body.list_id;
      const productId = req.body.product_id;
      const categoryId = req.body.category_id;
      const brandId = req.body.brand_id;
      const urgencyId = req.body.urgency_id;
      const itemCount = req.body.item_count;

      
			const sqlInsert = await client.query(
        `INSERT INTO listitem (listid, productid, categoryid, brandid, urgencyid, itemcount)
        VALUES (${listId}, ${productId}, ${categoryId}, ${brandId}, ${urgencyId}, ${itemCount})
        RETURNING listItemId AS new_id;`);

			const result = {
				'response': (sqlInsert) ? (sqlInsert.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/list/listitem/edit', async(req, res) => {
		try {
			const client = await pool.connect();
      const listId = req.body.list_id;
      const listItemId = req.body.listitem_id;
      const productId = req.body.product_id;
      const categoryId = req.body.category_id;
      const brandId = req.body.brand_id;
      const urgencyId = req.body.urgency_id;
      const itemCount = req.body.item_count;

			const sqlUpdate = await client.query(
        `UPDATE listitem SET productid = ${productId}, categoryid = ${categoryId}, brandid = ${brandId}, urgencyid = ${urgencyId}, itemcount = ${itemCount}
          WHERE listitemid = ${listItemId};`);

			const result = {
				'response': (sqlUpdate) ? (sqlUpdate.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/product/edit', async(req, res) => {
		try {
			const client = await pool.connect();
			const productId = req.body.item_id;
			const productName = req.body.item_name;
			const userId = req.body.user_id;
      	
			const sqlUpdate = await client.query(
        `UPDATE Product SET Name = ${productName}
          WHERE ProductId = ${productId};`);
			
			const result = {
				'response': (sqlUpdate) ? (sqlUpdate.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/category/edit', async(req, res) => {
		try {
			const client = await pool.connect();
			const categoryId = req.body.item_id;
			const categoryName = req.body.item_name;
			const userId = req.body.user_id;
      	
      // TODO: add user id to where clause
			const sqlUpdate = await client.query(
        `UPDATE Category SET Name = ${categoryName}
          WHERE CategoryId = ${categoryId};`);
			
			const result = {
				'response': (sqlUpdate) ? (sqlUpdate.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/brand/edit', async(req, res) => {
		try {
			const client = await pool.connect();
			const brandId = req.body.item_id;
			const brandName = req.body.item_name;
			const userId = req.body.user_id;
      	
      // TODO: add user id to where clause
			const sqlUpdate = await client.query(
        `UPDATE Brand SET Name = ${brandName}
          WHERE BrandId = ${brandId};`);
			
			const result = {
				'response': (sqlUpdate) ? (sqlUpdate.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/store/edit', async(req, res) => {
		try {
			const client = await pool.connect();
			const storeId = req.body.store_id;
			const storeName = req.body.store_name;
			const storeWebsite = req.body.store_website;
			const storePhone = req.body.store_phone;
			const userId = req.body.user_id;
      	
      // TODO: add user id to where clause
			const sqlUpdate = await client.query(
        `UPDATE Store SET Name = ${storeName}, Website = ${storeWebsite}, Phone = ${storePhone}
          WHERE storeId = ${storeId};`);
			
			const result = {
				'response': (sqlUpdate) ? (sqlUpdate.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/edit', async(req, res) => {
		try {
			const client = await pool.connect();
			const listId = req.body.item_id;
			const listName = req.body.item_name;
			const userId = req.body.user_id;
      const colorId = req.body.color_id;
      const filtered = req.body.filtered;
      let sourceListId = req.body.source_list_id;
      let categoryId = req.body.category_id;
      let storeId = req.body.store_id;

      // Remove filter lock
      const sqlDelete = await client.query(
        `DELETE FROM FilterLock WHERE FilteredListId = ${listId}`
      );
      // Reset any old state
      if(filtered === "'false'") {
        sourceListId = categoryId = storeId = 0;
      }

      // TODO: add user id to where clause
			const sqlUpdate = await client.query(
        `UPDATE grocery_list SET Name = ${listName}, Filtered = ${filtered}, ColorId = ${colorId}, SourceListId = ${sourceListId}, CategoryId = ${categoryId}, StoreId = ${storeId}
          WHERE id = ${listId};`);

      // Add filter lock
      if(filtered === "'true'") {
        const sqlInsert = await client.query(
          `INSERT INTO FilterLock (FilteredListId, FilterSourceId, UserId)
            VALUES (${listId}, ${sourceListId}, ${userId})`
        );
      }
			
			const result = {
				'response': (sqlUpdate) ? (sqlUpdate.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/edit-preference', async(req, res) => {
		try {
			const client = await pool.connect();
			const userId = req.body.user_id;
			const productId = req.body.product_id;
			const preferenceTable = req.body.preference_table;
			const preferenceId = req.body.preference_id;
      const uppercaseTable = preferenceTable.charAt(0).toUpperCase() + preferenceTable.slice(1);
      	
			const sqlInsert = await client.query(
        `INSERT INTO product` + preferenceTable + ` (ProductId, ` + uppercaseTable + `Id, UserId)
        VALUES (${productId}, ${preferenceId}, ${userId});`);
			
			const result = {
				'response': (sqlInsert) ? (sqlInsert.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/remove-preference', async(req, res) => {
		try {
			const client = await pool.connect();
			const userId = req.body.user_id;
			const productId = req.body.product_id;
			const preferenceTable = req.body.preference_table;
			const preferenceId = req.body.preference_id;
      const uppercaseTable = preferenceTable.charAt(0).toUpperCase() + preferenceTable.slice(1);
      
			const sqlDelete = await client.query(
        `DELETE FROM product` + preferenceTable + ` WHERE ProductId = ` + productId + 
        ` AND ` + uppercaseTable + `Id = ` + preferenceId + ` AND UserId = ` + userId + `;`);

			const result = {
				'response': (sqlDelete) ? (sqlDelete.rows[0]) : null
			};
			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/delete', async(req, res) => {
		try {
			const client = await pool.connect();
			const itemId = req.body.item_id;
			const table = req.body.table_name;

      var sql = [];
      sql[0] = (`DELETE FROM ` + table + ` WHERE ` + table + `id = ` + itemId + `;`);

      switch (table) {
        case 'product':
          sql.push(`DELETE FROM productcategory WHERE productid = ` + itemId + `;`,
          `DELETE FROM productstore WHERE productid = ` + itemId + `;`,
          `DELETE FROM productbrand WHERE productid = ` + itemId + `;`,
          `DELETE FROM listitem WHERE productid = ` + itemId + `;`);
          break;
        case 'category':
          sql.push(`DELETE FROM productcategory WHERE categoryid = ` + itemId + `;`,
          `UPDATE listitem SET categoryid = 0 WHERE categoryid = ` + itemId + `;`);
          break;
        case 'store':
          sql.push(`DELETE FROM productstore WHERE storeid = ` + itemId + `;`);
          break;
        case 'brand':
          sql.push(`DELETE FROM productbrand WHERE brandid = ` + itemId + `;`,
          `UPDATE listitem SET brandid = 0 WHERE brandid = ` + itemId + `;`);
          break;
        case 'grocery_list':
          sql[0] = `DELETE FROM ` + table + ` WHERE id = ` + itemId + `;`;
          sql.push(`DELETE FROM listitem WHERE listid = ` + itemId + `;`);
          sql.push(`DELETE FROM filterlock
            WHERE filteredlistid = ` + itemId + ` OR filterSourceId = ` + itemId + `;`);
          sql.push(`UPDATE grocery_list
            SET filtered = 'false', colorid = 0, sourcelistid = 0, storeid = 0, categoryid = 0
              WHERE sourcelistid = ` + itemId + `;`);
          break;
      }
      let result;
      
      sql.forEach(async function(i) {
        const sqlDelete = await client.query(i);

        if(!i) {
          result = {
            'response': (sqlDelete) ? (sqlDelete.rows[0]) : null
          };
        }

      });

      res.set({
        'Content-Type': 'application/json'
      });
        
      res.json({ requestBody: result });
			
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/urgency-checkbox-change', async(req, res) => {
		try {
			const client = await pool.connect();
			const itemId = req.body.listitem_id;
			const urgencyId = req.body.urgency_id;
      
			const sqlUpdate = await client.query(
        `UPDATE listitem SET urgencyid = ` + urgencyId + ` WHERE listitemid = ` + itemId + `;`
      );

			const result = {
				'response': (sqlUpdate) ? (sqlUpdate.rows[0]) : null
			};

			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/purchased-checkbox-change', async(req, res) => {
		try {
			const client = await pool.connect();
			const itemId = req.body.listitem_id;
			const purchased = req.body.purchased;
      
			const sqlUpdate = await client.query(
        `UPDATE listitem SET purchased = ` + purchased + ` WHERE listitemid = ` + itemId + `;`
      );

			const result = {
				'response': (sqlUpdate) ? (sqlUpdate.rows[0]) : null
			};

			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/hidden-checkbox-change', async(req, res) => {
		try {
			const client = await pool.connect();
			const itemId = req.body.listitem_id;
			const hidden = req.body.hidden;
      
			const sqlUpdate = await client.query(
        `UPDATE listitem SET hidden = ` + hidden + ` WHERE listitemid = ` + itemId + `;`
      );

			const result = {
				'response': (sqlUpdate) ? (sqlUpdate.rows[0]) : null
			};

			res.set({
				'Content-Type': 'application/json'
			});
				
			res.json({ requestBody: result });
			client.release();
		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
