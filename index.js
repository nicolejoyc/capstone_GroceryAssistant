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
        'grocery_list': (grocery_list) ? grocery_list.rows : null
      };
      res.render('pages/index', locals);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/category', async (req, res) => {
    try {
      const client = await pool.connect();

      const category = await client.query(
        `SELECT * FROM Category ORDER BY UserId ASC`
      );
      const locals = {
        'category': (category) ? category.rows : null
      };
      res.render('pages/category', locals);
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/store', async (req, res) => {
    try {
      

      
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/product', async (req, res) => {
    try {
      

      
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-list', async (req, res) => {
    try {
      

      
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/category/add', async (req, res) => {
    try {
      const client = await pool.connect();

      res.render('pages/addCategory');
      client.release();
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/store/add', async (req, res) => {
    try {
      

      
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/product/add', async (req, res) => {
    try {
      

      
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/grocery-list/add', async (req, res) => {
    try {
      

      
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .post('/log', async(req, res) => {
		try {
			const client = await pool.connect();
			const name = req.body.name;
			
			const sqlInsert = await client.query(
`INSERT INTO grocery_list (name)
VALUES (${name})
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
			


		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/product/add', async(req, res) => {
		try {
			


		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .post('/grocery-list/add', async(req, res) => {
		try {
			


		}
		catch (err) {
			console.error(err);
			res.send("Error: " + err);
		}
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
