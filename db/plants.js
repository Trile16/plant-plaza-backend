const client = require("./");

const createPlant = async ({ name, description, price, category }) => {
  try {
    const { rows: plant } = await client.query(
      `INSERT INTO plants(name, description, price, category)
        VALUES ($1, $2, $3, $4);
        `,
      [name, description, price, category]
    );

    return plant;
  } catch (error) {
    console.error(error);
  }
};

const getPlants = async () => {
  try {
    const { rows: plants } = await client.query(`
            SELECT * FROM plants;
        `);

    return plants;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createPlant, getPlants };
