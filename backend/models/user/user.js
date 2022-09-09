const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const crypto=require('crypto');

const userSchema=new mongoose.Schema({
    firstName:{
        required: [true,"first name is required"],
        type: String
    },
    lastName:{
        required: [true,"last name is required"],
        type: String
    },
    profilePhoto:{
        type:String,
        default:"url"
    },
    email:{
       type:String,
       required: [true,"email is required"],
       unique: true
    },
    bio:{
        type:String,
    },
    password:{
        type:String,
        required: [true,"password is required"]
    },
    postCount:{
        type:Number,
        default:0
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["admin","Guest","Blogger"]
    },
    isFollowing:{
        type:Boolean,
        default:false
    },
    isUnFollowing:{
        type:Boolean,
        default:false
    },
    isAccVerified:{
         type:Boolean,
         default:false
    },
    accVerificationToken:String,
    accVerificationTokenExpires:Date,
    viewedBy: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
    },
    followers: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
    },
    following: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    active: {
        type: Boolean,
        default: false,
    },
    
},
{
    toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,

});

//virtual method to populate created post
userSchema.virtual("posts", {
  ref: "Post",  //post schema model
  foreignField: "user",
  localField: "_id",
});

// accnt type
userSchema.virtual('accountType').get(function(){
  const totalFollowers=this.totalFollowers?.length;
  return totalFollowers >=4? 'Pro Account' : 'Starter Account';
});

//hash password
userSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
    next();
});

// match password
userSchema.methods.isPasswordMatched=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//Verify account
userSchema.methods.createAccountVerificationToken = async function () {
    //create a token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    this.accVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    this.accVerificationTokenExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return verificationToken;
  };


// pswrd reset
//Password reset/forget

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return resetToken;
  };


const User=mongoose.model('User',userSchema);
module.exports=User;