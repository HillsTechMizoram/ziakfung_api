const { post } = require("../models/posts.model");
const { category } = require("../models/category.model");
const { MONGO_DB_CONFIG } = require("../config/app.config");

async function createPost(params, callback) {
    if (!params.postTitle) {
        return callback(
            {
                message: "Post Title required",
            },
            ""
        );
    }

    if (!params.category) {
        return callback(
            {
                message: "Category required",
            },
            ""
        );
    }

    const productModel = new post(params);
    productModel.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getPost(params, callback) {
    const postTitle = params.postTitle;
    const categoryId = params.categoryId;
    var condition = {};

    if (postTitle) {
        condition["postTitle"] = {
            $regex: new RegExp(postTitle), $options: "i"
        };
    }

    if (categoryId) {
        condition["category"] = categoryId;
    }

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    post
        .find(condition, "postId postAuthor postDate postTitle postDetails postShortSummery postImage createdAt updatedAt ")
        .sort(params.sort)
        .populate("category", "categoryName categoryImage")
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}


async function getPostById(params, callback) {
    const postId = params.postId;

    post
        .findById(postId)
        .populate("category", "categoryName categoryImage")
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updatePost(params, callback) {
    const postId = params.postId;

    post
        .findByIdAndUpdate(postId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) {
                callback(`Cannot update Post with id ${postId}`)
            }
            else callback(null, response);

        })
        .catch((error) => {
            return callback(error);
        });
}

async function deletePost(params, callback) {
    const postId = params.postId;

    post
        .findByIdAndRemove(postId)
        .then((response) => {
            if (!response) {
                callback(`Cannot update Post with id ${postId}`)
            }
            else callback(null, response);

        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost
};

