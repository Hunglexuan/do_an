import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Product from './Product';
/**
 * Define Role Model
 * 
 * @export
 * @class BillProduct
 * @extends {BaseModel}
 */
 export default class BillProduct extends BaseModel {

    static association() {
        BillProduct.belongsTo(Product, { as: 'products', foreignKey: 'product_id' })
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
    total_price: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null
    },
    
    del: {  // 0: Not delete , 1: delete
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
    BillProduct.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'billproduct',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
BillProduct.init(attributes, { ...options, sequelize });