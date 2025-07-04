import mongoose from "mongoose";


const MONGO_URL = process.env.MONGODB_URL;


if (!MONGO_URL) {
    throw new Error("Mongo Url not defined.");
}

export function ConnectDB() {
    mongoose.connect(MONGO_URL).then(() => { console.log("Connected to Database.") }).catch((err) => console.error("Error while connecting to the database.", err));

}