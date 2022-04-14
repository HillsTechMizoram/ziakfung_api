const postServices = require("../services/posts.service");
const upload = require("../middleware/posts.upload");

exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                postAuthor: req.body.postAuthor, 
                postTitle: req.body.postTitle, //title of post
                category: req.body.category, //category of post
                postShortSummery: req.body.postShortSummery, //short summery
                postDetails: req.body.postDetails, //Article body
                postImage: path != "" ? "/" + path : "",
                postDate: req.body.postDate,
            };

            postServices.createPost(model, (error, results) => {
                if (error) {
                    return next(error);
                }
                else {
                    return res.status(200).send({
                        message: "Success",
                        data: results,
                    });
                }

            })
        }
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        postAuthor: req.query.postAuthor, 
        postTitle: req.query.postTitle,
        categoryId: req.query.categoryId,
        pageSize: req.query.pageSize,
        postDate: req.query.postDate,
        page: req.query.page,
        sort: req.query.sort

    };
    postServices.getPost(model, (error, results) => {
        if (error) {
            return next(error);
        }
        else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};

exports.findOne = (req, res, next) => {
    var model = {
        postId: req.params.id,
    };
    postServices.getPostById(model, (error, results) => {
        if (error) {
            return next(error);
        }
        else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};

exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                postId: req.params.id,
                postAuthor: req.body.postAuthor, 
                postTitle: req.body.postTitle,
                category: req.body.category,
                postDetails: req.body.postDetails,
                postShortSummery: req.body.postShortSummery,
                postImage: path != "" ? "/" + path : "",
                postDate: req.body.postDate,
            };

            postServices.updatePost(model, (error, results) => {
                if (error) {
                    return next(error);
                }
                else {
                    return res.status(200).send({
                        message: "Success",
                        data: results,
                    });
                }

            })
        }
    });
};

exports.delete = (req, res, next) => {
    var model = {
        postId: req.params.id,
    };
    postServices.deletePost(model, (error, results) => {
        if (error) {
            return next(error);
        }
        else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};
