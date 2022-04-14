const mongoose = require("mongoose");

const post = mongoose.model(
    "Post",
    mongoose.Schema(
        {
            postAuthor: {
                type: String,
                required: false,
            },
            postTitle: {
                type: String,
                required: true,
                unique: true,
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                required: "Category",
            },
            postDetails: {
                type: String,
                require: true
            },
            postShortSummery: {
                type: String,
                require: false
            },
            postImage: {
                type: String,
            },
            postDate: {
                type: Date,
                default: Date.now
            }
        },
        {
            timestamps: { createdAt: true, updatedAt: false }
        },
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.postId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                },
            }
        }
    )
);

module.exports = {
    post
}