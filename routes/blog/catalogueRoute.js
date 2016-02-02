var express = require('express');
var Model = require("../../model/fileName.js");
var router = express.Router();

////进入页面的路径
router.get("/", function(req, res, next){
    var uid = req.session.uid;
    if(uid){
        ////获取数据库所有的日志信息并加载到页面上
        var obj={
            title:"",
            id:""
        };
        var titles=[];
        Model.find({}, function(err, data){
            if(err) return next(err);
            data.forEach(function(item){
                if(item.currentTime){
                    var currentTime = item.currentTime.toLocaleDateString() +" "+ item.currentTime.toLocaleTimeString();
                    obj.title = item.title;
                    obj.id = item.id;
                    obj.current = currentTime;
                    ////间接传递，避免对象引用传递造成的数据修改
                    titles.push(JSON.stringify(obj));
                }
            });
            res.render("blog/catalogue",{"titles":titles});
        });
    }else{
        res.render('index', { title: 'HOME' });
    }
});

module.exports = router;