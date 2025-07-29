import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { getUser, loginUser, logoutUser, onboard, refreshAccessToken, registerUser } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router();

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)


//secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(verifyJWT,refreshAccessToken)
router.route("/onboarding").post(verifyJWT,upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),onboard)
router.route("/me").get(verifyJWT,getUser)

export default router;

