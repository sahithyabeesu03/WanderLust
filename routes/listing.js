const express = require("express");
const router = express.Router(); 
const wrapAsync = require("../utils/wrapAsyc.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image][url]"),
        validateListing,
        wrapAsync(listingController.createListing))
        .get(wrapAsync(listingController.index));


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// // Search Route
// router.get("/search", wrapAsync(async (req, res) => {
//     const { location } = req.query;
//     const listings = await Listing.find({ location: new RegExp(location, 'i') }); // Case-insensitive search
//     res.render("search", { listings, location });
// }));

// Search Route
router.get("/search", wrapAsync(async (req, res) => {
    const { location, country } = req.query;

    // Build query object based on provided parameters
    let query = {};
    if (location) {
        query.location = new RegExp(location, 'i'); // Case-insensitive search for location
    }
    if (country) {
        query.country = new RegExp(country, 'i'); // Case-insensitive search for country
    }

    // Find listings based on query
    const listings = await Listing.find(query);

    // Render search results
    res.render("search", { listings, location, country });
}));



router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image][url]"),
        validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

 
// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
