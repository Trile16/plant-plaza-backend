const client = require("./index.js");
const { createPlant, getPlants } = require("./plants.js");
const { createUser, getUsers } = require("./users.js");
const { createList, getLists } = require("./lists.js");
const { addPlantToList, getListPlantById } = require("./list_plants.js");

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
            DROP TABLE IF EXISTS list_plants;
            DROP TABLE IF EXISTS lists;
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
                category VARCHAR(225) NOT NULL
            );

            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                "firstName" VARCHAR(225) NOT NULL,
                "lastName" VARCHAR(225) NOT NULL,
                email VARCHAR(225) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT false
            );

            CREATE TABLE lists(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id)
            );

            CREATE TABLE list_plants(
                id SERIAL PRIMARY KEY,
                "listId" INTEGER REFERENCES lists(id),
                "plantId" INTEGER REFERENCES plants(id),
                UNIQUE ("listId", "plantId")
            );
        `);

    console.log("Finished creating tables!");
  } catch (error) {
    console.error(error);
  }
};

const createPlantsData = async () => {
  try {
    console.log("Inserting plants data...");
    const plantsData = [
      {
        name: "Monstera",
        description: "Beautiful plant!",
        price: 100,
        category: "Plant",
      },
      {
        name: "Golden pothos",
        description: "Beautiful plant!",
        price: 30,
        category: "Plant",
      },
      {
        name: "Snake Plant",
        description: "Beautiful plant!",
        price: 100,
        category: "Botanical",
      },
    ];

    for (const plant of plantsData) {
      await createPlant(plant);
    }

    console.log("Inserted plants data!");
  } catch (error) {
    console.error(error);
  }
};

const createUsersData = async () => {
  try {
    console.log("Inserting users data...");

    const usersData = [
      {
        firstName: "Tri",
        lastName: "Le",
        email: "trimail@trimail.com",
        password: "plantplaza",
        isAdmin: true,
      },
    ];

    for (const user of usersData) {
      await createUser(user);
    }

    console.log("Finished users data!");
  } catch (error) {
    console.error(error);
  }
};

const createListsData = async () => {
  try {
    console.log("Inserting lists data...");

    const listsData = [
      {
        userId: 1,
        test: 100,
      },
    ];

    for (const list of listsData) {
      await createList(list);
    }

    console.log("Finished lists data!");
  } catch (error) {
    console.error(error);
  }
};

const createListPlantsData = async () => {
  try {
    console.log("Inserting list plants data...");

    const listPlantsData = [
      {
        listId: 1,
        plantId: 1,
      },
      {
        listId: 1,
        plantId: 2,
      },
      {
        listId: 1,
        plantId: 3,
      },
    ];

    for (const listPlant of listPlantsData) {
      await addPlantToList(listPlant);
    }

    console.log("Finished list plants data!");
  } catch (error) {
    console.error(error);
  }
};

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createPlantsData();
    await createUsersData();
    await createListsData();
    await createListPlantsData();
  } catch (error) {
    console.error(error);
  }
};

const testDB = async () => {
  try {
    console.log("Checking for plants...");

    const plants = await getPlants();

    console.log("Plants: ", plants);

    console.log("Checking for users...");

    const users = await getUsers();

    console.log("Users: ", users);

    console.log("Checking for lists...");

    const lists = await getLists();

    console.log("Lists: ", lists);

    console.log("Checking for list_plants...");

    const listPlant1 = await getListPlantById(1);
    const listPlant2 = await getListPlantById(2);
    const listPlant3 = await getListPlantById(3);

    console.log("List_plants: ", [listPlant1, listPlant2, listPlant3]);
  } catch (error) {
    console.error(error);
  }
};

const runSeed = async () => {
  await rebuildDB();
  await testDB();

  client.end();
};

runSeed();
