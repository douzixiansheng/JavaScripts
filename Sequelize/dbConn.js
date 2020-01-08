let Sequelize = require('sequelize');

//数据库配置文件
let sqConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gametool'
};

let sequelize = new Sequelize(sqConfig.database, sqConfig.user, sqConfig.password, {
    host: sqConfig.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;

module.exports.defineModel = function (name, attributes) {
    let attrs = [];
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }
        else {
            attrs[key] = {
                type: value
            }
        }
    }

    attrs.version = {
        type: Sequelize.BIGINT
    };

    attrs.createUser = {
        type: Sequelize.STRING,
        allowNull: false
    };

    attrs.updateUser = {
        type: Sequelize.STRING,
        allowNull: false
    };

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        hooks: {
            beforeBulkCreate: function (obj) {
                obj.version = 0;
            },
            beforeValidate: function (obj) {
                if (obj.isNewRecord) {
                    console.log('first');
                    obj.version = 0;
                }
                else {
                    console.log('not first');
                    obj.version = obj.version + 1;
                }
            }
        }
    });
};