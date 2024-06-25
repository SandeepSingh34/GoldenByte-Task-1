import mongoose from "mongoose";

let conn = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/GoldenByte");
        console.log("Connected Successfully");
    }
    catch (e) {
        console.log("Connection faild");
    }

}


let Signup=mongoose.Schema({
    email:{type:String},
    password:{type:String},
    userType:{type:String}
})



const SignupModel=mongoose.model("Signup",Signup);

export {conn,SignupModel};