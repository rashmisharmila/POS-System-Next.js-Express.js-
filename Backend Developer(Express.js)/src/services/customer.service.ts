import db from '../dbConnection/db';

 const getAllCustomer = async () => {
    const [records] = await db.query("SELECT * FROM customer")
    return records;
};

 const saveCustomerOrupdateCustomer = async (obj:any,customerId=0) => {
   const result = await db.query("CALL customer_add_or_edit(?,?,?,?,?)", [
        customerId,
        obj.Name,
        obj.address,
        obj.email,
        obj.phoneNumber
    ]);
    
    const affectedRows: number = (result[0] as any)?.affectedRows;
    return affectedRows;
    
    
};

const deleteCustomer = async (customerId: number): Promise<number> => {
    const result = await db.query("DELETE FROM customer WHERE customerId = ?", [customerId]);
    const affectedRows: number = (result[0] as any)?.affectedRows;
    return affectedRows;
};


export default {
    getAllCustomer,
    saveCustomerOrupdateCustomer,
    deleteCustomer
};
