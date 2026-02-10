import  { model, models, Schema } from "mongoose";

const subscribeSchema  = new Schema({
    subscriber:{type: Schema.Types.ObjectId , ref:"User" , required:true},
    channel:{type: Schema.Types.ObjectId , ref:"User" , required:true}
},{timestamps:true})

const Subscribe = models?.Subscribe || model("Subscribe" , subscribeSchema)

export default Subscribe