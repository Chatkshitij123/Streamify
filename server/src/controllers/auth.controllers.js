import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validateEmail } from "../utils/helper.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import ms from "ms";
import { upsertStreamUser } from "../utils/stream.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the access and refershToken"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!validateEmail(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or fullName already exists");
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "Avatar file is required");
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath);

  // if (!avatar) {
  //   throw new ApiError(400, "Avatar upload failed");
  // }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  try {
    await upsertStreamUser({
      id: user._id.toString(),
      name: user.fullName,
      
    });
    console.log(`Stream user created for ${user.fullName}`);
  } catch (error) {
    console.error("Error creating Stream user:", error);
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const isProduction = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: createdUser,
          accessToken,
          refreshToken,
        },
        "User Registered Successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!(email || fullName)) {
    throw new ApiError(400, "Fullname or email is required");
  }

  //find the user on the basis of the email
  const user = await User.findOne({
    $or: [{ fullName }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User doesnot exist");
  }

  //password check
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id);

  const isProduction = process.env.NODE_ENV === "production";

  //options for cookies
  const options = {
    httpOnly: true, //prevent XSS attacks
    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
    sameSite: isProduction ? "none" : "lax", //prevent CSRF attacks
    secure: isProduction,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );

  //now send it in cookies
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true, //server can modify it but not the user
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  //need raw token to match and save in our database

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }
    const isProduction = process.env.NODE_ENV === "production";
    const options = {
      httpOnly: true, //prevent XSS attacks
      sameSite: isProduction, //prevent CSRF attacks
      secure: isProduction,
      maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const onboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { fullName, bio, nativeLanguage, learningLanguage, location } =
    req.body;

  const requiredFields = {
    fullName,
    bio,
    nativeLanguage,
    learningLanguage,
    location,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => typeof value !== "string" || value.trim() === "")
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new ApiError(400, "All fields are required", missingFields);
  }

    let avatarUrl = undefined;

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (avatarLocalPath) {
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar?.url) {
      throw new ApiError(400, "Avatar upload failed");
    }
    avatarUrl = avatar.url;
  }

  const updateData = {
    fullName,
    bio,
    nativeLanguage,
    learningLanguage,
    location,
    isOnboarded: true,
  };

  if (avatarUrl) {
    updateData.avatar = avatarUrl;
  }


  const updatedUser = await User.findByIdAndUpdate(
    userId, updateData,
    { new: true }
  );
  //new - give us the updated user object

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  try {
    await upsertStreamUser({
      id: updatedUser._id.toString(),
      name: updatedUser.fullName,
      image: updatedUser.avatar || "",
    });
    console.log(`Stream user created for ${updatedUser.fullName}`);
  } catch (error) {
    console.error("Error creating Stream user:", error);
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User onboarded successfully"));
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200,req.user,"User details fetched successfully")
  )
})

export { registerUser, loginUser, logoutUser, refreshAccessToken, onboard, getUser };
