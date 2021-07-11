var admin = require("firebase-admin");

function getAllAccountRequests(req, res) {
    admin.firestore().collection('users').where('accepted','==',false).get().then(
        (val)=>{
            let temp = []
            val.docs.forEach(element => {
                temp.push(element.data())
            });
            res.status(200).send(temp);
        }
    )
}
function acceptAccountRequest(req,res){
    var id = req.body.uid;
    admin.firestore().collection('users').doc(id).update({
        'accepted':true
    }).then((val)=>{
        res.send(200).send({
            "message":"User accepted"
        })
    })
}




module.exports={
    getAllAccountRequests,
    acceptAccountRequest
}