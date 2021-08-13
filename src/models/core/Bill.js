import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import { sequelize } from '../../connections';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Voucher } from './';


/**
 * Define Bill Model
 * 
 * @export
 * @class Bill
 * @extends {BaseModel}
 */
 export default class Bill extends BaseModel {

    static association() {
        Bill.belongsTo(Voucher, { as: 'voucher', foreignKey: 'voucher_id' })
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
    total_price: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue:null
    },
    voucher_id: {
        type: DataTypes.UUID,
        allowNull:true,
        defaultValue:null
    },
    status: { // 0 : đang gửi , 1 : chấp nhận , 2 : hủy đơn ; '' : lưu đơn tạm
        type: DataTypes.TINYINT(1),
        allowNull:true,
        defaultValue:null
    },
    address: {
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
    Bill.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

/**
 * Options model
 */
const options = {
    tableName: 'bill',
    beforeCreate: beforeCreate
};

/**
 * Init Model
 */
Bill.init(attributes, { ...options, sequelize });