const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 1,
        maxlength : 50
    },
    lastName : {
        type: String
    },
    emailId : {
        type : String,
        lowercase : true,
        required : true,
        unique: true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        validate(value) {
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://geographyandyou.com/images/user-profile.png"
    },
    about: {
        type: String,
        default : "This is the default about of the user!"
    },
    skills : {
        type : [String]
    },
    contact : {
        type : String
    }
},
{
    timestamps : true
}
);

module.exports = mongoose.model("User", userSchema);







