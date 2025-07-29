import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateStreamToken } from "../utils/stream.js";

const getStreamToken = asyncHandler(async(req,res) => {
    const token = generateStreamToken(req.user._id);
    res.status(200).json(
        new ApiResponse(200,{token},"Token generated successfully")
    )
})

export {
    getStreamToken
}