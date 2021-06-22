import {
    Users
} from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailActiveOrder, sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';
import { password } from '../../config/database';

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hung',
    password: '1234',
    database: 'doan'
});





class MidUser {


    async getUserByEmail(email) {
        return await Users.findOne({
            where: {
                email,
                del: 0
            }
        })
    }


    async createUser(data) {
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_NAME);
        }
        if (!data.email) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EMAIL);
        }
        if (!data.password) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PASS);
        }
        if (!data.phone) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        if (!data.address) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        if (!data.dob) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        let checkExizt = this.getUserByEmail(data.email);
        if (!checkExizt) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EXISTT);
        }
        let dataCreate = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            dob: data.avatar,
            password: hashPassword(data.password),
            del: 0
        }
        return await Users.create(dataCreate);
    }

    async getUserById(userid) {
        return Users.findOne({
            where: {
                id: userid
            },

        })
    }
    async getUserByIdNoPass(userid) {
        let user = await Users.findOne({
            where: {
                id: userid
            },

        })
        let obj = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        }
        return obj;
    }

    async loginUser(credentials) {

        const { email, password } = credentials;

        if (!email) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_EMAIL);
        }

        if (!password) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_PASSWORD);
        }

        const userData = await this.getUserByEmail(email);
        if (!userData) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_ACC);
        }

        const isCorrectPass = await checkPassword(password, userData.password);
        if (!isCorrectPass) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_PASS);
        }

        // check account status is Active
        const token = await generateToken({ userid: userData.id, email: email });
        return {
            token
        }
    }

    async forgotPassword(data) {
        let { email, hostFront } = data;

        let oldForgot = await ConfirmForgot.findOne({
            where: {
                email
            }
        })

        if (oldForgot) {
            await oldForgot.destroy();
        }

        let objForgot = await this.getUserByEmail(email);

        if (!objForgot) {
            throw new Error(ERROR_MESSAGE.FORGOT_PASSWORD.EMAIL_NOT_EXIST);
        }

        let stringConfirm = uuidv4();

        let objConfirm = {
            email,
            stringConfirm,
            countRequest: 0
        }

        await ConfirmForgot.create(objConfirm);

        let hostVerify = hostFront + `/auth/confirmForgot/${email}/${stringConfirm}`;

        await sendMailForgotPassword({
            name: objForgot.name,
            email: email,
            name: objForgot.name,
            hostVerify,
            hostWeb: hostFront
        })
    }

    async VerifyForgotPassword(email, strConfirm, newPassword) {
        let result = await ConfirmForgot.findOne({
            where: {
                email,
                stringConfirm: strConfirm
            }
        })
        if (!result) return 0;
        let now = new Date();
        let reqCreated = new Date(result.createAt);
        reqCreated.setDate(reqCreated.getDate() + 1);

        if (reqCreated > now) {
            await result.destroy();
            return 2;
        }
        let userUpdate = await UserDistributor.findOne({
            where: {
                email,
                del: 0
            }
        })
        if (!userUpdate) return 3;
        await userUpdate.update({ password: hashPassword(newPassword) })
        await result.destroy();
        return 1;
    }

    async checkPass(data) {
        let user = await Users.findOne({
            where: {
                id: data.id,
            }
        })
        const isCorrectPass = await checkPassword(data.oldPassword, user.password);
        if (!isCorrectPass) {
            return false;
        } else {
            return true;
        }
    }

    async updatePassword(data) {
        let user = await Users.findOne({
            where: {
                id: data.id,
            }
        })
        const isCorrectPass = await checkPassword(data.oldPassword, user.password);
        if (!isCorrectPass) {
            throw await new Error(ERROR_MESSAGE.UPDATE_PASSWORD.ERR_OLD_PASS);
        } else {
            const encryptedPassword = await hashPassword(data.password);
            return user.update({
                password: encryptedPassword
            });
        }
    }

    async updateProfile(data, userData, avatar) {
        if (avatar) {
            data.avatar = avatar
        }

        return userData.update(data);
    }


    compareASC(a, b) {
        if (a.email < b.email) {
            return -1;
        }
        if (a.email > b.email) {
            return 1;
        }
        return 0;
    }

    compareDESC(a, b) {
        if (a.email > b.email) {
            return -1;
        }
        if (a.email < b.email) {
            return 1;
        }
        return 0;
    }


    async searchUser(data) {
        let condition = {
            del: 0
        }
        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }
        if (data.email) {
            condition.email = {
                [Op.like]: `%${data.email}%`
            }
        }
        if (data.phone) {
            condition.phone = {
                [Op.like]: `%${data.phone}%`
            }
        }
        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        const [listUsers, total] = await Promise.all([
            Users.findAll({
                where: condition,
                order: [
                    [
                        data.typeOrder === 'name' ? 'name' : 'createdAt',
                        data.stateOrder === 'up' ? 'ASC' : 'DESC'
                    ]
                ],
                limit,
                offset: (page - 1) * limit
            }),
            Users.count({
                where: condition
            })
        ])
        if (data.typeOrder === 'email') {
            if (data.stateOrder == 'up') {
                listUsers.sort(this.compareASC);
            } else {
                listUsers.sort(this.compareDESC);
            }
        }

        return {
            listUsers,
            total: total || 0
        }

    }

    async updateUser(data) {
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_NAME);
        }
        if (!data.email) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EMAIL);
        }
        if (!data.password) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PASS);
        }
        if (!data.phone) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        if (!data.address) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        if (!data.dob) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        let objUpdate = await Users.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })

        let dataUpdate = {
            name: data.name,
            password: data.password,
            address: data.address,
            phone: data.phone,
            email: data.email,
            phone: data.phone,
        }
        return await objUpdate.update(dataUpdate)

    }
    async deleteUser(data) {
        let objDelete = await Users.findOne({
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
}

export default new MidUser()