import db from '../dbConnection/db';

 const getAllCustomer = async () => {
    const [records] = await db.query("SELECT * FROM customer")
    return records;
};


 const saveCustomerOrupdateCustomer = async (obj:any,id=0) => {
    const  [records] = await db.query("CALL ups_customer_add_or_edit(?,?,?,?,?)",
    [obj.customerId,obj.Name,obj.address,obj.email,obj.phoneNumber]);

    if('affectedRows' in records){
        return records.affectedRows as number;
    }
    return 0;
};

export default {
    getAllCustomer,
    saveCustomerOrupdateCustomer,
};
