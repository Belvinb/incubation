const asyncHandler = require("express-async-handler");
const { User, Application } = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { companyname, email, phone, password } = req.body;

  const companyExist = await User.findOne({ companyname });
  if (companyExist) {
    res.status(400);
    throw new Error("company already exists");
  }
  const user = await User.create({
    companyname,
    email,
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      companyname: user.companyname,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Some error occured");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchpassword(password))) {
    res.json({
      _id: user._id,
      companyname: user.companyname,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const submitApplication = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    city,
    state,
    email,
    phone,
    companyname,
    image,
    teambackground,
    products,
    problem,
    unique,
    valueproposition,
    competition,
    revenuemodel,
    marketsize,
    marketingplan,
    incubationtype,
    businessproposal,
  } = req.body;

  const companyExists = await Application.findOne({ companyname });
  if (companyExists) {
    res.status(400);
    throw new Error("Company already registered");
  }
  const companyRegister = await Application.create({
    name,
    address,
    city,
    state,
    email,
    phone,
    companyname,
    image,
    teambackground,
    products,
    problem,
    unique,
    valueproposition,
    competition,
    revenuemodel,
    marketsize,
    marketingplan,
    incubationtype,
    businessproposal,
  });

  if(companyRegister){res.status(201).json({
    _id: companyRegister._id,
    name: companyRegister.name,
    address: companyRegister.address,
    city: companyRegister.city,
    state: companyRegister.state,
    email: companyRegister.email,
    phone: companyRegister.phone,
    companyname: companyRegister.companyname,
    image: companyRegister.image,
    teambackground: companyRegister.teambackground,
    products: companyRegister.products,
    problem: companyRegister.problem,
    unique: companyRegister.unique,
    valueproposition: companyRegister.valueproposition,
    competition: companyRegister.competition,
    revenuemodel: companyRegister.revenuemodel,
    marketsize: companyRegister.marketsize,
    marketingplan: companyRegister.marketingplan,
    incubationtype: companyRegister.incubationtype,
    businessproposal: companyRegister.businessproposal,
  });

  }
});

const checkStatus = asyncHandler(async(req,res)=>{
  try{
    console.log(req.params.email,"email arsms")
    const {email} = req.params
    const underProcess = await Application.find({ email });
    console.log(email)
    if(underProcess){
      console.log("sucess")
      console.log(underProcess)
      res.status(201).json(underProcess)
    }
  }catch(err){
    res.status(400)
    throw new Error("some error occured yallaaaaa")
    console.log(err)
  }
})



module.exports = { registerUser, authUser, submitApplication, checkStatus };
