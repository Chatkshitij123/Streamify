import { StreamChat} from "stream-chat"
import "dotenv/config"

const api_key = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if(!(api_key || apiSecret)) {
    console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(api_key, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        // console.log("Stream user upserted:", userData.id);
        return userData
    } catch (error) {
        console.error("Error upserting Stream user:", error);
    }


}

export const generateStreamToken = (userId) => {
    try {
       //ensure userId is a string
       const userIdStr = userId.toString();
       return streamClient.createToken(userIdStr) 
    } catch (error) {
        console.error("Error generating Stream token:", error)
    }
}