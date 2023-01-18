const { userModel } = require("../../../DB/model/user.model");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//register
const signup = async (req, res) => {
    const { firstName,lastName, email, password, cPassword,age } = req.body;
    if(password ==cPassword) 
     {      
    const user = await userModel.findOne({ email: email });
    if (user == null) {
        const hashPassword = await bcrypt.hash(password,8)
       
        const newUSer = new userModel({
            firstName,
            lastName,
             email,
             age,
            password: hashPassword
        });
        const savedUser = await newUSer.save();
        
        res.json({ message: "success", savedUser });
    } else {
        res.json({ message: "email already exist" });
    }
    }else{
        res.json({ message: "password mis match confirmation password"});

    }

}
//sign in {login}
const signIn = async (req, res) => {
    const {email, password } = req.body;
    const user = await userModel.findOne({email});
    if(user){
        const match = await bcrypt.compare(password,user.password);
        if(match){
            const token = jwt.sign({id:user._id},'mohammedAwaysa@password');
            res.json({message:'ok', token});
        }else{
            res.json({message:'invalid data'});
        }
       
    }else{
        res.json({message:'invalid data'});
    }
}
//update 
const updateUser = async (req, res)=> {

    const {id}= req.params;
    const {firstName,lastName,email, age} = req.body;

    const user =await userModel.findOneAndUpdate(
        {_id:id}, 
        {
            firstName,lastName,email, age
        },
        {
            new:true
        }
    );

res.json({message:'success',user});
}
//delete
const deleteUser = async(req, res)=> {
    const {id}= req.params;
    const user =await userModel.findOneAndDelete(
        {_id:id},
    );
res.json({message:'success',user});
}
//get suer data
const getUserData = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findOne({_id:id});
    res.json({ message: 'ok', user });
}
//filterByName
const filterByName = async (req, res) => {
    const users = await userModel.find().or([{ lastName:{$regex: '(.*)a(.*)'} }, {firstName:{$regex: '(.*)a(.*)'}}]);
    
    // {firstName:{$regex: '(.*)a(.*)'}, lastName:{$regex: '(.*)a(.*)'}}
    res.json({ message: 'ok', users });
}
//filterByAge
const filterByAge = async (req, res) => {
    const users = await userModel.find({ age: {$lt:30}});

    res.json({ message: 'ok', users });
}

module.exports = { signup, filterByName, signIn, updateUser, deleteUser,filterByAge,getUserData };