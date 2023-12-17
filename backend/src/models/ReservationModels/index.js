const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");
const {UserModels} = require("../UserModels");
const {NumbersModels} = require("../NumbersModels");

const ReservationModels = sequelize.define('reservation', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    count:{type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
    sum:{type: DataTypes.STRING, allowNull: false},
    startDate:{type: DataTypes.TEXT, allowNull: false},
    endDates:{type: DataTypes.TEXT, allowNull: false},
    pinCode:{type: DataTypes.STRING, allowNull: false},
    status:{type: DataTypes.BOOLEAN, defaultValue: false},
    payStatus:{type: DataTypes.BOOLEAN, defaultValue: false},
    userId: {type: DataTypes.BIGINT, defaultValue: null},
    numberId: {type: DataTypes.BIGINT, defaultValue: null},
})
NumbersModels.hasMany(ReservationModels, {as: "reservation"});
ReservationModels.belongsTo(NumbersModels, {as: 'number'});
UserModels.hasMany(ReservationModels, {as: "reservation"});
ReservationModels.belongsTo(UserModels, {as: 'user'});

module.exports = {ReservationModels}