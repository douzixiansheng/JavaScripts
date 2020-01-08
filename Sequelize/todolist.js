let Sequelize = require('sequelize');
let sequelize = require('./dbConn');

/**
 * sequelize 是通过 define 方法建立模型的,Model相当于数据库中的表，该对象
 * 不能通过构造函数实例化，而只能通过sequelize.define()方法创建
 * sequelize.define()
 * 第一个参数为表名称
 * 第二个参数为所需要创建的数据库字段
 * 第三个参数是相关表的配置
 */
let todolist = sequelize.define('todolist', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    title: Sequelize.STRING(100),
    content: Sequelize.STRING(500),
    priority: Sequelize.INTEGER,
    owner: Sequelize.STRING,
    officer: Sequelize.STRING,
    startDate: Sequelize.STRING,
    planFinishDate: Sequelize.STRING,
    realFinishDate: Sequelize.STRING,
    bz: Sequelize.STRING(500),
    state: Sequelize.INTEGER,
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    createUser: Sequelize.STRING,
    updateUser: Sequelize.STRING,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully');
}).catch(err => {
    console.log('Unable to connect to the database ', err);
});

module.exports = todolist;