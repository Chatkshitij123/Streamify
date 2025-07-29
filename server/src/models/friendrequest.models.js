import mongoose, {Schema} from "mongoose";

const friendRequestSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending","accepted"],
        default: "pending"
    },
},
{
    timestamps: true
})

export const FriendRequest = mongoose.model("FriendRequest",friendRequestSchema);