import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Bill from './Bill';
import BillProduct from './BillProduct';
/**
 * Define BillTemp Model
 * 
 * @export
 * @class BillTemp
 * @extends {BaseModel}
 */
 export default class BillTemp extends BaseModel {

    static association() {
        BillTemp.belongsTo(Bill, { as: 'bill', foreignKey: 'bill_id' }),
        BillTemp.belongsTo(BillProduct, { as: 'bill_product', foreignKey: 'bill_product_id' })
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
    bill_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null
    },
    bill_product_id: {
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
    BillTemp.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'billtemp',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
BillTemp.init(attributes, { ...options, sequelize });