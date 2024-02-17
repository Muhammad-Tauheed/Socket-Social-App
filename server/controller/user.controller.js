const User=require("../Model/user.model")
var bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")



exports.store = async (req, res) => {
    try {
        // Check if password is present in req.body
        if (!req.body.password) {
            return res.status(400).json({ message: "Password is required", success: false });
        }

        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update req.body with the hashed password
        req.body.password = hashedPassword;

        const user = await User.create(req.body);
        res.json({ message: "User Created Successfully", status: 201, success: true, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
exports.login=async(req,res)=>{

    try{
const user=await User.findOne({email:req.body.email})
if (!user) {
    res.json({message:"User Not Fund",state:404,success:false})   
}
const passwordMatch=await bcrypt.compare(req.body.password,user.password);

if(passwordMatch){
    var token = jwt.sign({_id:user.id }, process.env.JWT_SECRET);
    
    return res.json({success:true,message:"Password matches",status:200,token})
   }

   else{
    return res.json({success:false,message:"Password does not  matches",status:400})
   }
    }
    catch(err){
        console.log(err);
    }
}

exports.index=async (req,res)=>{
try{
    const users=await User.find()
    res.json({message:"User Fetched Successfuly",state:200,success:true,users})
}
catch(err){
    console.log(err);
}
}

exports.get=async (req,res)=>{
    try{
        const user=await User.findOne({_id:req.params,id})
        if (!user) {
            res.json({message:"User not found",state:404,success:false })
        }
        res.json({message:"User fetched successfuly",state:200,success:true,user})
    }
    catch(err){
        console.log(err);
    }
}

exports.destroy=async (req,res)=>{
    try{
    const user = await User.findOneAndDelete({_id:req.params.id})
    if (!user) {
        res.json({message:"User Not Found",state:404,success:false})
    }
    res.json({message:"User Deleted Successfuly",state:200,success:true})
}
catch(err){
    console.log(err);
}
}

exports.update=async (req,res)=>{
    try{
        const user =await User.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
        if (!user) {
            res.json({message:"User Not Found",state:404,success:false})
        }
        res.json({message:"User Updated Sueecssfuly",state:200,success:true,user})

    }
    catch(err){
        console.log(err);
    }
}