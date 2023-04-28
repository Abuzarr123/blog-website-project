const db = require("../../database");
const crypto = require("crypto");
//const comments = require("../controllers/comments.controllers");

const Filter = require('bad-words'),
filter = new Filter();

let comment = "This is a bad comment with a curse word.";
console.log(filter.clean(comment)); // This is a bad comment with a curse word.


const getAllComments = (id,done)=>{
    const results = [];   
    db.each(
        "SELECT * FROM comments WHERE article_id=?",
        [id],
        (err, row) => {
            if (err) console.log("Something went wrong: " + err);

            results.push({
            comment_id:row.comment_id,
            date_published: new Date(row.date_published).toLocaleDateString(),
            comment_text: row.comment_text

            });

        },
        (err) =>{
            return done(err, results);
        }

    )   
  

}
const addNewComment = (comment,article_id, done) =>{
    
    let date= Date.now();
    const sql = 'INSERT INTO comments (comment_text,  date_published, article_id) Values(?,?,?)';
    // let values = [comment.comment_text, date, article_id ];
    let values = [filter.clean(comment.comment_text), date, article_id];

    
    db.run(
        sql,
        values,
        function(err){
            if(err) {
                return done(err,null);}
            return done(null, this.lastID);
        }
    )

}

const getSingleComment = (id, done)=>{
    const sql = 'SELECT * FROM comments WHERE comment_id=?'

    db.get(sql , [id] , (err,row) =>{
        if (err) return done(err)
        if(!row) return done(404)

        return done(null,{
            comment_id:row.comment_id,
            date_published: new Date(row.date_published).toLocaleDateString(),
            comment_text: row.comment_text

     
            })
        })


}
const deleteCom  = (id, done) =>{
    const sql = 'DELETE FROM comments WHERE comment_id=?'

    db.run(sql, [id], (err) =>{
        return done(err)
    })
}



module.exports = {
    getAllComments: getAllComments,
    addNewComment:addNewComment,
    getSingleComment: getSingleComment,
    deleteCom: deleteCom,
}