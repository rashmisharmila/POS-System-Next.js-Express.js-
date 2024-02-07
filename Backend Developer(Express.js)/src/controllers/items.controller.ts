import express, { Router } from 'express';
import CustomResponse from "../dtos/custom.response";
import ItemsService from '../services/items.service';

const router: Router = express.Router();

router.get('/getAllItems', async (req, res) => {
    try {
        const items = await ItemsService.getAllItems()
        res.send(items)
        res.status(200).send(
            new CustomResponse(200, "All Items Details", items)
        )
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }

});

router.post('/saveItem', async (req, res) => {
    try {
        const items = await ItemsService.saveItemsOrupdateItems(req.body);
        res.status(200).send(
            new CustomResponse(200, "Save Items Details", items)
        );
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


router.put('/:id', async (req, res) => {
    const itemId:number=parseInt(req.params.id, 10);
    const affectedRows = await ItemsService.saveItemsOrupdateItems(req.body,itemId);

    if (affectedRows == 0) {
        new CustomResponse(404, "Tray Again.Item Details not updated..!");
    } else {
        new CustomResponse(200, 'Updated successfully.');
    }
});

router.delete('/:id', async (req, res) => {
    const itemId:number = parseInt(req.params.id, 10);
    const affecedRows = await ItemsService.deleteItems(itemId);

    if (affecedRows == 0) {
        new CustomResponse(404, "Tray Again.Can't delete this..!"+itemId);
    } else {
        res.status(200).send(
            new CustomResponse(200, "deleted successfully.")
        )
    }
});

export default router