import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Users from './Users';
/**
 * Define Report Model
 * 
 * @export
 * @class Report
 * @extends {BaseModel}
 */
export default class Report extends BaseModel {

    static association() {
        Report.belongsTo(Users, { as: 'users', foreignKey: 'user_id' })
        
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
    type_report: {
        type: DataTypes.STRING(255),
        allowNull:true,
        defaultValue:null
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull:true,
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
    Report.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'report',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
Report.init(attributes, { ...options, sequelize });