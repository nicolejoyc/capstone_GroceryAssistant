const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');

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
        `SELECT * FROM grocery_list ORDER BY id ASC`
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

      const parms = {
        'operation': 'add',
        'title': 'Add Grocery List',
        'name': 'grocery-list',
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
  .get('//view', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT id, Name FROM grocery_list WHERE id = ` + id
      );

      const inputForm = [
        { "label" : "List Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'view',
        'title': 'View List',
        'name': 'list',
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
  .get('//edit', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const item = await client.query(
        `SELECT id, Name FROM grocery_list WHERE id = ${id}`
      );

      const inputForm = [
        { "label" : "List Name", "hint": "", "value": item.rows[0].name },
      ];

      const parms = {
        'operation': 'edit',
        'title': 'Edit List',
        'name': 'list',
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
  .get('/list', async (req, res) => {
    try {
      const client = await pool.connect();

      const id = req.query.id;
			const name = req.query.name;

      const items = await client.query(
        `SELECT ProductId as id, name FROM ListItem INNER JOIN Product USING (ProductId)
          WHERE Listid = ${id} ORDER BY name ASC`
      );

      const locals = {
        'preference': false,
        'table': 'listitem',
        'title': name,
        'items': (items) ? items.rows : null
      };

      res.render('pages/interface-1', locals);
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
        `SELECT CategoryId AS id, Name FROM category ORDER BY name ASC`
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
        `SELECT StoreId AS id, Name FROM store ORDER BY name ASC`
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
        `SELECT BrandId AS id, Name FROM Brand ORDER BY name ASC`
      );
      const locals = {
        'preference': false,
        'table': 'brand',
        'title': 'Brand',
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
        `SELECT CategoryId AS id, Name FROM category ORDER BY name ASC`
      );

      const preferredCategories = await client.query(
        `SELECT ProductId, CategoryId, UserId FROM productcategory`
      );

      const stores = await client.query(
        `SELECT StoreId AS id, Name FROM store ORDER BY name ASC`
      );

      const preferredStores = await client.query(
        `SELECT ProductId, StoreId, UserId FROM productstore`
      );

      const brands = await client.query(
        `SELECT BrandId AS id, Name FROM Brand ORDER BY name ASC`
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
        `SELECT ProductId AS id, Name FROM product ORDER BY id ASC`
      );

      const categories = await client.query(
        `SELECT CategoryId AS id, Name FROM category ORDER BY id ASC`
      );

      const stores = await client.query(
        `SELECT StoreId AS id, Name FROM store ORDER BY id ASC`
      );

      const brands = await client.query(
        `SELECT BrandId AS id, Name FROM Brand ORDER BY id ASC`
      );

      const locals = {
        'title': 'Add List Item',
        'list_id' : listId,
        'list_name' : listName,
        'products': (products) ? products.rows : null,
        'categories': (categories) ? categories.rows : null,
        'stores': (stores) ? stores.rows : null,
        'brands': (brands) ? brands.rows : null
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
  .post('/add', async(req, res) => {
		try {
      const client = await pool.connect();
			const groceryListName = req.body.grocery_list_name;
			const userId = req.body.user_id;
      	
			const sqlInsert = await client.query(
        `INSERT INTO grocery_list (Name, UserId)
        VALUES (${groceryListName}, ${userId})
        RETURNING id AS new_id;`);
			
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
  .post('/view/listitem/add', async(req, res) => {
		try {
			const client = await pool.connect();
      const listId = req.body.list_id;
      const productId = req.body.product_id;
      const categoryId = req.body.category_id;
      const storeId = req.body.store_id;
      const brandId = req.body.brand_id;
      const itemCount = req.body.item_count;
      
			const sqlInsert = await client.query(
        `INSERT INTO listitem (listid, productid, categoryid, brandid, itemcount)
        VALUES (${listId}, ${productId}, ${categoryId}, ${brandId}, ${itemCount})
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
  .post('/product/edit', async(req, res) => {
		try {
			const client = await pool.connect();
			const productId = req.body.item_id;
			const productName = req.body.item_name;
			const userId = req.body.user_id;
      	
      // TODO: add user id to where clause
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
  .post('/edit', async(req, res) => {
		try {
			const client = await pool.connect();
			const listId = req.body.item_id;
			const listName = req.body.item_name;
			const userId = req.body.user_id;
      	
      // TODO: add user id to where clause
			const sqlUpdate = await client.query(
        `UPDATE grocery_list SET Name = ${listName}
          WHERE id = ${listId};`);
			
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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
