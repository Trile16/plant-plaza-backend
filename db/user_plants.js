const client = require(".");

const addPlantToUser = async ({ userId, plantId }) => {
  try {
    const { rows: user_plant } = await client.query(
      `
        INSERT INTO user_plants("userId", "plantId")
        VALUES ($1, $2)
        RETURNING *;
        `,
      [userId, plantId]
    );

    return user_plant;
  } catch (error) {
    console.error(error);
  }
};

const getUserPlantById = async (id) => {
  try {
    const {
      rows: [user_plant],
    } = await client.query(
      `
            SELECT * FROM user_plants
            WHERE user_plants.id = $1;
        `,
      [id]
    );

    return user_plant;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addPlantToUser, getUserPlantById };
