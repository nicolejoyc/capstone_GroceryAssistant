## Version 0.0.0 Release Notes
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
>
# Releases
## Version 0.1.0 Release Notes
>
> With this release the user can add products, lists, brands, categories, and stores to the database.
>
> The user cannot yet edit or delete from the database.
>
> User interface implented to be worked on in the upcoming releases. (Editing, deleting, and search).
>
> Project designed in a way that code can be used for several different pages.
>
> User can access a homepage with their lists or they can redirect to the data-manager page to manage the database.
>
> 
## Version 0.2.0 Release Notes
>
>With this release the user can enter into the list and add a list item to the user's list.
>
>This release add design changes to support mobile devices. Icon additions make for easy navigation.
>
>Users can set product preferences such as a user could set dairy for the preferred category for milk.
>
>Allow users to interact by clicking on one or multiple items with new icons added.
>
>Bug fix: ' are now allowed in data entry.
>
>Improved color theme.
>
>Editing capabilities are being implemented, currently available for everything except stores and list items.
>
>New data entry validation added.
>
>
## Version 0.3.0 Release Notes
>
> Multiple bugs were resolved: user interaction, interface inconsistency, not yet implemented features.
>
> Users can delete lists, categories, products, brands, or stores.
>
> Ability to use the search bar: allows a user to search through long lists of items to ease user experience.
>
> Addition of sorting options in a grocery list: user can open the sort toolbar, and choose to sort by product name or category name, so that items in the same category can be closer together on the list, making it easier when shopping.
>
> New ability to view/edit/delete grocery list items.
>
> Users can edit all other items such as list names, categories, products, stores, or brands.
>
>## Version 0.4.0 Release Notes
> Users can now sort list by product, category, and urgency.
>
> Users can can choose to hide or mark as purchased their product items.
>
> Users can view product details with a new expandable button feature.
>
> New design with an about us, introduces our team to the user.
>
> CSS rendering errors should all be resolved.
> 
> Inconvient pop-ups removed.
> 
> Adding an item using preferred products, categories, and brands.
>
> New logo and footer added.
>
> Search no longer does "starts with matching exclusively"
>
> User can create lists filtered by store and or category even basing it off another list.
>
> Retaining a scroll position on grocery list
>
> Users will be informed when there are no items in a list.
>


