const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('sequelize');


exports.getleaderboarddetails = async (req, res) =>{
    try{
        const leaderboard = await User.findAll({
            attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('amount')), 'total_cost']],
            include: [
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            group: ['id'],
            order: [['total_cost', 'DESC']]
        });
        /*const usertotalexpense = await Expense.findAll({
            attributes: [
            'signupId', [sequelize.fn('sum', sequelize.col('amount')), 'total_cost']
        ],
            group: ['signupId']        
    });
    console.log(usertotalexpense, "hi");
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
            userleaderboard.push({ name: user.name, total_cost: usertotalexpense[user.id] || 0});
        })
        userleaderboard.sort((a, b) => b.totalexpense - a.totalexpense);
        console.log(userleaderboard);*/
        res.json(leaderboard);
    }catch(err){
        console.log(err);
    }
}