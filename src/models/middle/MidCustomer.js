import { Customer } from '../core';
import { Error, Op } from 'sequelize';
import { ERROR_MESSAGE } from '../../config/error';

class MidCustomer {


    async getCustomerById(id) {
        return await Customer.findOne({
            where: {
                id
            }
        })
    }

    compareCompanyDESC(a, b) {

        if (a.company_name < b.company_name) {
            return -1;
        }
        if (a.company_name > b.company_name) {
            return 1;
        }
        return 0;
    }
    compareCompanyASC(a, b) {
        if (a.company_name > b.company_name) {
            return -1;
        }
        if (a.company_name < b.company_name) {
            return 1;
        }
        return 0;
    }

    compareEmailDESC(a, b) {
        if (a.email < b.email) {
            return -1;
        }
        if (a.email > b.email) {
            return 1;
        }

        return 0;
    }

    compareEmailASC(a, b) {
        if (a.email > b.email) {
            return -1;
        }
        if (a.email < b.email) {
            return 1;
        }
        return 0;
    }

    compareTypeASC(a, b) {
        if (a.type > b.type) {
            return -1;
        }
        if (a.type < b.type) {
            return 1;
        }
        return 0;
    }
    compareTypeDESC(a, b) {
        if (a.type < b.type) {
            return -1;
        }
        if (a.type > b.type) {
            return 1;
        }

        return 0;
    }

    compareNameASC(a, b) {
        if (a.name > b.name) {
            return -1;
        }
        if (a.name < b.name) {
            return 1;
        }
        return 0;
    }
    compareNameDESC(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }
    compareSeenASC(a, b) {
        if (a.seen > b.seen) {
            return -1;
        }
        if (a.seen < b.seen) {
            return 1;
        }
        return 0;
    }
    compareSeenDESC(a, b) {
        if (a.seen < b.seen) {
            return -1;
        }
        if (a.seen > b.seen) {
            return 1;
        }

        return 0;
    }
    async searchCustomer(data) {
        let condition = {
            del: 0,
        };
        if (data.seen) {
            condition.seen = parseInt(data.seen)
        }
        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }
        if (data.company_name) {
            condition.company_name = {
                [Op.like]: `%${data.company_name}%`
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
        if (data.type) {
            condition.type = parseInt(data.type)
        }

        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        const [allCustomer, total] = await Promise.all([
            Customer.findAll({
                where: condition,
                order: [
                    ["seen", "ASC"],
                    ["createdAt", "DESC"],
                ],
                limit,
                offset: (page - 1) * limit
            }),
            Customer.count({
                where: condition
            })
        ])
        if (data.typeOrder === 'email') {
            if (data.stateOrder == 'up') {
                allCustomer.sort(this.compareEmailASC);
            } else {
                allCustomer.sort(this.compareEmailDESC);
            }
        }
        if (data.typeOrder === 'company_name') {
            if (data.stateOrder == 'up') {
                allCustomer.sort(this.compareCompanyASC);
            } else {
                allCustomer.sort(this.compareCompanyDESC);
            }
        }
        if (data.typeOrder === 'type') {
            if (data.stateOrder == 'up') {
                allCustomer.sort(this.compareTypeASC);
            } else {
                allCustomer.sort(this.compareTypeDESC);
            }
        }
        if (data.typeOrder === 'name') {
            if (data.stateOrder == 'up') {
                allCustomer.sort(this.compareNameASC);
            } else {
                allCustomer.sort(this.compareNameDESC);
            }
        }
        if (data.typeOrder === 'seen') {
            if (data.stateOrder == 'up') {
                allCustomer.sort(this.compareSeenASC);
            } else {
                allCustomer.sort(this.compareSeenDESC);
            }
        }
        return {
            allCustomer,
            total: total || 0
        }
    }

    async createCustomer(data) {
       
        let dataCreate = {
            name: data.name,
            company_name: data.company_name,
            email: data.email,
            phone: data.phone,
            description: data.description,
            type: data.type,
            seen: 0,
            del: 0
        }
        return await Customer.create(dataCreate);
    }


   
    async seen(data) {
        let objUpdate = await Customer.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        let dataUpdate = {
            seen: 1,
        }
        objUpdate.update(dataUpdate)
    }

    async deleteCustomer(data) {
        let objDelete = await Customer.findOne({
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

export default new MidCustomer();