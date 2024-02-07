import express, { Router } from 'express';
import CustomResponse from "../dtos/custom.response";
import orderService from '../services/order.service';

const router: Router = express.Router();

router.get('/getAllOrder', async (req, res) => {
    try {
        const order = await orderService.getAllOrder()
       
        res.status(200).send(
            new CustomResponse(200, "All Order Details", order)
        )
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }

});

router.post('/saveOrder', async (req, res) => {
    try {
        const order = await orderService.saveOrderOrupdateOrder(req.body);
        res.status(200).send(
            new CustomResponse(200, "Save Order Details", order)
        );
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


router.put('/:id', async (req, res) => {
    const orderId:number=parseInt(req.params.id, 10);
    const affectedRows = await orderService.saveOrderOrupdateOrder(req.body,orderId);

    if (affectedRows == 0) {
        new CustomResponse(404, "Tray Again.Order Details not updated..!");
    } else {
        new CustomResponse(200, 'Updated successfully.');
    }
});

router.delete('/:id', async (req, res) => {
    const orderId:number = parseInt(req.params.id, 10);
    const affecedRows = await orderService.deleteOrder(orderId);

    if (affecedRows == 0) {
        new CustomResponse(404, "Tray Again.Can't delete this..!"+orderId);
    } else {
        res.status(200).send(
            new CustomResponse(200, "deleted successfully.")
        )
    }
});

export default router