import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// @desc Authorize User
// route POST /api/users/auth
// @access PUBLIC
const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password){
        res.status(400);
        throw new Error('All input details are required.');
    };

    const user = await User.findOne({email});

    if (user && await user.matchPasswords(password)){
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });  
    } else{
        res.status(401);
        throw new Error('Invalid email or password.');
    };
});


// @desc Register User
// route POST /api/users/register
// @access PUBLIC
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password){
        res.status(400);
        throw new Error('All input details are required.');
    };

    const userExists = await User.findOne({email});

    if (userExists){
        res.status(400);
        throw new Error('User already exists...');
    };

    const user = await User.create({name, email, password});

    if (user){
        res.status(201).json({
            _id: user.id,
            name,
            email
        }) 
    } else{
        res.status(400);
        throw new Error('Invalid user data.');
    };
});


// @desc Logutuser
// route POST /api/users/logout
// @access PUBLIC
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({message: 'User logged out.'});
});


// @desc GET User Profile
// route GET /api/users/profile
// @access PRIVATE
const getuserprofile = asyncHandler(async(req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
});


// @desc Update User Profile
// route PUT /api/users/profile
// @access PRIVATE
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password){
            user.password = req.body.password;
        };

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else{
        res.status(404);
        throw new Error('User not found...');
    };
});


export {
    authUser,
    registerUser,
    logoutUser,
    getuserprofile,
    updateUser,
};