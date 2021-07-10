var admin = require('firebase-admin');
var firebase = require('firebase');
function signup (req, res)  {
    let email = req.body.email;
    let password = req.body.password;
    admin.auth().createUser({
        email,
        emailVerified: false,
        password,
    }).then((val)=>{
        res.status(200);
        res.send({
            "code":200,
            "message":"User created successfully"
        });
        
    },(error)=>{
        res.send(error);
    });
}

function login (req, res)  {
    let email = req.body.email;
    let password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email,password).then((userCredentials)=>{
        let user =userCredentials.user;
        res.send({
            user
        })
    },(error)=>{res.send(error); }
    )
}

module.exports = {
    login,
    signup
}