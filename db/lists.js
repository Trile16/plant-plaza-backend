const client = require("./");

const createList = async ({ userId }) => {
  try {
    const { rows: list } = await client.query(
      `
        INSERT INTO lists("userId")
        VALUES ($1);
        `,
      [userId]
    );

    return list;
  } catch (error) {
    console.error(error);
  }
};

const getLists = async () => {
  try {
    const { rows: lists } = await client.query(`
            SELECT * FROM lists;
        `);

    return lists;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createList, getLists };
