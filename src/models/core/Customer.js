import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

/**
 * Define Customer Model
 * 
 * @export
 * @class Customer
 * @extends {BaseModel}
 */
export default class Customer extends BaseModel {

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
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null

    },
    company_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null

    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },

    type: {  // 0: Pc , 1: Mobile
        type: DataTypes.TINYINT(1),
        allowNull: true,
        default: 0
    },

    seen: {  // 0: Not seen , 1: Seen
        type: DataTypes.TINYINT(1),
        allowNull: true,
        default: 0
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
    Customer.beforeCreate((orgran, _) => {
        return orgran.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'customer',
    hooks: {
        beforeCreate: beforeCreate
    }
};

/**
 * Init Model
 */
Customer.init(attributes, { ...options, sequelize });