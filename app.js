const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./config/db"); 

const adminroutes = require("./routes/adminroutes")

const expenseroutes = require("./routes/expenseroutes")

const purchaseroutes = require("./routes/premiumroutes");
const premiumeroutes = require("./routes/leaderboard");

const errorController = require('./controllers/error');

const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");

const cors = require('cors'); 

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(adminroutes);
app.use(expenseroutes);
app.use(purchaseroutes);
app.use(premiumeroutes);
app.use(errorController.get404);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync({alter:true})
.then((result)=>{
    console.log(result);
    app.listen(3000);
}).catch((err)=>{
    console.log(err)
});