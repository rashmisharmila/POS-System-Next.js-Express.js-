import db from '../dbConnection/db';

 const getAllItems = async () => {
    const [records] = await db.query("SELECT * FROM item")
    return records;
};

 const saveItemsOrupdateItems = async (obj:any,itemId=0) => {
   const result = await db.query("CALL item_add_or_edit(?,?,?,?)", [
        itemId,
        obj.ItemName,
        obj.unitPrice,
        obj.qty
    ]);
    
    const affectedRows: number = (result[0] as any)?.affectedRows;
    return affectedRows;
};

const deleteItems = async (itemId: number): Promise<number> => {
    const result = await db.query("DELETE FROM item WHERE itemsId = ?", [itemId]);
    const affectedRows: number = (result[0] as any)?.affectedRows;
    return affectedRows;
};


export default {
    getAllItems,
    saveItemsOrupdateItems,
    deleteItems
};
