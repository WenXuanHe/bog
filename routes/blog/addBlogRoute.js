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
            Model.create({ ////创建一个实例
               title: title,
               currentTime:new Date(),
               path:url
            }, function(err, data){
                 if(err) return next(err);
                res.json(JSON.stringify(data));
            });

            ////官方文档插入数据的方法，创建一个model的实例与上面方法实现相同的功能
//            var m = new Model({
//                title: title,
//                currentTime:new Date(),
//                path:url
//            });
//            m.save(function(err, data){
//                if(err) return next(err);
//                res.json(JSON.stringify(data));
//            })
    });
});
module.exports = router;