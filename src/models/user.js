const { connection } = require('../db/connection');
const bcrypt = require('bcrypt');

// Register a user
const registerUser = async (username, password) => {
  const existQuery =
    `SELECT id, korisnicko_ime
     FROM korisnik
     WHERE korisnicko_ime = ?
     LIMIT 1;`;

  try {
    let [rows, fields] = await connection
      .promise()
      .execute(existQuery, [username]);

    if (rows.length !== 0) {
      return null;
    }

    // Salted hashing
    const hash = await bcrypt.hash(password, 10);

    const insertQuery = 
      `INSERT INTO korisnik (korisnicko_ime, sifra)
       VALUES (?, ?);`;

    [rows, fields] = await connection
      .promise()
      .execute(insertQuery, [username, hash])

    return rows;
  } catch (err) {
    console.error(err);

    return null;
  }
};

const loginUser = async (username, password) => {
  const sql = 
    `SELECT id, korisnicko_ime AS username, sifra AS password
     FROM korisnik
     WHERE korisnicko_ime = ?
     LIMIT 1`;

     try {
      const [rows, fields] = await connection
        .promise()
        .execute(sql, [username]);

      if (rows.length === 0) {
        return false;
      }

      const user = rows[0];

      if (!(await bcrypt.compare(password, user.password))) {
        return false;
      }

      return true;
     } catch (err) {
      console.error(err);

      return false;
     }
};

module.exports = {
  registerUser,
  loginUser,
};