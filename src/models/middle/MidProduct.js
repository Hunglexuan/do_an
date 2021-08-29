import {
    Role,
    Users,
    Product,
    BillProduct,
    Bill,
    Favorite
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken, checkToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';
import { name } from 'ejs';
import { sequelize } from "../../connections";


class MidProduct {

    async updateImage(data, logo) {
        if (!logo) {
            console.log('MidProduct-updateImage: ErrorCode-24');
            throw new Error('Vui lòng chọn ảnh');
        }
        let objUpdate = await Product.findOne({
            where: {
                id: data.id,
                del: 0,
            },
        });
        let dataUpdate = {
            image: logo,
        };
        objUpdate.update(dataUpdate);
    }

    async getProductById(id) {
        let product = await Product.findOne({
            where: {
                id: id,
                del: 0
            }
        })
        let user
        if (product) {
            console.log('MidProduct-getProductById: Success');
            user = await Users.findOne({
                where: {
                    id: product.user_id,
                    del: 0
                }
            })

        }
        return { product, user };
    }


    async searchSellerProduct(data) {
        let user = await Users.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        if (user) {
            console.log('MidProduct-searchSellerProduct: Success');
            let role = await Role.findOne({
                where: {
                    id: user.role_id,
                    del: 0
                }
            })
            if (role.name != 'seller') {
                throw new Error('K co seller');
            }
        }
        let condition = {
            del: 0,
            user_id: user.id
        }

        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }


        const [listProduct, total] = await Promise.all([
            Product.findAll({
                where: condition,
                order: [
                    [
                        "createdAt", "DESC"
                    ]
                ],
            }),
            Product.count({
                where: condition
            })
        ])

        return {
            listProduct,
            total: total || 0
        }

    }



    async searchAllProduct(data) {
        let condition = {
            del: 0,
        }

        if (data.name) {
            console.log('MidProduct-searchAllProduct: Success');
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }


        const [listProduct, total] = await Promise.all([
            Product.findAll({
                where: condition,
                order: [
                    [
                        "createdAt", "DESC"
                    ]
                ],

            }),
            Product.count({
                where: condition
            })
        ])


        for (let i = 0; i < listProduct.length; i++) {
            let userFavor = await Favorite.findOne({
                where: {
                    product_id: listProduct[i].id,
                    user_id: data.user_id,
                    del: 0
                }
            })
            if (userFavor) {
                let temp = {

                    favorite: true
                }
                Object.assign(listProduct[i].dataValues, temp);
            }
            let user = await Users.findOne({
                where: {
                    id: listProduct[i].user_id,
                    del: 0
                }
            })
            if (user) {
                let temp = {

                    shop_name: user.dataValues.name
                }
                Object.assign(listProduct[i].dataValues, temp);
            }
        }

        return {
            listProduct,
            total: total || 0
        }

    }


    async listDefault(data) {
        let condition = {
            del: 0
        }
        //tra ra 6 san pham moi nhat
        return Product.findAll({
            where: condition,
            order: [
                [
                    "createdAt", "DESC"
                ]
            ],
            limit: 6
        })

    }
    async listMostBuy(data) {
        let condition = {
            del: 0
        }
        //tra ra 6 san pham duoc ng dung mua nhieu
        return Product.findAll({
            where: condition,
            attributes: [
                'id', 'quantity', 'unit_price', 'name', 'image', 'description', 'time_from', 'time_to', 'user_id', 'sale', 'sale_to', 'sale_from', [sequelize.literal('(SELECT COUNT(*) FROM doan.billproduct WHERE doan.billproduct.product_id = product.id)'), 'BoughtCount']
            ],
            order: [
                [sequelize.literal('BoughtCount'), 'DESC']
            ],
            limit: 6
        })

    }
    async listFastDelivery(data) {
        let condition = {
            del: 0
        }
        //tra ra cac san pham co thoi gian ship ngan nhat
        return Product.findAll({
            where: condition,
            order: [
                [
                    "time_to", "ASC"
                ]
            ],
            limit: 6
        })

    }
    async listSale(data) {
        let condition = {
            del: 0
        }

        //tra ra 6 san pham dang sale cao nhat
        return Product.findAll({
            where: condition,
            order: [
                [
                    "sale", "DESC"
                ]
            ],
            limit: 6
        })

    }


    //done
    async createProduct(data) {
        if (!data.name) {
            console.log('MidProduct-createProduct: ErrorCode-253');
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_NAME);
        }
        if (!data.quantity) {
            console.log('MidProduct-createProduct: ErrorCode-257');
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_QUANTITY);
        }
        if (!data.unit_price) {
            console.log('MidProduct-createProduct: ErrorCode-261');
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_UNIT_PRICE);
        }
        if (!data.description) {
            console.log('MidProduct-createProduct: ErrorCode-265');
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_DESCRIPTION);
        }
        if (!data.user_id) {
            console.log('MidProduct-createProduct: ErrorCode-269');
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_USER_ID);
        }

        let dataCreate = {
            name: data.name,
            quantity: data.quantity,
            unit_price: data.unit_price,
            description: data.description,
            user_id: data.user_id,
            del: 0
        }
        return await Product.create(dataCreate);
    }
    async deleteProduct(data) {
        let objDelete = await Product.findOne({
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
    async updateProduct(data) {
        if (!data.id) {
            console.log('MidProduct-updateProduct: ErrorCode-298');
            throw new Error(ERROR_MESSAGE.PRODUCT.PRODUCT_NOT_EXIST);
        }
        let objUpdate = await Product.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        if (!data.sale) {
            data.sale = null
        }
        if (data.sale_from == '') {
            data.sale_from = null
        }
        if (data.sale_to == '') {
            data.sale_to = null
        }
        let dataUpdate = {
            name: data.name,
            quantity: data.quantity,
            unit_price: data.unit_price,
            time_from: data.time_from,
            time_to: data.time_to,
            sale: data.sale,
            sale_from: data.sale_from,
            sale_to: data.sale_to,
            description: data.description,

        }

        return objUpdate.update(dataUpdate)

    }

}


export default new MidProduct()