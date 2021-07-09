const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const { saltRounds, statusCode, jwt_expire } = require("../../../lib/constants");
const env = require("../../../config/environment");

module.exports.signUp = async (req, res) => {
    try{
       const { name, email, password } = req.body;

       //Find User by email
       let user = await User.findOne({email});
       
       if (user) {
        return res.status(statusCode.UnprocessableEntity).json({ 
            message: "User already in database",
            success: false
        })
       } 
       
       //Hash Password
       let salt = bcrypt.genSaltSync(saltRounds);
       let hashPassword = bcrypt.hashSync(password, salt);
       
       //Create User with hashPassword
       user = await User.create({
             email,
             name,
             password: hashPassword,
       });
       
       //AccessToken
       const accessToken = jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn: jwt_expire,});
       
       return res.status(statusCode.OK).json({ 
           message : "SignUp Successful",
           success: true,
           accessToken : accessToken,
       })

    } catch (err) {
        return res.status(statusCode.InternalServerError).json({ 
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports.signIn = async (req, res) => {
    try{
        const { email, password } = req.body;
    
        //Find User by email
        let user = await User.findOne({email});
       
        if (!user) {
         return res.status(statusCode.Unauthorized).json({ 
            message: "Invalid Username",
            success: false
         })
        } 

        //Password match
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(statusCode.Unauthorized).json({ 
               message: "Invalid Username",
               success: false
            })
        } 

       //AccessToken
       const accessToken = jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn: jwt_expire,});
       
       return res.status(statusCode.OK).json({ 
           message : "SignIn Successful",
           success: true,
           accessToken : accessToken,
       });

    } catch (err) {
        return res.status(statusCode.InternalServerError).json({ 
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports.profile = async (req, res) => {
    try{
        const { id } = req.params;
    
        let user = User.findById(id);

        if(user) {
          return res.status(statusCode.OK).json({ 
             message : "User Profile",
             success: true,
             user,
          })
        }

        return res.status(statusCode.Unauthorized).json({ 
            message: "You cannot view the Profile",
            success: false
         });

    } catch (err) {
        return res.status(statusCode.InternalServerError).json({ 
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports.update = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, email } = req.body;
    
        //Find User
        let user = User.findById(id);

        if(req.userId === id) {
            user.name = name;
            user.email = email;
            user.save();

          return res.status(statusCode.OK).json({ 
             message : "Profile Updated Sucessfully",
             success: true,
          })
        }

        return res.status(statusCode.Unauthorized).json({ 
            message: "You cannot update the Profile",
            success: false
         });

    } catch (err) {
        return res.status(statusCode.InternalServerError).json({ 
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports.allUsers = async (req, res) => {
    try{
        //Find All users
        let users = User.find({});

        return res.status(statusCode.OK).json({ 
             message : "All Users",
             success: true,
             users
        })

    } catch (err) {
        return res.status(statusCode.InternalServerError).json({ 
            message: "Internal Server Error",
            success: false
        })
    }
}