const express = require("express");
const customerRouter = express.Router();
const { customerIdValidate, customerDataValidateForCreate, customerDataValidateForUpdate } = require('../middleware/customerMiddleware');
const { validationResult } = require('express-validator');
const customerActions = require("../service/customerService");
const { parse } = require("dotenv");


customerRouter.get("/getAllCustomers", async (req, res) => {
    try {
        let result = await customerActions.getAllCustomers();
        if (result.status == false) {
            return res.status(result.code).json(result);
        }
        res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json("Internal server error");
    }

});

customerRouter.get("/getCustomerByID/:customerID", customerIdValidate, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }
        let result = await customerActions.getCustomerByID(req.params.customerID);
        if (result.status == false) {
            return res.status(result.code).json(result);
        }
        res.status(result.code).json(result);
    } catch (error) {

        return res.status(500).json("Internal server error");
    }

});


customerRouter.post("/createCustomer", customerDataValidateForCreate, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }
        let customerObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email,
            state: req.body.state,
            plan: req.body.plan
        }
        let result = await customerActions.createCustomer(customerObj);
        if (result.success == false) {
            return res.status(result.code).json(result);
        }
        res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json("Internal server error");
    }

});

customerRouter.put("/updateCustomer/:customerID", customerIdValidate, customerDataValidateForUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }
        let customerObj = {
            customerId: parseInt(req.params.customerID),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            state: req.body.state,
            plan: req.body.plan
        }
        console.log(customerObj);
        let result = await customerActions.updateCustomer(customerObj);
        if (result.success == false) {
            return res.status(result.code).json(result);
        }
        res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
});

customerRouter.delete("/deleteCustomer/:customerID", customerIdValidate, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }
        let result = await customerActions.deleteCustomerById(req.params.customerID);
        if (result.success == false) {
            return res.status(result.code).json(result);
        }
        res.status(result.code).json(result);
    } catch (error) {
        //return res.status(500).json(error.message);
        return res.status(500).json("Internal server error");
    }
});


module.exports = customerRouter;