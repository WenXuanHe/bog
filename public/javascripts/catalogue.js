define(function (require, exports, module) {
    var obj={
        init:function(){
            obj.eventListen();
        },
        eventListen:function(){
            $("#addBlog").bind("click", function(){
                window.location.href="/addBlog";
            });
        },
        fun:{

        }
    };
    $(function(){
        obj.init();
    });
    module.exports = obj;
});