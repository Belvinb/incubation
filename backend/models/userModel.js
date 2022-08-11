const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        companyname:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
        },
        phone:{
            type:Number,
            required:true,
        },
        password:{
            type:String,
            required:true
        }
    },
    {
        timeStamps:true

    }
)

const applicationSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  teambackground: {
    required: true,
    type: String,
  },
  products: {
    required: true,
    type: String,
  },
  problem: {
    required: true,
    type: String,
  },
  unique: {
    required: true,
    type: String,
  },
  valueproposition: {
    required: true,
    type: String,
  },
  competition: {
    required: true,
    type: String,
  },
  revenuemodel: {
    required: true,
    type: String,
  },
  marketsize: {
    required: true,
    type: String,
  },
  marketingplan: {
    required: true,
    type: String,
  },
  incubationtype: {
    required: true,
    type: String,
  },
  businessproposal: {
    required: true,
    type: String,
  },
  pending:{
    type:Boolean,
    default:true,
  },
  underProgress:{
    type:Boolean,
    default:false,
  },
  Approved:{
    type:Boolean,
    default:false,
  },
  Declined:{
    type:Boolean,
    default:false
  }
  
});


// userSchema.pre("save", function (next) {
//   const user = this;

//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, function (saltError, salt) {
//       if (saltError) {
//         return next(saltError);
//       } else {
//         bcrypt.hash(user.password, salt, function (hashError, hash) {
//           if (hashError) {
//             return next(hashError);
//           }

//           user.password = hash;
//           next();
//         });
//       }
//     });
//   } else {
//     return next();
//   }
// });

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchpassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',userSchema)
const Application = mongoose.model('Application', applicationSchema);

module.exports = {User,Application}