var express = require('express');
var fs = require("fs");
var Model = require("../../model/fileName.js");
var router = express.Router();

////进入页面的路径
router.get("/", function(req, res, next){
    var uid = req.session.uid;
     if(uid){
        res.render("blog/addBlog",{"tip":"", "title":""});
     }else{
         res.render('index', { title: 'HOME' });
     }
});

router.post("/save", function(req, res, next){
    var htmlValue = req.body.htmlValue;
    var title = req.body.title;
    var url = req.BASE_PATH_ + '\\texts\\'+title+'.txt';
    fs.writeFile(url , htmlValue, function(data, err){
            if(err) next(err);
            Model.create({
               title: title,
               currentTime:new Date(),
               path:url
            }, function(err, data){
                 if(err) return next(err);
                res.json(JSON.stringify(data));
            });
    });
});
module.exports = router;