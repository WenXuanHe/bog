var express = require('express');
var fs = require("fs");
var Model = require("../../model/fileName.js");
var router = express.Router();

////进入页面的路径
router.get("/", function(req, res, next){
   var uid = req.session.uid;
     if(uid){
    var id = req.query.id;
    Model.findById(id, function(err, data){
        if(err) return next(err);
        var url = data.path;
        fs.readFile(url, {encoding:'utf8',flag:'r'}, function(err, resDate){
            if(err){  return next(err);  }
            res.render("blog/showContentDetail",{"htmlDate":resDate});
        })
    });
    
   }else{
         res.render('index', { title: 'HOME' });
    }
});
module.exports = router;    