import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true, index: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: [true, "password required"] },
    coverImage: { type: String, required: true },
  watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
}, { timestamps: true })

userSchema.pre("save" ,async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10)
    }
    next()
} )


const User = models?.User || model("User" , userSchema)
export default User;
