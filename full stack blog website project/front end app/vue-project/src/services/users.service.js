const login =(email,password) => {
    return fetch("http://localhost:3333/login",
    {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    })
    .then((response)=>{
        if(response.status === 200){
            return response.json();

        }else if (response.status===400){
            throw "Invalid email/password supplied"
        }
        else if (response.status ===500){
            throw "Servor error"
        }
      
    })
    .then((resJson)=>{
        localStorage.setItem("user_id", resJson.user_id);
        localStorage.setItem("session_token", resJson.session_token)
        return resJson
    })
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })

}
// const ifAuthenticated = (to, from, next) =>{
//     const loggedIn = localStorage.getItem('session_token');
//     if(loggedIn){
//         next()
//         return
//     }
//     next('/login')
// }

const logout = () =>{
    return fetch("http://localhost:3333/logout",
    {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
        },
        
    })
    .then((response) => {
        if(response.status === 200){
            localStorage.removeItem("user_id")
            localStorage.removeItem("session_token")
            return
        }else if (response.status===401){
            throw "Unauthorised"
        }
        else if (response.status ===500){
            throw "Servor error"
        }
      
    })
    .catch((error) =>{
        console.log("Err", error)
        return Promise.reject(error)
    })
}




// const getAllUsers = (id) =>{
//     return fetch("http://localhost:3333/users"+ id,
//     {
//         method:"GET",
//         headers:{
//             "Content-Type": "application/json",
//         }
//     })
    
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

const getAllUsers= () =>{
    return fetch("http://localhost:3333/users" ,
    {
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")


        }
      
    })
    .then((response) => {
        if (response.status === 200){
            return response.json();
        }else if (response.status===401){
            throw "Unauthorised"
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
const create = (first_name,last_name,email,password) =>{
    return fetch("http://localhost:3333/users",
    {
        method: "POST",
        headers:{
                "Content-Type":"application/json",
                "X-Authorization": localStorage.getItem("session_token")

            },

            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password
            })
        })   
        .then((response) =>{
            if(response.status ===201){
                return response.json();
            }else if (response.status ===400){
                throw  "Bad request"
            }else if (response.status===401){
                throw "Unauthorised"
            }else if (response.status ===500){
                throw "Servor error"
            }
        })
        .catch((error) =>{
            // alert(error)
            console.log("Err",error)
            return Promise.reject(error)
           
        })
    
}

export const usersService = {
login,
logout,
getAllUsers,
create
}