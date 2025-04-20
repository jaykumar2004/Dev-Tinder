const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://jaykumar_2004:QU6AgFgJLkhnm2uI@namastenode.f1wdwtr.mongodb.net/");
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

module.exports = connectDb;
