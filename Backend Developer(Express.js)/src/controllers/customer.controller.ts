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
        res.status(500).send("Internal Server Error");
    }

});

router.post('/saveCustomer', async (req, res) => {
    try {
        const customer = await CustomerService.saveCustomerOrupdateCustomer(req.body);
        res.status(200).send(
            new CustomResponse(200, "Save Customer Details", customer)
        );
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


router.put('/:id', async (req, res) => {
    const customerId:number=parseInt(req.params.id, 10);
    const affectedRows = await CustomerService.saveCustomerOrupdateCustomer(req.body,customerId);

    if (affectedRows == 0) {
        new CustomResponse(404, "Tray Again.Customer Details not updated..!");
    } else {
        new CustomResponse(200, 'Updated successfully.');
    }
});

router.delete('/:id', async (req, res) => {
    const customerId:number = parseInt(req.params.id, 10);
    const affecedRows = await CustomerService.deleteCustomer(customerId);

    if (affecedRows == 0) {
        new CustomResponse(404, "Tray Again.Customer Details not updated..!"+customerId);
    } else {
        res.status(200).send(
            new CustomResponse(200, "deleted successfully.")
        )
    }
});

export default router