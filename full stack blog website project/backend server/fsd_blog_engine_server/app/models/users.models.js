//const { token } = require("morgan");
const users = require("../models/users.models");
//const { getAllUsers } = require("../models/users.models");
const db = require("../../database");
const crypto = require("crypto");



const getAllUsers = (done)=>{
    const results = [];    
    db.each(
        "SELECT * FROM users",
        [],
        (err, row) => {
            if (err) console.log("Something went wrong: " + err);

            results.push({
                user_id:row.user_id,
                first_name: row.first_name,
                last_name: row.last_name,
                email: row.email,
            
            });

        },
        (err, num_rows) =>{
            return done(err, num_rows, results);
        }

    )   
  

}

const addNewUser = (user,done) => {
    const salt = crypto.randomBytes(64);
    const hash = getHash(user.password, salt);

    const sql = 'INSERT INTO users (first_name, last_name, email, password, salt) VALUES (?,?,?,?,?)';
    let values = [user.first_name, user.last_name, user.email, hash, salt.toString('hex')];
    

    db.run(
        sql,
        values,
        function(err){
            if(err) {
                console.log(err);
                return done(err);}
            return done(null, this.lastID);
        }
    )
}
const getHash = function(password, salt){
    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
}

const authenticateUser = (email, password, done) => {
    const sql = 'SELECT user_id, password, salt, salt FROM users WHERE email =?'

    db.get(sql, [email], (err, row)=> {
        if(err) return done(err)
        if(!row) return done(404) // this will happen if the wrong email is sent by the user

        if(row.salt === null) row.salt = ''

        let salt = Buffer.from(row.salt, 'hex')

        if (row.password === getHash (password, salt)){
            return done(false, row.user_id)
        }else{
            return done(404) // this is the incorrect password
        }
    })
}



const getToken = function (id ,done) {
  db.get(
      sql = 'SELECT session_token FROM users WHERE user_id=?',
      //Select statement to try and get a token for a given user_id
      [id],
      function(err,row){
        if(err) {
            console.log(err);
            return done(err, null);
        }
          if(row && row.session_token){
              return done(null, row.session_token);

          }
          else{
            return done(null,null);
          }
      }


  )};
   

    



const setToken = (id, done) =>{
    let token = crypto.randomBytes(16).toString('hex');

    const sql = 'UPDATE users SET session_token=? WHERE user_id=?'

    db.run(sql, [token,id], (err) =>{
       return done(err, token) 
    })
}

const Logoutcreate = (token, done) => {
    const sql = 'UPDATE users SET session_token=null WHERE session_token=?'

    db.run(sql, [token], (err)=> {
        return done (err)
    })

}
const getIdFromToken= (token,done,) => {
    const sql ='SELECT user_id FROM users WHERE session_token=?'

        db.get(sql, [token], (err,row)=>{

            if (err) return done (err)
            if (!row) return done (404)

            return done( null,row.user_id)
        })
    }

    






module.exports = {
    getAllUsers:getAllUsers,
    addNewUser:addNewUser,
    authenticateUser: authenticateUser,
    setToken: setToken,
    getToken: getToken,
    Logoutcreate:Logoutcreate,
    getIdFromToken:getIdFromToken


}