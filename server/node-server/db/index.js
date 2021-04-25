const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: "password",
    user: "root",
    database: "sitepoint",
    host: "localhost",
    port: "3306",
});

let sitepointdb = {};

sitepointdb.all = () => {

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * from sitepoint.authors;`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });

};

module.exports = sitepointdb;
