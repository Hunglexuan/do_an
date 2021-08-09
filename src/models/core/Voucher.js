import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
/**
 * Define Voucher Model
 * 
 * @export
 * @class Voucher
 * @extends {BaseModel}
 */
 export default class Voucher extends BaseModel {

    static association() {
      
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
    code: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue:null
    },
    discount_number: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue:null

    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue:null
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
    Voucher.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'voucher',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
Voucher.init(attributes, { ...options, sequelize });