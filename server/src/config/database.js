/* eslint no-console: 0 */
const envConfig = process.env;

const dbConfig = {
    username: envConfig.NODE_APP_DB_USER,
    password: envConfig.NODE_APP_DB_PASS,
    database: envConfig.NODE_APP_DB_DATABASE,
    host: envConfig.NODE_APP_DB_HOST,
    dialect: envConfig.NODE_APP_DB_DIALECT,
    url: envConfig.NODE_APP_DB_URL,
    logging: envConfig.NODE_ENV === 'production' ? false : console.log,
    freezeTableName: true,
    operatorsAliases: true,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};

module.exports = dbConfig;
