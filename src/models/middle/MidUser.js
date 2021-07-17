import { Users, Role } from "../core";
import { Op } from "sequelize";
import { checkPassword, hashPassword } from "../../libs/encrypt";
import { generateToken } from "../../libs/token";
import { ERROR_MESSAGE } from "../../config/error";
import {
    sendMailActiveOrder,
    sendMailForgotPassword,
} from "../../libs/sendmail";
import { v4 as uuidv4 } from "uuid";
import { password } from "../../config/database";
import { name } from "ejs";
import { find } from "lodash";







class MidUser {
    async getUserByEmail(email) {
        return await Users.findOne({
            where: {
                email,
                del: 0,
            },
        });
    }
    async getUserById(userid) {
        return Users.findOne({
            where: {
                id: userid,
                del: 0,
            },
        });
    }

    //done
    async createUser(data) {
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_NAME);
        }
        if (!data.dob) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_DOB);
        }
        if (!data.address) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_ADDRESS);
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
        let checkExist = await this.getUserByEmail(data.email);
        if (checkExist) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EXISTT);
        }
        let dataCreate = {
            dob: data.dob,
            address: data.address,
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashPassword(data.password),
            del: 0,
        };
        return await Users.create(dataCreate);
    }

    async checkRole(data) {
        if (!data.id) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_ID);
        } else {
            let user = await Users.findOne({
                where: {
                    id: data.id,
                },
            });
            if (!user) {
                throw new Error(ERROR_MESSAGE.LOGIN.ERR_ACC);
            } else {
                let role = await Role.findOne({
                    where: {
                        id: user.role_id,
                    },
                });
                if (role) {
                    return role.name;
                }
            }
        }
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
        let check = this.checkRole(userData);
        if (check == "admin") {}
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
            token,
        };
    }

    async loginAdmin(credentials) {
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

        let check = this.checkRole(userData);
        if (!check == "admin") {
            throw new Error("Khong phai admin");
        }
        const isCorrectPass = await checkPassword(password, userData.password);
        if (!isCorrectPass) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_PASS);
        }

        const token = await generateToken({ userid: userData.id, email: email });
        return {
            token,
        };
    }

    async loginSeller(credentials) {
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

        let check = this.checkRole(userData);
        if (!check == "seller") {
            throw new Error("Khong phai seller");
        }

        const isCorrectPass = await checkPassword(password, userData.password);
        if (!isCorrectPass) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_PASS);
        }
        // check account status is Active
        const token = await generateToken({ userid: userData.id, email: email });
        return {
            token,
        };
    }

    async updatePassword(data) {
        let user = await Users.findOne({
            where: {
                id: data.id,
            },
        });
        const isCorrectPass = await checkPassword(data.oldPassword, user.password);
        if (!isCorrectPass) {
            throw await new Error(ERROR_MESSAGE.UPDATE_PASSWORD.ERR_OLD_PASS);
        } else {
            const encryptedPassword = await hashPassword(data.password);
            return user.update({
                password: encryptedPassword,
            });
        }
    }

    //done
    async searchUser(data) {
        let condition = {
            del: 0,
        };
        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`,
            };
        }
        if (data.email) {
            condition.email = {
                [Op.like]: `%${data.email}%`,
            };
        }
        if (data.phone) {
            condition.phone = {
                [Op.like]: `%${data.phone}%`,
            };
        }
        // let { page, limit } = data;
        // page = page ? parseInt(page) : 1;
        // limit = limit ? parseInt(limit) : 10;

        const [listUsers, total] = await Promise.all([
            Users.findAll({
                where: condition,
                order: [
                    ["createdAt", "DESC"]
                ],
                // limit,
                // offset: (page - 1) * limit
            }),
            Users.count({
                where: condition,
            }),
        ]);
        return {
            listUsers,
            total: total || 0,
        };
    }

    //done
    async searchSeller(data) {
        let role = await Role.findOne({
            where: {
                name: "seller",
                del: 0,
            },
        });
        let condition = {
            del: 0,
            role_id: role.id,
        };
        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`,
            };
        }


        const [listUsers, total] = await Promise.all([
            Users.findAll({
                where: condition,
                order: [
                    ["createdAt", "DESC"]
                ],
            }),
            Users.count({
                where: condition,
            }),
        ]);
        console.log(listUsers);
        console.log(total);
        return {
            listUsers,
            total: total || 0,
        };
    }

    //done
    async updateUser(data) {
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_NAME);
        }
        if (!data.email) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EMAIL);
        }
        if (!data.phone) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        if (!data.address) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.address);
        }
        if (!data.dob) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.dob);
        }
        let objUpdate = await Users.findOne({
            where: {
                id: data.id,
                del: 0,
            },
        });
        let dataUpdate = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            dob: data.dob,
        };

        return await objUpdate.update(dataUpdate);
    }

    //done
    async updateSeller(data) {
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_NAME);
        }
        if (!data.shop_name) {
            throw new Error("Shop name is blank!");
        }
        if (!data.email) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EMAIL);
        }
        if (!data.phone) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        if (!data.address) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.address);
        }
        if (!data.dob) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.dob);
        }
        let objUpdate = await Users.findOne({
            where: {
                id: data.id,
                del: 0,
            },
        });
        let dataUpdate = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            dob: data.dob,
            shop_name: data.shop_name,
        };

        return await objUpdate.update(dataUpdate);
    }

    //done
    async upgradeRole(data) {
        let user = await Users.findOne({
            where: {
                id: data.id,
                del: 0,
            },
        });
        let role = await Role.findOne({
            where: {
                name: "seller",
                del: 0,
            },
        });
        let upgrade = {
            role_id: role.id,
        };
        user.update(upgrade);
    }

    //done
    async downgradeRole(data) {
        let user = await Users.findOne({
            where: {
                id: data.id,
                del: 0,
            },
        });
        let downgrade = {
            role_id: null,
        };
        user.update(downgrade);
    }

    //done
    async deleteUser(data) {
        let objDelete = await Users.findOne({
            where: {
                id: data.id,
                del: 0,
            },
        });
        let dataDelete = {
            del: 1,
        };
        objDelete.update(dataDelete);
    }
}

export default new MidUser();