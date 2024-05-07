const db = require("../database/db");
const sequelize = require("sequelize");

const customerModel = db.define(
    'customer_table',
    {
        customerId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: sequelize.STRING(50),
            allowNull: false
        },
        lastName: {
            type: sequelize.STRING(50),
            allowNull: false
        },
        address: {
            type: sequelize.STRING(200),
            allowNull: false
        },
        email: {
            type: sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        state: {
            type: sequelize.STRING(50),
            allowNull: false
        },
        plan: {
            type: sequelize.ENUM("Gold","Silver","Bronze"),
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = customerModel;

// create table customer_table(

// 	customerId  int primary key not null auto_increment,
// 	firstName varchar(50) not null,
// 	lastName varchar(50) not null,
//  address varchar(200) not null,
// 	email varchar(100) unique not null,
//  state varchar(50) not null,
// 	plan enum("Gold","Silver","Bronze") not null
// )auto_increment=100;