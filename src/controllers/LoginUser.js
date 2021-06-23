var express = require("express");
var router = express.Router();

router.get("../views/LoginUser.ejs",function(req,res){
    res.render("../views/LoginUser.ejs",{data : {}});
});

module.exports = router;

