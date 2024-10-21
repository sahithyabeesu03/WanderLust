const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        category: joi.string().valid(
            'Trending',
            'Iconic Cities',
            'Mountains',
            'Castles',
            'Camps',
            'Amazing Pools',
            'Lake Side'
        ).required(), 
        image: joi.object({
            url: joi.string(),
            filename: joi.string()
        }).optional()
    }).required(),
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required(),
    }).required(),
});

