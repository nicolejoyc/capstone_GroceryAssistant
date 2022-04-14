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
  name TEXT NOT NULL
);

-- INSERT INTO grocery_list (name) VALUES
--   ('Brian''s Grocery List'),
--   ('Nicole''s Grocery List'),
--   ('Richard''s Grocery List'),
--   ('Samantha''s Grocery List');

-- INSERT INTO grocery_list (name) VALUES
--  ('My Grocery List');