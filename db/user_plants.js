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

const removePlantFromUser = async (id) => {
  try {
    console.log(id, "ID!");
    const {
      rows: [plant],
    } = await client.query(
      `
      DELETE FROM user_plants
      WHERE id = $1
      RETURNING *;
    `,
      [id]
    );

    return plant;
  } catch (error) {
    console.error(error);
  }
};

const getUserPlantsByUserId = async (userId) => {
  try {
    const { rows: user_plants } = await client.query(
      `
            SELECT plants.* FROM plants
            JOIN user_plants
            ON plants.id = user_plants."plantId"
            JOIN users
            ON users.id = user_plants."userId"
            WHERE users.id=$1;
        `,
      [userId]
    );

    return user_plants;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addPlantToUser, removePlantFromUser, getUserPlantsByUserId };
