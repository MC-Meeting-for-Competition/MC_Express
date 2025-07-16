import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["M", "F"]
    },
    birth: {
        type: Date,
    },
    cart: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: "Item",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);