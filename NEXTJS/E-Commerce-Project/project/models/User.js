import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 12
    }




}, { timestamps: true })


const User = models.User || model('User', userSchema); // agar already model hua wa he? then select the collection, but if not? then, create one..!

export default User;