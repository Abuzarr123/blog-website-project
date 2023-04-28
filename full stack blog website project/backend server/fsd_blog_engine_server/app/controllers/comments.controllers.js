const comments = require("../models/comments.models");
const articles = require("../models/articles.models");
const Joi = require("joi");
//const { deleteComment } = require("../models/comments.models");

const getAll = (req, res) => {
    let article_id = parseInt(req.params.articles_id);
    
    comments.getAllComments(article_id, (err, results) => {
        if(err) {
            console.log(err);
            return res.sendStatus(err);
        }
        
        return res.status(200).send(results);

    })
}

const create = (req,res)=>{
    let article_id = parseInt(req.params.articles_id)

    articles.getSingleArticle(article_id, (err, result) =>{
        if(err === 404) return res.sendStatus(404);
        if(err) return res.sendStatus(500);
    

        const schema = Joi.object({
            "comment_text":Joi.string().required()
        })
    
        const {error} = schema.validate(req.body);
        if(error) return res.status(400).sendStatus(error.details[0].message);
    
    
    
        let comment = Object.assign({}, req.body);
        
        comments.addNewComment(comment, article_id,(err, id) => {
            if(err) {
                return res.sendStatus(500)
            }
    
            return res.status(201).send({comment_id: id})
        })
    })

}    
    
    const deleteCom = (req,res) =>{
        let comment_id = parseInt(req.params.comment_id);
    
        comments.getSingleComment(comment_id, (err, result) => {
            console.log(comment_id, err)
            if (err === 404) return res.sendStatus(404);       
            
            if (err) return res.sendStatus(500);
            
    
            comments.deleteCom(comment_id, (err) =>{
                if(err) {
                    return res.sendStatus(500);
                }
                return res.sendStatus(200);
            })
        })
    
     
    }



module.exports = {
getAll: getAll,
create: create,
deleteCom:deleteCom,
}
