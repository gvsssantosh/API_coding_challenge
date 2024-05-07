
const { Op, where } = require("sequelize");
const customerModel = require('../model/customerModel');

// 1. Retrieve all customers.
exports.getAllCustomers = async () => {
    try {
        let customerArray = await customerModel.findAll();
        return ({ status: true, code: 200, obj: customerArray });
    } catch (error) {
        return ({ status: false, code: 500, msg: error.message });
    }
}

// 2. Retrieve a single customer by its ID.
exports.getCustomerByID = async (customerId) => {
    try {
        //let customerObj = await customerModel.findByPk(customerId);
        let customerObj2 = await customerModel.findByPk(customerId);
        return ({ status: true, code: 200, obj: customerObj2 });
    } catch (error) {
        return ({ status: false, code: 500, msg: error.message });
    }
}
// 3. Add a new customer.
exports.createCustomer = async (customerObj) => {
    try {
        await customerModel.create(customerObj);

        let customerObj2 = await customerModel.findOne({
            where: { email: customerObj.email }
        });
        if (customerObj == null) {
            return { success: false, code: 500, msg: "cannot insert a customer" };
        }
        return { success: true, code: 200, obj: customerObj };

    } catch (error) {
        return { success: false, code: 500, msg: error.message };
    }
};
// 4. Update an existing customer.
exports.updateCustomer = async (customerObj) => {
    try {
        await customerModel.update(customerObj, {
            where:
            {
                customerId: customerObj.customerId
            }
        });
        return { status: true, code: 200, msg: "customer details are updated" };
    } catch (error) {
        return { status: false, code: 500, msg: error.message };
    }
};

// 5. Delete a customer by its ID.

exports.deleteCustomerById = async (customerId) => {
    try {

        await customerModel.destroy({
            where:
            {
                customerId: customerId
            }
        });
        return { status: true, code: 200, msg: "customer deleted" };
    } catch (error) {
        return { status: false, code: 500, msg: error.message };
    }

};
