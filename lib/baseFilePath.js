exports.BASE_PATH_ = function(BASE_PATH_){
    return function(req, res, next){
        req.BASE_PATH_ = BASE_PATH_;
        next();
    }
}