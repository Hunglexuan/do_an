import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Product from './Product';
/**
 * Define Image Model
 * 
 * @export
 * @class Image
 * @extends {BaseModel}
 */
export default class Image extends BaseModel {

    static association() {
        Image.belongsTo(Product, { as: 'products', foreignKey: 'product_id' })
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
    link :{
        type: DataTypes.STRING(500),
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
    Image.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
 const options = {
    tableName: 'image',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
Image.init(attributes, { ...options, sequelize });