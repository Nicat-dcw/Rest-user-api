const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema")
const messages = require("../messages/api.json")
const tokenSchema = require("../models/tokenSchema")
const makeToken = require("../generator/token")
const randomNumber = require("../generator/id")
router.use((req, res, next) => {
  res.set("text", "json");
  res.setHeader("Content-Type", "application/json");
  if (req.get("Authorization") !== process.env.PRIVATE_KEYY)
    return res.json({ code: 400, message: "Access denied" });
  next();
});
router.post("/accounts/create", (req,res) => {
const data = req.query;
  /*  if(data.username.length > 12) {
        return res.status(200).json({
            message: messages.usernameLength
        })
    }*/
    if(!data) {
        return res.json({
            message:"error"
        })
    }
    
    const generatedToken = makeToken(15)
    const generatedId = makeToken(12)
    const object = {
        username: `${data.username}`,
        password: `${data.password || "12345678"}`,
        token: generatedToken,
        userId: `${randomNumber}`
    }
   const tokens = new tokenSchema({token: `Bearer ${generatedToken}`})
const user = new userSchema(object)
    tokens.save()
    user.save()
res.json({
    code:200,
    message:"Account Successfully Created!"
})
})
router.post("/accounts/delete", (req,res) => {
//const token = req.headers["Authorization"]
    try {
const token = req.query
if(!token){
    return res.status(200).json({
        message:messages.accessDenied
    })
}
userSchema.findOne({token: token}, function(err,docs){
docs.map(x=>{
    userSchema.deleteMany({username:docs.username, password:docs.password,token:token})
    res.status(200).json({message:"Account deleted Successfully!"})
})
})
    }catch(err){
        res.json({message:"an Error occurred"})
        return;
    }
})
module.exports = router;