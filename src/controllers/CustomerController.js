import { MidCustomer } from '../models/middle';

class CustomerController {

    async getCustomerById(req, res) {
        let { id } = req.query;
        return await MidCustomer.getCustomerById(id);
    }

    async deleteCustomer(req, res) {
        let dataQuery = req.query;
        return await MidCustomer.deleteCustomer(dataQuery);
    }

    async seen(req, res) {
        let dataQuery = req.query;
        return await MidCustomer.seen(dataQuery);
    }
    async searchCustomer(req, res) {
        let dataQuery = req.query;
        return MidCustomer.searchCustomer(dataQuery);
    }

    async createCustomer(req, res) {
        let data = req.body;
        return await MidCustomer.createCustomer(data);
    }

    async createMobile(req, res) {
        let data = req.body;
        return await MidCustomer.createCustomerMobile(data);
 
    }

}

export default new CustomerController();