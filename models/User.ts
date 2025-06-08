import mongoose  , {Types, model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface Iuser {
    username: string;
    email: string;
    password: string;
    coverImage: string | null;
    watchHistory: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<Iuser>({
    username: { type: String, required: true, unique: true, trim: true, index: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: [true, "password required"] },
    coverImage: { type: String, required: true },
    watchHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
   

}, { timestamps: true })

userSchema.pre("save" ,async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10)
    }
    next()
} )


const User = models?.User || model<Iuser>("User" , userSchema)
export default User;
