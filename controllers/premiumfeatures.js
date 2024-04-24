const Expense = require('../models/expense');
const User = require('../models/user');
const Sequelize = require('sequelize');


exports.getleaderboarddetails = async (req, res) =>{
    try{
        const users = await User.findAll();
        const expenses = await Expense.findAll();
        const usertotalexpense={};
        expenses.forEach((expense)=>{
            if(usertotalexpense[expense.signupId]){
                usertotalexpense[expense.signupId] = usertotalexpense[expense.signupId] + expense.amount;
            }else{
                usertotalexpense[expense.signupId] = expense.amount;
            }
        })
        const userleaderboard = [];
        users.forEach((user)=>{
            userleaderboard.push({ name: user.name, totalexpense: usertotalexpense[user.id] || 0});
        })
        userleaderboard.sort((a, b) => b.totalexpense - a.totalexpense);
        console.log(userleaderboard);
        res.json(userleaderboard);
    }catch(err){
        console.log(err);
    }
}