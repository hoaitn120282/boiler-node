import Sequelize, { Op } from "sequelize";
import config from "src/config/database";
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};
config.operatorsAliases = operatorsAliases;
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
// const dirModel = process.cwd() + '/src/database/models';
// const reqModels = require.context('./', true, /^\.\/models\/.*.js$/);
const reqModels = require.context(
    "../",
    true,
    /^\.\/modules\/v1\/.*\/models\/([\w]+\.js)$/
);
reqModels.keys().map(file => {
    const modelData = reqModels(file);
    const initModel = modelData.default || modelData;
    const model = initModel(sequelize, Sequelize);
    Object.assign(db, {
        [model.name]: model
    });
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
