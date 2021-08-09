import {
    Role, Users, Bill, UserBill, Voucher, BillProduct, Product
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import database, { password } from '../../config/database';
import { name } from 'ejs';

class MidBill {
    // async listCart(data) {
    //     let cart = {
    //         shopID: '',
    //         userID: data.userID,
    //         billID: '',
    //         status: '',
    //         address: '',
    //         voucherCode: '',
    //         listCart: [],
    //     }
    //     let billList = await UserBill.findAll({
    //         where: {
    //             user_id: data.userID,
    //             del: 0
    //         }
    //     })
    //     for (let i = 0; i < billList.length; i++) {
    //         let billTemp = Bill.findOne({
    //             where: {
    //                 id: billList[i].bill_id,
    //                 status: '',
    //                 del: 0
    //             }
    //         })
    //         if (billTemp) {
    //             listTemp = BillProduct.findAll({
    //                 where: {
    //                     bill_id: billTemp,
    //                     del: 0
    //                 }
    //             })  
    //             if(listTemp){
    //                 cart.listCart = Product.
    //                 for (let j = 0; j < listTemp.length; j++) {

    //                 }
    //             }
    //         }
    //         else {
    //             return {}
    //         }
    //     }



    // }
    async createBill(data) {
        let totalPrice = 0;
        let voucher
        // if(billID){

        // }
        // else{

        // }
        // console.log(data.cart.listCart);
        // console.log(data);
        console.log("object", data);
        for (let i = 0; i < data.cart.listCart.length; i++) {
            totalPrice += data.cart.listCart[i].price * data.cart.listCart[i].count
        }

        if (data.cart.voucherCode != '') {
            voucher = await Voucher.findOne({
                where: {
                    code: data.cart.voucherCode,
                    del: 0
                }
            })
            totalPrice -= voucher.discount_number
        }
        else {
            voucher = ''
        }
        let status = data.cart.status;
        if (!data.cart.address) {
            throw new Error("Chưa nhập địa chỉ ship");
        }
        let address = data.cart.address;
        let billCreate = {
            total_price: totalPrice,
            status: status,
            address: address,
        }
        let bill = await Bill.create(billCreate);
        for (let i = 0; i < data.cart.listCart.length; i++) {
            totalPrice += data.cart.listCart[i].price * data.cart.listCart[i].count
            let billProduct = {
                quantity: data.cart.listCart[i].count,
                unit_price: data.cart.listCart[i].price,
                total_price: data.cart.listCart[i].count * data.cart.listCart[i].price,
                product_id: data.cart.listCart[i].id,
                bill_id: bill.dataValues.id,
            }
            await BillProduct.create(billProduct)
        }
        let userBill = {
            bill_id: bill.dataValues.id,
            user_id: data.cart.userID,
            shop_id: data.cart.shopID,
        }
        await UserBill.create(userBill);
    }
    async deleteBill(data) {
        let objDelete = await Bill.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        let dataDelete = {
            del: 1,
        }

        objDelete.update(dataDelete)
    }
    async updateBill(data) {
        if (!data.id) {
            throw new Error(ERROR_MESSAGE.BILL.BILL_NOT_EXIST);
        }
        let objUpdate = await Bill.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })

        let dataUpdate = {
            quantity: data.quantity,
            total_price: data.total_price,
            voucher_id: data.voucher_id,
            status: data.status,
        }
        return await objUpdate.update(dataUpdate)

    }

}


export default new MidBill()