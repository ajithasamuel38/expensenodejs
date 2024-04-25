const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('sequelize')

exports.postexpense = async(req, res, next) =>{
    console.log(req.body);
   try{ 

    const response = await Expense.create({ ...req.body, signupId: req.user.id });
    const user = await User.findByPk(req.user.id);
    console.log(user);
        if (user) {
            user.totalexpense = user.totalexpense + +req.body.amount;
            await user.save();
        }
    res.status(201).json({message: "Expense Added Successfully", expense: response});

   }catch(err){
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
   }
}

exports.getexpense = async(req, res, next) =>{
    console.log(req.body)
    try{
        const response = await Expense.findAll({where : { signupId: req.user.id}});
        res.status(200).json(response);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
     }
}

exports.deleteexpense = async(req, res, next) =>{
    console.log(req.user);
    const id = req.params.id;
    console.log(id);
    try{
        const expensetodelete = await Expense.findOne({where: {id: id, signupId: req.user.id}});
        if(!expensetodelete){
            return res.status(404).json({ message: "Expense not found" });
        }
        await expensetodelete.destroy();
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
       
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}