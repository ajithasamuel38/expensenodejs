const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./config/db"); 

const adminroutes = require("./routes/adminroutes")

const expenseroutes = require("./routes/expenseroutes")

const errorController = require('./controllers/error');

const cors = require('cors'); 

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(adminroutes);
app.use(expenseroutes);
app.use(errorController.get404);

sequelize.sync(
    { alter: true }
).then((result)=>{
    console.log(result);
    app.listen(3000);
}).catch((err)=>{
    console.log(err)
});