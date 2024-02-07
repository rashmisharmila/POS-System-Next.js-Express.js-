import db from '../dbConnection/db';


const getAllUser = async () => {
    const [records] = await db.query("SELECT * FROM user")
    return records;
};

const saveUser = async (obj: any,hashedPassword: any) => {
    const result = await db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
     [obj.username, obj.email, hashedPassword]);

    const affectedRows: number = (result[0] as any)?.affectedRows;
    return affectedRows;
};

const deleteUser = async (userId: number): Promise<number> => {
    const result = await db.query("DELETE FROM user WHERE userId = ?", [userId]);
    const affectedRows: number = (result[0] as any)?.affectedRows;
    return affectedRows;
};

const authUser = async (obj: any) => {
    const result = await db.query('SELECT * FROM user WHERE email = ?', [obj.email]);
    const user: any = result[0];
    return user;
};

export default {
    getAllUser,
    saveUser,
    deleteUser,
    authUser
};
