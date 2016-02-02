define(function (require, exports, module) {
    var obj={
        init:function(){
            obj.eventListen();
            var htmlDate = $("#htmlDate").text();
            $("#show").html(htmlDate);
        },
        eventListen:function(){
            
        },
        fun:{

        }
    };
    $(function(){
        obj.init();
    });
});