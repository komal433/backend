import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadonCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async (req,res) => {
    //get user detail from frontend(postmen)
    //validation(emoty toh nhi h or galat syntax)
    // check if user exist: username ,emial
    //check for images,check for avatar
    //upload them to cloudinary,avatar
    //create user object-create entry in db
    // romove pass and refresh token from response
    //check for user creation
    //return res

    const {fullName, email, username, password} = req.body
     console.log("email:", email);

     if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
) {
    throw new ApiError(400, "All fields are required")
}
const existedUser = User.findOne({
    $or: [{username},{email}]
})
if(existedUser){
    throw new ApiError(409,"user with email or username already exist")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400,"avatar file is required")

}

const avatar = await uploadonCloudinary(avatarLocalPath)
const coverImage = await uploadonCloudinary(coverImageLocalPath)
if(!avatar){
    throw new ApiError(400,"avatar file is required")

}
const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser){
    throw new ApiError(500,"someting went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200, createdUser, "user registered successfully")
)

})

export {
    registerUser}