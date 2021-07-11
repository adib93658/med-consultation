var admin = require('firebase-admin');
var firebase = require('firebase');
function signup (req, res)  {
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    admin.auth().createUser({
        email,
        emailVerified: false,
        password,
    }).then((val)=>{
        admin.firestore().collection('users').doc(val.uid).set({
            role,
            'accepted':false
        }).then((val)=>{
            res.status(200);
             res.send({
            "code":200,
            "message":"User created successfully"
        },(error)=>{
            console.log(error);
            res.send(error);
        });
        })
        
    },(error)=>{
        res.send(error);
    });
}

function login (req, res)  {
    let email = req.body.email;
    let password = req.body.password;
    

    firebase.auth().signInWithEmailAndPassword(email,password).then((userCredentials)=>{
        let user =userCredentials.user;
        admin.firestore().collection('users').doc(user.uid).get().then((details)=>{
            console.log(details);
            res.send({
                user,
                details
            })
        },(error)=>{
            res.send(error);
        })
        
    },(error)=>{res.send(error); }
    )
}

module.exports = {
    login,
    signup
}