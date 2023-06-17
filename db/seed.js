const client = require("./index.js");
const { createPlant, getPlants } = require("./plants.js");
const { createUser, getUsers } = require("./users.js");
const { addPlantToUser, getUserPlantsByUserId } = require("./user_plants.js");

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
            DROP TABLE IF EXISTS list_plants;
            DROP TABLE IF EXISTS user_plants;
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
                category VARCHAR(225) NOT NULL
            );

            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                "firstName" VARCHAR(225) NOT NULL,
                "lastName" VARCHAR(225) NOT NULL,
                username VARCHAR(225) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT false
            );

            CREATE TABLE user_plants(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                "plantId" INTEGER REFERENCES plants(id),
                UNIQUE ("userId", "plantId")
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
        category: "Plant",
      },
      {
        name: "Golden pothos",
        description: "Beautiful plant!",
        category: "Plant",
      },
      {
        name: "Snake Plant",
        description: "Beautiful plant!",
        category: "Botanical",
      },
      {
        name: "Money Tree",
        description: "Beautiful plant!",
        category: "Botanical",
      },
      {
        name: "Bob plant",
        description: "Beautiful plant!",
        category: "Botanical",
      },
      {
        name: "Joe Plant",
        description: "Beautiful plant!",
        category: "Botanical",
      },
      {
        name: "Tree Plant",
        description: "Beautiful plant!",
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
        username: "trimail@trimail.com",
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

const createUserPlantsData = async () => {
  try {
    console.log("Inserting list plants data...");

    const userPlantsData = [
      {
        userId: 1,
        plantId: 1,
      },
      {
        userId: 1,
        plantId: 2,
      },
      {
        userId: 1,
        plantId: 3,
      },
    ];

    for (const userPlant of userPlantsData) {
      await addPlantToUser(userPlant);
    }

    console.log("Finished user plants data!");
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
    await createUserPlantsData();
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

    console.log("Checking for user plants...");

    const userPlant = await getUserPlantsByUserId(1);

    console.log("User plants: ", userPlant);
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
