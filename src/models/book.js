const { connection } = require('../db/connection');

const mapRow = row => {
    return {
        id: row.id,
        name: row.name,
        image: row.image,
        author: {
            name: `${row.author_name} ${row.author_surname}`,
        },
        genre: row.genre,
        available: Boolean(row.available),
    };
};

const getAllBooks = async () => {
    // SQL (Structured Query Language)
    const sql = 
        `SELECT k.id, 
                k.ime AS name, 
                k.url_slike AS image, 
                a.ime AS author_name, 
                a.prezime AS author_surname, 
                k.na_stanju AS available, 
                z.ime AS genre
        FROM knjiga k LEFT JOIN autor a
        ON k.autor_id = a.id
        LEFT JOIN zanr_knjiga zk
        ON k.id = zk.knjiga_id
        LEFT JOIN zanr z
        ON zk.zanr_id = z.id;`;

    try {
        const [rows, fields] = await connection
            .promise()
            .execute(sql);

        if (rows.length === 0) {
            return [];
        }

        return rows.map(mapRow);
    } catch(err) {
        console.error(err);

        return [];
    }
};

const getSingleBook = async id => {
    const sql = 
        `SELECT k.id, 
                k.ime AS name, 
                k.url_slike AS image, 
                a.ime AS author_name, 
                a.prezime AS author_surname, 
                k.na_stanju AS available 
                z.ime AS genre
        FROM knjiga k LEFT JOIN autor a
        ON k.autor_id = a.id
        LEFT JOIN zanr_knjiga zk
        ON k.id = zk.knjiga_id
        LEFT JOIN zanr z
        ON zk.zanr_id = z.id
        WHERE k.id = ?`;

    try {
        const [rows, fields] = await connection
            .promise()
            .execute(
                sql,
                [id],
            );

        const row = rows.map(mapRow)[0];

        if (row === undefined || row === null) {
            return null;
        }

        return row;
    } catch(err) {
        console.error(err);

        return null;
    }
};

module.exports = {
    getAllBooks,
    getSingleBook,
};