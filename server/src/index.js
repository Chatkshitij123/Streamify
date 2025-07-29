import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express"

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 if (process.env.NODE_ENV === "production") {

  
      const clientBuildPath = path.join(__dirname, "../../client/dist");

app.use(express.static(clientBuildPath));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

    }


connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERR: ", error);
        throw error;
    });

    app.listen(process.env.PORT || 9000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    });
})


