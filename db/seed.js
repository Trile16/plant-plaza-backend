const client = require("./index.js");

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
            DROP TABLE IF EXISTS order_plants;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS plants;
            DROP TABLE IF EXISTS users;
        `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error(error);
  }
};

const createTables = async () => {
  try {
    console.log("Starting to create tables...");

    await client.query(`
            CREATE TABLE plants(
                id SERIAL PRIMARY KEY,
                name VARCHAR(225) UNIQUE NOT NULL,
                description VARCHAR(225) NOT NULL,
                price INTEGER NOT NULL,
                category VARCHAR(225) UNIQUE NOT NULL
            );

            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                email VARCHAR(225) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );

            CREATE TABLE orders(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                total INTEGER NOT NULL,
                "isActive" BOOLEAN DEFAULT false
            );

            CREATE TABLE order_plants(
                id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders(id),
                "plantId" INTEGER REFERENCES plants(id),
                quantity INTEGER NOT NULL
            );
        `);

    console.log("Finished creating tables!");
  } catch (error) {
    console.error(error);
  }
};

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
  } catch (error) {
    console.error(error);
  }
};

const runSeed = async () => {
  await rebuildDB();

  client.end();
};

runSeed();
