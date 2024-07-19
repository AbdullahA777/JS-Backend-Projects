// db connection code
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

if (!process.env.MONGO_URI) {
    console.log('Error: MONGO_URI Environment Variables Is Not Set.');
    process.exit(1)
}

const dbConnect = async () => {
    console.log(process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("Error While Connecting to DB:", error);
        process.exit(1); // Exit the process with failure
    }

};

// Optional: Handle graceful shutdown
process.on('SIGINT', async () => {

    try {
        await mongoose.connection.close();
        console.log("MongoDB Connection Closed Successfully!");
        process.exit(0); // Exit the process successfully
    } catch (error) {
        console.error("Error While Closing DB Connection:", error);
        process.exit(1); // Exit the process with failure
    }

});

export { dbConnect };
