import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js"
import { FriendRequest } from "../models/friendrequest.models.js"

const getRecommendedUsers = asyncHandler(async(req, res) => {
    const currentUserId = req.user._id;
    const currentUser = req.user

    const recommendedUsers = await User.find({
        $and: [
            {_id: {$ne: currentUserId}}, //exclude current user
            {_id: {$nin: currentUser.friends}},//exclude curent users friends
            {isOnboarded: true}
        ]
    })
    res.status(200).json(
        new ApiResponse(200,recommendedUsers,"Recommended Users fetched Successfully")
    )

});

const getMyFriends = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id).select("friends").populate("friends","fullName avatar nativeLanguage learningLanguage");
    res.status(200).json(
        new ApiResponse(200, user.friends,"Friends get successfully")
    )
});

const sendFriendRequest = asyncHandler(async(req,res) => {
    //my current id
    //id of the another user 
    //prevent sending request to yourself
    //check recipeint exist in database
    //check we are already friend
    //check if a req is already exist
    //create a friend request
    //then send response
    const myId = req.user._id;
    const { id: recipientId} = req.params;

    //prevent sending reuest to yourself
    if (myId === recipientId) {
        throw new ApiError(400,"You can't send friend request to yourself");
    }

    const recipient = await User.findById(recipientId);
    if(!recipient) {
        throw new ApiError(404, "Recipient not found")
    }

    if(recipient.friends.includes(myId)) {
        throw new ApiError(400).json("You are already friends with this user")
    };

    //check if a req is already exist
    const existingRequest = await FriendRequest.findOne({
        $or: [
            {sender:myId, recipient:recipientId},
            {sender:recipientId, recipient:myId}
        ]
    });

    if(existingRequest){
        throw new ApiError(400,"A friend request already exists between you and this user");
    }

    const friendRequest = await FriendRequest.create({
        sender: myId,
        recipient: recipientId
    });

    res.status(201).json(
        new ApiResponse(200,friendRequest,"Friend Request send successfully")
    )
})

const acceptFriendRequest = asyncHandler(async(req, res) => {
    //we get the id through the req.params
    //find friend request in database
    //check if friend request exists or not
    //verify the current user is the recipient
     //change the status to accepted
     //then save the frined req in the database
     //add each user to the other's friend array
     //send the response

    const {id:requestId} = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if(!friendRequest) {
        throw new ApiError(404,"Friend Request not found");
    }

    //verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
        throw new ApiError(403,"You are not authorized to accept this request")
    }

    //change the status to accepted
    friendRequest.status = "accepted";
    await friendRequest.save();

    //add each user to the other's friend array
    //$addToSet: adds element to an array only if they donot already exist
    await User.findByIdAndUpdate(friendRequest.sender, {
        $addToSet: { friends: friendRequest.recipient},
    })

    await User.findByIdAndUpdate(friendRequest.recipient, {
        $addToSet: { friends: friendRequest.sender},
    })

    res.status(201).json(
        new ApiResponse(200,
            {},
            "Friend Request accepted successfully"
        )
    )

})

const getFriendRequests = asyncHandler(async(req,res) => {
    //fetch the incoming requests
    //fetch the acceptedRequests
    //send response
    const incomingRequests = await FriendRequest.find({
        recipient: req.user._id,
        status: "pending"
    }).populate("sender", "fullName avatar nativeLanguage, learningLanguage");

    const acceptedRequests = await FriendRequest.find({
        sender: req.user._id,
        status: "accepted"
    }).populate("recipient", "fullName avatar");

    res.status(201).json(
        new ApiResponse(200,{
            incomingRequests,
            acceptedRequests
        },"Friend Request fetched successfully")
    )
})

const getOutgoingFriendRequests = asyncHandler(async(req, res) => {
    const outgoingRequests = await FriendRequest.find({
        sender: req.user._id,
        status: "pending"
    }).populate("recipient", "fullName avatar nativeLanguage learningLanguage");

    res.status(201).json(
        new ApiResponse(200,outgoingRequests,"Outgoing Friend Requests Fetched successfully")
    )
})



export {
    getRecommendedUsers,
    getMyFriends,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequests,
    getOutgoingFriendRequests
}