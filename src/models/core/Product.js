import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Users from './Users';
/**
 * Define Role Model
 * 
 * @export
 * @class Product
 * @extends {BaseModel}
 */
export default class Product extends BaseModel {

    static association() {
        Product.belongsTo(Users, { as: 'users', foreignKey: 'user_id' })
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
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },

    quantity: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    unit_price: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue:null
    },
    time_from:{
        type: DataTypes.INTEGER(10),
        allowNull:true,
        defaultValue:null
    },
    time_to:{
        type: DataTypes.INTEGER(10),
        allowNull:true,
        defaultValue:null
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull:true,
        defaultValue: null

    },
    sale: {
        type: DataTypes.INTEGER(10),
        allowNull:true,
        defaultValue:null
    },
    sale_from: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    sale_to: {
        type: DataTypes.DATE,
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
    Product.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'product',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
Product.init(attributes, { ...options, sequelize });