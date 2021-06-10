import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Users from './Users';
/**
 * Define Feedback Model
 * 
 * @export
 * @class Feedback
 * @extends {BaseModel}
 */
export default class Feedback extends BaseModel {

    static association() {
        Feedback.belongsTo(Users, { as: 'users', foreignKey: 'user_id' })
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
    user_id: {
        type: DataTypes.UUID,
        allowNull:true
    },
    shop_id: {
        type: DataTypes.UUID,
        allowNull:true
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull:true,
        defaultValue:null
    },
    rate: {
        type: DataTypes.TINYINT(1),
        allowNull:true,
        defaultValue:null
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
    Feedback.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'feedback',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
Feedback.init(attributes, { ...options, sequelize });