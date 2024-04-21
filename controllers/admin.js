const User = require('../models/user');
const Sequelize = require('sequelize');


exports.postuserdetails = async(req, res, next) => {
    
    try{
        const result = await User.create(req.body);
        console.log(req.body); 
            res.status(201).json(result); 
        }catch(err){
            if (err instanceof Sequelize.UniqueConstraintError) {
                // Unique constraint violation (e.g., email already exists)
                res.status(400).json({ message: "Email already exists", err });
            } else {
                console.error("Error creating user:", err);
                res.status(500).json({ message: "Internal server error" });
            }
        }
}

exports.userlogindetails = async (req, res, next)=>{

    console.log(req.body);
    const {email, password} = req.body;
   
    try{
       

        const user  = await User.findOne({where: {email: email}});

        if(user){
            if (password === user.password) {
                res.status(200).json({ message: "User logged in Successfully" });
            } else {
                res.status(401).json({ message: "User not authorized" });
            }
            
        }else{
            
                res.status(404).json({message: "User not found"});
        }
        
        }
        catch (err){
            console.error("Error logging in user:", err);
        res.status(500).json({ message: "Internal server error" });
        }
}