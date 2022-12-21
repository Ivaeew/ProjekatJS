const { connection } = require('../db/connection');

const getAllAuthors = async () => {
    const sql = 
        `SELECT a.id,
                a.ime AS name,
                a.prezime AS surname
        FROM autor a;`;
    
    try {
        const [rows, fields] = await connection
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

const getSingleAuthor = async id => {
    const sql = 
        `SELECT a.id,
                a.ime AS name,
                a.prezime AS surname
        FROM autor a
        WHERE a.id = ?;`;

    try {
        const [rows, fields] = await connection
            .promise()
            .execute(sql, [id]);

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
    getAllAuthors,
    getSingleAuthor,
};