const Expense = require('../models/expense');


exports.postexpense = async(req, res, next) =>{
   try{ 

    const response = await Expense.create(req.body);
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
    const id = req.params.id;
    try{
        const expensetodelete = await Expense.findByPk(id);
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