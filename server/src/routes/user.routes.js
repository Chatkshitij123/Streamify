import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js"
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequests, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controllers.js";


const router = Router();

//apply verifyjwt to every single route
router.use(verifyJWT)

router.route("/").get(getRecommendedUsers);
router.route("/friends").get(getMyFriends);

router.route("/friend-request/:id").post(sendFriendRequest);
router.route("/friend-request/:id/accept").put(acceptFriendRequest)
router.route("/friend-requests").get(getFriendRequests)
router.route("/outgoing-friend-requests").get(getOutgoingFriendRequests)

export default router;