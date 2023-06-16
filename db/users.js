const client = require("./");

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  isAdmin = false,
}) => {
  try {
    const { rows: user } = await client.query(
      `
        INSERT INTO users("firstName", "lastName", email, password, "isAdmin")
        VALUES ($1, $2, $3, $4, $5);`,
      [firstName, lastName, email, password, isAdmin]
    );

    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async () => {
  try {
    const { rows: users } = await client.query(`
    SELECT * FROM users;
  `);

    for (const user of users) {
      delete user.password;
    }

    return users;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createUser, getUsers };
