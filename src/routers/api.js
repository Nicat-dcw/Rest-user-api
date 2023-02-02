const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema")
const messages = require("../messages/api.json")
const tokenSchema = require("../models/tokenSchema")

let version = "v1"
router.use((req, res, next) => {
  res.set("text", "json");
  res.setHeader("Content-Type", "application/json");
 /* if (req.get("Authorization") !== process.env.PRIVATE_KEYY)
    return res.json({ code: 400, message: "Access denied" });
*/  next();
});
router.get(`/${version}/users/:id`, async (req,res) => {
  res.set("text", "json");
  res.setHeader("Content-Type", "application/json");

const id = req.params.id;
if(!id) return res.write(messages.idRequired)

    userSchema.find({userId: id}, function(err,docs){
        let userName = docs.username
        console.log(docs)
if(err){
    return res.status(200).json({
        code:404,
        message:"No user(s) found"
    })
    return;
}
docs.map(x=> {
    return res.status(200).json({
            username: x.username || "Deleted User",
           
            userId: x.userId,
           
            token:"SHOW_DENIED"
           
        })
    return;
})
    });
})

router.get(`/${version}/@me`, async (req,res) => {
const authToken = req.headers['Authorization']
    res.set("text", "json");
  res.setHeader("Content-Type", "application/json");
if(!authToken){
    return res.status(400).json({
        code:400,
        message: messages.accessDenied
    })
    }
const findTokens = tokenSchema.findOne({token:authToken}, function(err,docs) {
   //console.log(findTokens.token)
console.log(docs)
if(err){
    res.json({message:"Error"})
}
    if(authToken !== `${docs.token}`){
       return res.status(404)
        .json({
            code:404,
            message: messages.userNotFound
        })
    return;

}
})
 userSchema.find({token: authToken}, function(err,docs){
        let userName = docs.username
      //  console.log(docs)
if(err){
    return res.json({
        code:404,
        message:"No user(s) found"
    })
}

        res.json({
            username: userName,
            userId: docs.userId,
            token: docs.token
        })
    });
})

module.exports = router;
