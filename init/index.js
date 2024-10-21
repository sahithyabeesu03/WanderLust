const mongoose = require("mongoose");
const { data: initData } = require("./data.js"); // Correctly destructure the data array
const Listing = require("../models/listing.js");

console.log(initData); // This line checks the contents of initData

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connection successful");
  } catch (err) {
    console.log("Connection error:", err);
  }
}

const initDB = async () => {
  try {
    console.log(Array.isArray(initData)); // Check if initData is an array
    await Listing.deleteMany({});
    const updatedData = initData.map((obj) => ({
      ...obj,
      owner: '6697b3d8dc81e3045ccb442d', // Adding owner to each listing
    }));
    const res = await Listing.insertMany(updatedData);
    console.log(res);
    console.log("data was initialized");
  } catch (err) {
    console.log("Initialization error:", err);
  }
};

main().then(initDB);
