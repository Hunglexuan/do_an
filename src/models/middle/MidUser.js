import { Users, Role } from "../core";
import { Op } from "sequelize";
import { checkPassword, hashPassword } from "../../libs/encrypt";
import { generateToken } from "../../libs/token";
import { ERROR_MESSAGE } from "../../config/error";




class MidUser {


    async updateAvatar(data,logo) {
        if (!logo) {
         console.log('MidUser-updateAvatar: ERROR-15');
            throw new Error('Vui lòng chọn ảnh');
        }
        let objUpdate = await Users.findOne({
            where: {
                id: data.id,
                del: 0,
            },
        });
        let dataUpdate = {
            avatar: logo,
        };
        objUpdate.update(dataUpdate);
    }

    async updateShopStatus(data) {
        if (!data.id) {
            console.log('MidUser-updateStatus: ERROR-32');
            throw new Error('Status is not exist');
    
        }
        let obj = await Users.findOne({
            where: {
                id: data.id,
                del: 0,
            },
        });
        let dataUpdate = {
            shop_status: data.shop_status
        };
        obj.update(dataUpdate);
    }
    async getUserByEmail(email) {
        if(!email){
            console.log('MidUser-getUserByEmail: ERROR-49');
            throw new Error(ERROR_MESSAGE.Customer.ERR_EMAIL);
        }
        return await Users.findOne({
            where: {
                email,
                del: 0,
            },
        });
    }
    async getUserById(userid) {
        if(!data.id){
            console.log('MidUser-getUserById: ERROR-61');
            throw new Error(ERROR_MESSAGE.Customer.ERR_REQUIRE_ID);
        }
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
            console.log('MidUser-createUser: ERROR-75');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_NAME);
        }
        if (!data.dob) {
            console.log('MidUser-createUser: ERROR-79');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_DOB);
        }
        if (!data.address) {
            console.log('MidUser-createUser: ERROR-83');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_ADDRESS);
        }
        if (!data.email) {
            console.log('MidUser-createUser: ERROR-87');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EMAIL);
        }
        if (!data.password) {
            console.log('MidUser-createUser: ERROR-91');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PASS);
        }
        if (!data.phone) {
            console.log('MidUser-createUser: ERROR-95');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        let checkExist = await this.getUserByEmail(data.email);
        if (checkExist) {
            console.log('MidUser-createUser: ERROR-100');
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
        let object = await Users.create(dataCreate);
        if(!object){
            console.log('MidUser-createUser: ERROR-114');
        }
        console.log('MidUser-createUser: Success');
        return 
    }

    async checkRole(data) {
        if (!data.id) {
            console.log('MidUser-checkRole: ERROR-122');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_ID);
        } else {
            let user = await Users.findOne({
                where: {
                    id: data.id,
                },
            });
            if (!user) {
            console.log('MidUser-checkRole: ERROR-131');
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
            console.log('MidUser-loginUser: ERROR-150');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_EMAIL);
        }
        if (!password) {
            console.log('MidUser-loginUser: ERROR-154');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_PASSWORD);
        }
       
        const userData = await this.getUserByEmail(email);
      
        let check = this.checkRole(userData);
       
        if (check == "admin") { }
        if (!userData) {
            console.log('MidUser-loginUser: ERROR-162');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_ACC);
        }
      
        const isCorrectPass = await checkPassword(password, userData.password);
        if (!isCorrectPass) {
            console.log('MidUser-loginUser: ERROR-168');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_PASS);
        }

        // check account status is Active
        const token = await generateToken({ userid: userData.id, email: email });
        return {
            token,
            userid: userData.id,
        };
    }

    async loginAdmin(credentials) {
        const { email, password } = credentials;

        if (!email) {
            console.log('MidUser-loginAdmin: ERROR-184');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_EMAIL);
        }

        if (!password) {
            console.log('MidUser-loginAdmin: ERROR-189');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_PASSWORD);
        }

        const userData = await this.getUserByEmail(email);
        if (!userData) {
            console.log('MidUser-loginAdmin: ERROR-195');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_ACC);
        }

        let check = this.checkRole(userData);
        if (!check == "admin") {
            console.log('MidUser-loginAdmin: ERROR-201');
            throw new Error("Khong phai admin");
        }
        const isCorrectPass = await checkPassword(password, userData.password);
        if (!isCorrectPass) {
            console.log('MidUser-loginAdmin: ERROR-206');
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
            console.log('MidUser-loginSeller: ERROR-220');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_EMAIL);
        }

        if (!password) {
            console.log('MidUser-loginSeller: ERROR-225');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_PASSWORD);
        }

        const userData = await this.getUserByEmail(email);
        if (!userData) {
            console.log('MidUser-loginSeller: ERROR-231');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_ACC);
        }

        let check = this.checkRole(userData);
        if (!check == "seller") {
            console.log('MidUser-loginSeller: ERROR-237');
            throw new Error("Khong phai seller");
        }

        const isCorrectPass = await checkPassword(password, userData.password);
        if (!isCorrectPass) {
            console.log('MidUser-loginSeller: ERROR-243');
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_PASS);
        }
        // check account status is Active
        const token = await generateToken({ userid: userData.id, email: email });
        return {
            token,
            sellerid: userData.id,
        };
    }

    async updatePassword(data) {
        if (!data.id) {
            console.log('MidUser-updatePassword: ERROR-256');
            throw new Error('Voucher is not exist');
    
        }
        let user = await Users.findOne({
            where: {
                id: data.id,
            },
        });
        const isCorrectPass = await checkPassword(data.oldPassword, user.password);
        if (!isCorrectPass) {
            console.log('MidUser-updatePassword: ERROR-267');
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
            role_id: null,
        };
        
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
        if(!listUsers){
            console.log('MidUser-searchUser: ERROR-323');
        }
        console.log('MidUser-searchUser: Success');
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
        if(!listUsers){
            console.log('MidUser-searchSeller: ERROR-363');
        }
        console.log('MidUser-searchSeller: Success');
        return {
            listUsers,
            total: total || 0,
        };
    }

    //done
    async updateUser(data) {
        if (!data.name) {
            console.log('MidUser-updateUser: ERROR-363');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_NAME);
        }
        if (!data.email) {
            console.log('MidUser-updateUser: ERROR-379');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EMAIL);
        }
        if (!data.phone) {
            console.log('MidUser-updateUser: ERROR-383');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        if (!data.address) {
            console.log('MidUser-updateUser: ERROR-387');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.address);
        }
        if (!data.dob) {
            console.log('MidUser-updateUser: ERROR-391');
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
        let object = await objUpdate.update(dataUpdate);
        if(!object){
            console.log('MidUser-updateUser: ERROR-409');
        }console.log('MidUser-updateUser: Success');
        return 
    }

    //done
    async updateSeller(data) {
        if (!data.name) {
            console.log('MidUser-updateSeller: ERROR-417');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_NAME);
        }
        if (!data.shop_name) {
            console.log('MidUser-updateSeller: ERROR-421');
            throw new Error("Shop name is blank!");
        }
        if (!data.email) {
            console.log('MidUser-updateSeller: ERROR-425');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EMAIL);
        }
        if (!data.phone) {
            console.log('MidUser-updateSeller: ERROR-429');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_PHONE);
        }
        if (!data.address) {
            console.log('MidUser-updateSeller: ERROR-433');
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.address);
        }
        if (!data.dob) {
            console.log('MidUser-updateSeller: ERROR-437');
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
        let object = await objUpdate.update(dataUpdate);
        if(!object){
            console.log('MidUser-updateSeller: ERROR-456');
        }console.log('MidUser-updateSeller: Success');
        return 
    }

    //done
    async upgradeRole(data) {
        if (!data.id) {
            console.log('MidUser-updateRole: ERROR-464');
            throw new Error('Role is not exist');
    
        }
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
        if (!data.id) {
            console.log('MidUser-updateRole: ERROR-489');
            throw new Error('Role is not exist');
    
        }
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
        if (!data.id) {
            console.log('MidUser-deleteUser: ERROR-508');
            throw new Error('User is not exist');
    
        }
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