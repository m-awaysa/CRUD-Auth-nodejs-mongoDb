const { userModel } = require('./../../DB/model/user.model');
const  userController  = require('./controller/user.controller');

const router = require('express').Router();


// router.get('/',(req,res)=>{
//     const users = userModel.find();
//     res.json({message:"user page"});
// });

router.post('/signup', userController.signup);
router.post('/signin', userController.signIn);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/data/:id', userController.getUserData);
router.get('/filter/name', userController.filterByName);
router.get('/filter/age', userController.filterByAge);

module.exports = router;