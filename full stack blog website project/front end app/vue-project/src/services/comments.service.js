const getAll = (id) =>{
    return fetch("http://localhost:3333/articles/" + id + "/comments")
    .then((response) => {
        if (response.status === 200){
            return response.json();
        }else if (response.status === 404){
            throw "Not Found"
        }
        else if (response.status ===500){
            throw "Servor error"
        }
    })
    .then((resJson) =>{
        return resJson
    })
    .catch((error) =>{
        console.log("Err", error)
        return Promise.reject(error)
    })

    
}
// const addNewComment = (id) =>{
//     return fetch("http://localhost:3333/articles/" + id + "/comments")
//     .then((response) => {
//         if (response.status === 200){
//             return response.json();
//         }else{
//             throw "Something went wrong"
//         }
//     })
//     .then((resJson) =>{
//         return resJson
//     })
//     .catch((error) =>{
//         console.log("Err", error)
//         return Promise.reject(error)
//     })

// }
const create = (article_id, comment_text) =>{
    return fetch("http://localhost:3333/articles/" + article_id +"/comments",
    {
        method: "POST",
        headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                "comment_text":comment_text
            }),
        })   
        .then((response) =>{
            if(response.status ===201){
                return response.json();
            }else if (response.status ===400){
                throw "Bad request"
            }else if (response.status===401){
                throw "Unauthorised"
            }else if (response.status === 404){
                throw "Not Found"
            }
            else if (response.status ===500){
                throw "Servor error"
            }
            
        })
        .then((resJson)=>{
            alert(JSON.stringify(resJson));
        })
        .catch(error =>{
            alert(error)
            console.log("Err",error)
           
        })
    
}
const deleteComment = (comment_id) =>{
    return fetch("http://localhost:3333/comments/" + comment_id, 
    {
        method: "DELETE",
        headers:{
            "Content-Type":"application/json",
            "X-Authorization": localStorage.getItem("session_token")
        }
    })
    .then((response) => {
        if (response.status === 201){
            return response.json();
        }else if (response.status===401){
            throw "Unauthorised"
        }else if (response.status === 404){
            throw "Not Found"
        }
        else if (response.status ===500){
            throw "Servor error"
        }
    })
    .then((resJson) =>{
        return resJson
    })
    .catch((error) =>{
        console.log("Err", error)
        return Promise.reject(error)
    })
}
export const commentsService = {
    getAll,
    create,
    deleteComment
     // addNewComment,

}