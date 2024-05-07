const { body, param } = require('express-validator');

const customerModel = require('../model/customerModel');

async function checkCustomer(customerID) {
    try {
        let customerObj = await customerModel.findByPk(customerID);
        if (customerObj != null) {
            return true;
            //returns true if user already exists.
        }
        return false;

    }
    catch (error) {
        console.error(error.message);
        return error.message;
    }

}
async function checkCustomerEmail(emailId) {
    try {
        let customerObjArr = await customerModel.findAll({
            where: { email: emailId }
        });
        console.log(customerObjArr);
        if (customerObjArr.length != 0) {
            return true;
            //returns true if user already exists.
        }
        return false;

    }
    catch (error) {
        console.error(error.message);
        return error.message;
    }

}

const customerIdValidate = [
    param('customerID')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("customerID is required")
        .bail()
        .isInt()
        .withMessage("customerID can only accept numerical values")
        .bail()
        .custom(async (value) => {
            let result = await checkCustomer(value);
            if (result == true) {
                //throw new Error("user already present");
            }
            else if (result == false) {
                throw new Error("customer not present");
                //console.log("nothing happend");
            } else {
                throw new Error(result);
            }
        })
];
function checkplan(valuee) {
    try {
        const validEnumValues = ["Gold", "Silver", "Bronze"];
            console.log(validEnumValues.includes(valuee));
            if (validEnumValues.includes(value) == false) {

                return false;
            }
            return true;

    }
    catch (error) {
        console.error(error.message);
        return error.message;
    }

}

const customerDataValidateForCreate = [
    

    body("firstName")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("first name is required"),
    body("lastName")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("last name is required"),
    body("address")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("address is required"),
    body('email')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("email is required")
        .bail()
        .toLowerCase()
        .isEmail()
        .withMessage("Provide proper email id")
        .bail()
        .custom(async (value) => {
            let result = await checkCustomerEmail(value);
            if (result == true) {
                throw new Error("customer already present");
            }
            else if (result == false) {
                //console.log("nothing happend");
            } else {
                throw new Error(result);
            }
        }),
    body("state")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("state is required"),
    body("plan")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("plan is required")
        // .bail()
        // .custom((value) => {
        //     let result = checkplan(value);
        //     if (result == true) {
                
        //     }
        //     else if (result == false) {
        //         throw new Error("enter correct plan");
        //         //console.log("nothing happend");
        //     } else {
        //         throw new Error(result);
        //     }

        // })
];

const customerDataValidateForUpdate = [
    body("firstName")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("first name is required"),
    body("lastName")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("last name is required"),
    body("address")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("address is required"),
    body("state")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("state is required"),
    body("plan")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("plan is required")
        // .bail()
        // .custom((value) => {
        //     let result = checkplan(value);
        //     if (result == true) {
                
        //     }
        //     else if (result == false) {
        //         throw new Error("enter correct plan");
        //         //console.log("nothing happend");
        //     } else {
        //         throw new Error(result);
        //     }
        // })
];


module.exports = { customerIdValidate, customerDataValidateForCreate, customerDataValidateForUpdate };