const asyncHandler = require('express-async-handler');
const { trusted } = require('mongoose');
const Admin = require('../models/adminModel')
const {User,Application} = require('../models/userModel')
const generateToken = require('../utils/generateToken');


const registerAdmin = asyncHandler(async(req,res)=>{
    const {email,password,isAdmin} = req.body

    const adminExists = await Admin.findOne({email})
    if(adminExists){
        res.status(400)
        throw new Error("Admin already exists")
    }
    const admin = Admin.create({
        email,
        password,
        isAdmin

    })
    if(admin){
        res.json(admin)
        res.status(201).json({
            _id:admin._id,
            email:admin.email,
            password:admin.password,
            isAdmin:admin.isAdmin,
            token:generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error("some error occured")
    }
}
)

const authAdmin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const admin = await Admin.findOne({email})
    if(admin && (await admin.matchpassword(password))){
        res.json({
            _id:admin._id,
            email:admin.email,
            isAdmin:admin.isAdmin,
            token : generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid email or password")
    }
}

)

const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})
    if(users){
        res.json(users)

    }else{
        res.status(400)
        throw new Error("some error occured")
    }
})

const deleteUser = asyncHandler(async(req,res)=>{
    try {
        
        const user = await User.findById(req.query.id)
        await user.remove()
        res.json({})
    } catch (error) {
        res.json(error)
    }
})

const getUser = asyncHandler(async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId)
        res.json(user)
    }catch(error){
        res.json(error)
    }
})

//update a user details
const updateUser = asyncHandler(async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };
    const user = await User.findByIdAndUpdate(req.params.userId, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.json(error);
  }
});


const getPending = asyncHandler(async (req, res) => {
  try {
    const pending = await Application.find({"pending":true});
    
    if (pending) {

      res.json(pending);
    }
  } catch (error) {
    res.json(error);
  }
});

const getDeclined = asyncHandler(async (req, res) => {
  try {
    const declined = await Application.find({$or:[{"underProgress":true},{"Approved":true},{"Declined":true}]});
    if (declined) {
      res.json(declined);
    }
  } catch (error) {
    res.json(error);
  }
});

const startProcess = asyncHandler(async(req,res)=>{
  try {
    const id = req.body.rowId
   
   
    
    const processStarted = await Application.findByIdAndUpdate(
      id,
      {"pending":false,"underProgress": true },
      
    );
    if(processStarted){
     
      res.status(200)
    }
  } catch (error) {
    
  }
})

const declineProcess = asyncHandler(async(req,res)=>{

  try {
    
    const id = req.body.declineId
    console.log(id)
    const decline = await Application.findByIdAndUpdate(id,{"underProgress":false,"Declined":true})
    if(decline){
      res.status(200)
    }
  } catch (error) {
    console.log(error)
    
  }
});

const approveProcess = asyncHandler(async (req, res) => {
  try {
    const id = req.body.approveId;
    console.log(id);
    const approve = await Application.findByIdAndUpdate(id, {
      "underProgress": false,
      "Approved": true,
    });
    if (approve) {
      res.status(200);
    }
  } catch (error) {
    console.log(error);
  }
});

const recordList = asyncHandler(async (req,res)=>{
  try {
    const records = await Application.find({})
    if(records){
      console.log(records)
      res.json(records).status(200);
    }
    
  } catch (error) {
    
  }
})

const viewDetails = asyncHandler(async (req,res)=>{
  let applicationId = req.params.applicationId
  try {
    const details = await Application.findById(applicationId)
    res.json(details)
  } catch (error) {
    res.json(error)
  }
})

module.exports = {
  registerAdmin,
  authAdmin,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
  getPending,
  getDeclined,
  startProcess,
  declineProcess,
  approveProcess,
  recordList,
  viewDetails,
};