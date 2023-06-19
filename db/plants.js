const client = require("./");

const createPlant = async ({ name, description, category, imageURL }) => {
  try {
    const { rows: plant } = await client.query(
      `INSERT INTO plants(name, description, category, "imageURL")
        VALUES ($1, $2, $3, $4);
        `,
      [name, description, category, imageURL]
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

    if (!plant) {
      return null;
    }

    return plant;
  } catch (error) {
    console.error(error);
  }
};
module.exports = { createPlant, getPlants, getPlantById };
