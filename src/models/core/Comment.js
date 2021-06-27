import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Users from './Users';
import Product from './Product';

/**
 * Define Comment Model
 * 
 * @export
 * @class Comment
 * @extends {BaseModel}
 */
export default class Comment extends BaseModel {

    static association() {
         Comment.belongsTo(Users, { as: 'users', foreignKey: 'user_id' })
         Comment.belongsTo(Product, { as: 'product', foreignKey: 'product_id' })
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
        allowNull:true,
        defaultValue: null

    },
    product_id: {
        type: DataTypes.UUID,
        allowNull:true,
        defaultValue: null

    },
    content: {
        type: DataTypes.STRING(255),
        allowNull:true,
        defaultValue:null
    },
    cmt_id: {
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
    Comment.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'comment',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
Comment.init(attributes, { ...options, sequelize });
