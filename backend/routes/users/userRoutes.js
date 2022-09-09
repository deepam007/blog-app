const express = require("express");
const { userRegisterCtrl ,loginUserCtrl,fetchUsersCtrl ,deleteUsersCtrl,
fetchUserDetailsCtrl,userProfileCtrl,updateUserCtrl
,updateUserPasswordCtrl,followingUserCtrl,
unfollowUserCtrl,blockUserCtrl,unBlockUserCtrl
,generateVerificationTokenCtrl,accountVerificationCtrl,forgetPasswordToken,
passwordResetCtrl,profilePhotoUploadCtrl} = require("../../controllers/users/userctrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const { photoUpload,profilePhotoResize } = require("../../middlewares/uploads/profilephoto");




const userRoutes=express.Router();

userRoutes.post("/register",userRegisterCtrl);
userRoutes.post("/login",loginUserCtrl);
userRoutes.delete("/:id",deleteUsersCtrl);
userRoutes.get("/",authMiddleware,fetchUsersCtrl);
userRoutes.get("/:id",fetchUserDetailsCtrl);
userRoutes.get("/profile/:id",authMiddleware,userProfileCtrl );
userRoutes.put("/profile-photo",authMiddleware,photoUpload.single("image"),
profilePhotoResize,profilePhotoUploadCtrl );
userRoutes.put("/reset-password",passwordResetCtrl );
userRoutes.put("/verify-account",authMiddleware,accountVerificationCtrl );
userRoutes.put("/",authMiddleware,updateUserCtrl );
userRoutes.put("/password/:id",authMiddleware,updateUserPasswordCtrl );
userRoutes.put("/follow",authMiddleware,followingUserCtrl );
userRoutes.put("/unfollow",authMiddleware,unfollowUserCtrl );
userRoutes.put("/block-user/:id",authMiddleware,blockUserCtrl );
userRoutes.put("/unblock-user/:id",authMiddleware,unBlockUserCtrl );
userRoutes.post("/forget-password-token",forgetPasswordToken );

userRoutes.post("/generate-verify-email-token",authMiddleware,generateVerificationTokenCtrl );





module.exports=userRoutes;

