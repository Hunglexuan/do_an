import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './';
/**
 * Define Users Model
 *
 * @export
 * @class Users
 * @extends {BaseModel}
 */
export default class Users extends BaseModel {

    static association() {
        Users.belongsTo(Role, { as: 'roles', foreignKey: 'role_id' })
    };
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
    password: {
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
    role_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null

    },

    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null

    },
    bill_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null


    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null


    },
    shop_name: {

        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    product_id: {
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
    Users.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'users',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
Users.init(attributes, {...options, sequelize });