import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { app } from "../app.js";
const connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`\n MONGODB connected !! : ${connectionInstance.connection.host} `)     
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}
export default connectDB
// Replace your existing app.listen with this:

app.listen(process.env.PORT || 8000, () => {
    console.log(`✅✅✅ server is actually running at port : ${process.env.PORT || 8000}`);
    console.log(`🔍 Try this URL: http://localhost:${process.env.PORT || 8000}/api/v1/users`);
}).on('error', (err) => {
    console.log("🔥🔥🔥 SERVER FAILED TO START:");
    console.log("Error name:", err.name);
    console.log("Error message:", err.message);
    console.log("Full error:", err);
});

// Add this to test if Express is working
app.get("/test", (req, res) => {
    res.send("Server is working!");
});