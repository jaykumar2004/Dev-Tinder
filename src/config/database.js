const mongoose = require("mongoose");

const connectDb = async()=>{
    await mongoose.connect(
        "mongodb+srv://jaykumar_2004:QU6AgFgJLkhnm2uI@namastenode.f1wdwtr.mongodb.net/devTinder"
    );
}

module.exports = connectDb;

