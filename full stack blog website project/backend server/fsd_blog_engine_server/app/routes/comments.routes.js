const comments = require("../controllers/comments.controllers");
const { isAuthenticated } = require("../libs/middleware");
const auth = require("../libs/middleware");


module.exports = function(app){


    app.route("/articles/:articles_id/comments")
        .get(comments.getAll)
        .post(comments.create);

        app.route("/comments/:comment_id")
        .delete(isAuthenticated,comments.deleteCom);

}