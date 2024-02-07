import express, { Router } from 'express';
import CustomResponse from "../dtos/custom.response";
import CustomerService from '../services/customer.service';

const router: Router = express.Router();


router.get('/getAllCustomer', async (req, res) => {
    try {
        const customer = await CustomerService.getAllCustomer()
        res.send(customer)
        res.status(200).send(
            new CustomResponse(200, "All Customer Details", customer)
        )
    } catch (err) {
        res.status(100).send("Error");
    }

});


router.post('/', async (req, res) => {
    try {
        const customer = await CustomerService.saveCustomerOrupdateCustomer(req.body)
        res.send(customer)
        res.status(200).send(
            new CustomResponse(200, "Save Customer Details", customer)
        )
    } catch (err) {
        res.status(100).send("Error");
    }

});

router.put('/:id', async (req, res) => {
    const customerId = parseInt(req.params.id, 10);
    const affecedRows = await CustomerService.saveCustomerOrupdateCustomer(req.body, customerId)
    if (affecedRows == 0) {
        res.status(100).send("Error");
    } else {
        res.status(200).send(
            new CustomResponse(200, "Updated Customer Details")
        )
    }
});





export default router