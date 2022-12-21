const { connection } = require('../db/connection');

const getAllGenres = async () => {
  const sql = 
    `SELECT z.id,
            z.ime AS name
     FROM zanr z;`;

  try {
    const [rows, fields] =  await connection
      .promise()
      .execute(sql);

    if (rows.length === 0) {
      return [];
    }

    return rows;
  } catch(err) {
    console.error(err);

    return [];
  }
};

const getSingleGenre = async id => {
  const sql = 
    `SELECT z.id,
            z.ime AS name
     FROM zanr z
     WHERE id = ?;`;

  try {
    const [rows, fields] =  await connection
      .promise()
      .execute(
        sql,
        [id],
      );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch(err) {
    console.error(err);

    return null;
  }
};

module.exports = {
  getAllGenres,
  getSingleGenre,
};