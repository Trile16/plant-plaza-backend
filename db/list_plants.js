const client = require("./");

const addPlantToList = async ({ listId, plantId }) => {
  try {
    const { rows: list_plant } = await client.query(
      `
        INSERT INTO list_plants("listId", "plantId")
        VALUES ($1, $2)
        RETURNING *;
        `,
      [listId, plantId]
    );

    return list_plant;
  } catch (error) {
    console.error(error);
  }
};

const getListPlantById = async (id) => {
  try {
    const {
      rows: [list_plant],
    } = await client.query(
      `
            SELECT * FROM list_plants
            WHERE list_plants.id = $1;
        `,
      [id]
    );

    return list_plant;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addPlantToList, getListPlantById };
