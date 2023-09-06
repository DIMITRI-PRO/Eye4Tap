# MVC Express

## Description

This repository is a simple MVC Express structure created from scratch.

## Steps

1. Clone this repository from GitHub.

2. Run `npm install` or `yarn install` to install the necessary dependencies.

3. Create a `.env` file by copying the content from the `.env.sample` file and add your database parameters. Make sure not to delete the `.env.sample` file as it should be kept.

   Example content for `.env`:

   ```plaintext
   APP_PORT=5000
   FRONTEND_URL=http://localhost:3000
   DB_HOST=YOUR_DB_HOST
   DB_PORT=YOUR_DB_PORT
   DB_USER=YOUR_DB_USER
   DB_PASSWORD=YOUR_DB_PASSWORD
   DB_NAME=YOUR_DB_NAME
   NAME_COOKIE=YOUR_NAME_COOKIE
   JWT_SECRET=YOUR_JWT_SECRET
   EXPIRE_TIME=86400
   ACTIVE_TOKEN=true
   ```

4. Customize the `_database.sql` file with your own tables. You can import the script into your SQL server either manually or by running the `npm run migrate` or `yarn run migrate` command.

5. Start the server in development mode with `npm run dev` or `yarn run dev`. This will run the `index.js` file using _nodemon_.

6. Access `localhost:5000` in your preferred browser.

7. From this starter kit, you can create your own web application.

### Windows Users

If you are developing on Windows, we recommend configuring Git to change your line ending rules with the following command:

```
git config --global core.autocrlf true
```

## Model

Here is an example of a model. It uses classes and methods to define queries and the database connection. The model file is located in `src/models/AbstractManager.js`. Each model folder should be organized as follows:

1. The folder name should match the name of the extended class and be in plural form (e.g., "Items").

2. In this folder, create an `index.js` file.

3. Import the Joi package for schemas and validations.

4. Specify the schema and table in the constructor.

### Example

Path: `src/models/Items/index.js`

```javascript
import Joi from "joi";
import AbstractManager from "../AbstractManager.js";

class Items extends AbstractManager {
  constructor() {
    super({
      table: "items",
      schema: Joi.object({
        name: Joi.string().max(45).required(),
        description: Joi.string().max(45).required(),
      }),
    });
  }
}

export default new Items();
```

## Controllers (continued)

3. Import the model and other functions.

4. The file export should be done in the following way (!! Important !! declare name + Controllers).

### Example

Path: `src/models/Items/index.js`

```javascript
import models from "../../models/index.js";

const { Items } = models;
const { validateSchema } = Items;

// ... rest of the code

const itemsControllers = (router) => {
  router.route("/").get(getItems).post(validateSchema, postItem);
  router.route("/:id").get(getItem).put(updateItem).delete(deleteItem);

  return router;
};

export default { itemsControllers };
```

## Basic Methods

In this section, we will describe the main methods of the `AbstractManager` class that allow you to handle CRUD operations on a database table.

### `insert(body)`

- This method allows you to insert a new row into the database table.
- It takes an `body` object containing the data to insert as a parameter.
- The method formats the insertion query and corresponding values from the `body` object.
- The SQL query is then executed to perform the insertion.

### `find({ selector = "", by = null, options = null })`

- This method allows you to search for data in the database table.
- It accepts three optional parameters:
  - `selector`: specifies the columns to select in the query (defaults to selecting all columns).
  - `by`: specifies the search criteria to filter the results (e.g., `{ id: 1 }`).
  - `options`: allows you to define advanced search options, such as pagination or sorting.
- The method formats the search query based on the provided parameters and executes the corresponding SQL query.
- It returns the corresponding data along with information about the total number of results.

### `update(body)`

- This method allows you to update existing data in the database table.
- It takes an `body` object containing the data to update, including the ID of the row to modify, as a parameter.
- The method formats the update query and corresponding values from the `body` object.
- The SQL query is then executed to perform the update.

### `delete(id)`

- This method allows you to delete a row from the database table by specifying its ID.
- It takes the ID of the row to delete as a parameter.
- The method formats the delete query and executes the corresponding SQL query.

### `validateSchema(req, res, next)`

- This method is used as middleware to validate data before inserting or updating it.
- It takes the `req` and `res` objects of the HTTP request and the `next` function to move to the next middleware.
- The method uses a validation schema to check if the data is valid.
- In case of validation errors, it sends a response with error details. Otherwise, it calls the `next` function to continue handling the request.

### `setConnection(connection)`

- This method allows you to set the database connection to be used for class operations.
- It takes an object `connection` representing the database connection as a parameter.
