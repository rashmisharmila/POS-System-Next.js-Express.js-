import express from 'express';
import db from '../src/dbConnection/db';
import CustomerController from '../src/controllers/customer.controller';
import ItemController from '../src/controllers/items.controller';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())


db.query('SELECT 1')
    .then(() => {
        console.log('db connection successed')
        app.listen(8080, () => {
            console.log("Server started on port 8080");
        });
    })
    .catch(err => console.log('db connection failed' + err));

   
app.use('/customer', CustomerController);
app.use('/item', ItemController);

app.use((err:any,req:any,res:any,next:any)=>{
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
})

