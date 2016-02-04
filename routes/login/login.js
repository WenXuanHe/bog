var express = require('express');
var qs = require('querystring');
var router = express.Router();
var user = require('../../lib/user.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.removeMessage();
    var userMassage = qs.parse(req.cookies.user);
    if(userMassage.pass && userMassage.pass!=="" ){
         user.getByName(userMassage.userName, function(err, data){
             if(err) return next(err);
             if(data.pass==userMassage.pass){
                  ////登陆成功，把id值存入session，以便从redis中取得整条数据
                 req.session.uid = data.id;
                 res.redirect("/catalogue");
             }
         });
    }else{
        res.render('login/login', { title: 'Express',type: ''});
    }
});

router.get('/loginout', function(req, res, next) {
    //清空cookie
    res.cookie("user", "");
    ////退出登陆就是破坏session
    req.session.destroy(function(err){
        if(err) return next(err);
        res.redirect("/");
    });
});


router.post('/loginIn', function(req, res, next) {
    var userName = req.body.userName;
    var userPassword = req.body.userPassword;
    var remember = req.body.remember;
    user.authortich(userName, userPassword, function(err, data){
        if(err) return next(err);
        if(data.id){
            if(remember){
                res.cookie("user", "userName="+userName+"&pass="+data.pass+"&salt="+ data.salt, { expires: new Date(Date.now() +  60*1000*60*24), httpOnly: true });
            }
            ////登陆成功，把id值存入session，以便从redis中取得整条数据
            req.session.uid = data.id;
            res.redirect("/catalogue");
        }else{
            res.error(data.message);
            res.redirect("/login");
        }
    });
});
module.exports = router;
