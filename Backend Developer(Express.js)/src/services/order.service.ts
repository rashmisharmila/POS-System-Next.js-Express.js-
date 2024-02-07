import db from '../dbConnection/db';

 const getAllOrder = async () => {
    const [records] = await db.query("SELECT * FROM order_table")
    return records;
};

 const saveOrderOrupdateOrder = async (obj:any,orderId=0) => {
   const result = await db.query("CALL order_table_add_or_edit(?,?,?,?,?)", [
        orderId,
        obj.itemsId,
        obj.date,
        obj.total,
        obj.customerId
    ]);
    
    const affectedRows: number = (result[0] as any)?.affectedRows;
    return affectedRows;
};

const deleteOrder = async (orderId: number): Promise<number> => {
    const result = await db.query("DELETE FROM order_table WHERE orderId = ?", [orderId]);
    const affectedRows: number = (result[0] as any)?.affectedRows;
    return affectedRows;
};


export default {
    getAllOrder,
    saveOrderOrupdateOrder,
    deleteOrder
};
