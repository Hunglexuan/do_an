import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Bill from './Bill';
import BillProduct from './BillProduct';
import Users from './Users';
/**
 * Define BillTemp Model
 * 
 * @export
 * @class BillTemp
 * @extends {BaseModel}
 */
 export default class UserBill extends BaseModel {

    static association() {
        UserBill.belongsTo(Bill, { as: 'bill', foreignKey: 'bill_id' }),
        UserBill.belongsTo(Users, { as: 'users', foreignKey: 'user_id' })
    }
}
/**
 * Attributes model
 */
const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    bill_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null
    },

    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        default: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },


};
function beforeCreate() {
    UserBill.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'UserBill',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
 UserBill.init(attributes, { ...options, sequelize });