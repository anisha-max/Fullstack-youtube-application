import mongoose, { model, models, Schema, Types } from "mongoose";

export interface ISubscribe{
    subscriber : Types.ObjectId;
    channel: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const subscribeSchema  = new Schema<ISubscribe>({
    subscriber:{type: Schema.Types.ObjectId , ref:"User" , required:true},
    channel:{type: Schema.Types.ObjectId , ref:"User" , required:true}
},{timestamps:true})

const Subscribe = models?.Subscribe || model<ISubscribe>("Subscribe" , subscribeSchema)

export default Subscribe