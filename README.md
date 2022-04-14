# About Grocery Assistant
>  
>
> In general, most people who shop at stores bring a grocery list with them that they wrote out beforehand. More specifically, some of our potential customers include people that are organized shoppers, shoppers who want to track their shopping habits, and shoppers who commonly buy the same items from a certain store. The reason these people are our targeted customers is because we will make an easier way to help shoppers organize their shopping, so it is a quicker and easier shopping process for them. Also, our site can be used for forgetful people who need help remembering certain or multiple products they might need while they are shopping. Finally, one of the last reasons is that our site will be able to separate shopping by what you prefer to purchase at a given store, instead of having a general list. 
>   
> The Grocery Assistant is a website based list creation and organization system. Just like an online personal assistant, The Grocery Assistant focuses on helping you remember everything on your list and get in only one trip to the store. The Grocery Assistant, allows you to group your lists by store and then organize items alphabetically, by category, or even by aisle. A purchase history feature gives you the power to track how often you need to replenish your supply of a product.  
>
# Installation
## Install needed software:
>
> Install [node.js](https://nodejs.org)
> and [postgres](https://www.postgresql.org/)
>
> Create [heroku](https://signup.heroku.com/login) account
>
> Git clone project repository: git clone git@github.com:nicolejoyc/capstone_GroceryAssistant.git 
>
## Install Modules 
> npm install --save express
>
> npm install --save path 
>
> npm install --save pg 
>
> npm install --save ejs 
>
## Create Database
> Open the postgres CLI from inside the project directory: sql -h localhost 
>
> Load the project schema.sql file located in the support directory: \ir support/schema.sql
>
> Set DATABASE_URL enviroment variable as follows: export DATABASE_URL=postgres://username@localhost:port/grocery_assistant
>
## Run Heroku Local
> heroku local web
>
## Setup Heroku Remote
> heroku login 
>
> heroku create
>
> heroku addons:create heroku-postgresql:hobby-dev 
>
> git push heroku main 
>
> heroku pg:psql
>
> DROP TABLE grocery_list; 
> CREATE TABLE grocery_list (
> id SERIAL PRIMARY KEY,
> name TEXT NOT NULL
> );
>
> heroku open 

