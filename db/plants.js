const client = require("./");

const createPlant = async ({ name, description, category }) => {
  try {
    const { rows: plant } = await client.query(
      `INSERT INTO plants(name, description, category)
        VALUES ($1, $2, $3);
        `,
      [name, description, category]
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

const getPlantById = async (id) => {
  try {
    const {
      rows: [plant],
    } = await client.query(
      `
      SELECT * FROM plants
      WHERE id=$1;
    `,
      [id]
    );

    return plant;
  } catch (error) {
    console.error(error);
  }
};
module.exports = { createPlant, getPlants, getPlantById };
