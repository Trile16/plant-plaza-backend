const client = require("./");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({
  firstName,
  lastName,
  username,
  password,
  isAdmin = false,
}) => {
  console.log(firstName, "FIRST NAME");
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    console.log(hashedPassword, "FIRST NAME");
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users("firstName", "lastName", username, password, "isAdmin")
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;`,
      [firstName, lastName, username, hashedPassword, isAdmin]
    );

    delete user.hashedPassword;

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

const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE username=$1;
    `,
      [username]
    );

    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createUser, getUsers, getUserByUsername };
