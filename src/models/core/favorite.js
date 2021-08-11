import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Bill from './Bill';
import BillProduct from './BillProduct';
import Users from './Users';
import Product from './Product';
/**
 * Define Favorite Model
 * 
 * @export
 * @class Favorite
 * @extends {BaseModel}
 */
 export default class Favorite extends BaseModel {

    static association() {
        Favorite.belongsTo(Product, { as: 'product', foreignKey: 'product_id' }),
        Favorite.belongsTo(Users, { as: 'users', foreignKey: 'user_id' })
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
    product_id: {
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
    Favorite.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'Favorite',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
 Favorite.init(attributes, { ...options, sequelize });