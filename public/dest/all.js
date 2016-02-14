define(function (require, exports, module) {
    var contentValue={
        content:"",
        code:""
    };
    var baseValue={
        title:"",
        author:"",
        currentTime:""
    };
    var obj={
        init:function(){
            obj.eventListen();
        },
        eventListen:function(){
            $("#save").bind("click", function(){
                if($("#show").html()){
                    $.ajax({
                        url:"/addBlog/save",
                        data:{
                            htmlValue:$("#show").html(),
                            title: $.trim($("#title").val())
                        },
                        type:"post",
                        success:function(data){
                            if(data){
                                layer.alert("保存成功");
                            }
                            window.location.href="/catalogue";
                        },
                        error:function(d){
                            layer.alert(d.responseText);
                        }
                    });
                }
            });

            $("#preRead").bind("click", function(){
                var result = obj.fun.judge();
                if(result){
                    if(contentValue.content){
                        $("#writeIn").val("");
                        if($("#show #MyTitle").length===0){
                            $("#show").prepend($("#baseMassage").render(baseValue));
                        }
                        $("#show").append($("#valueMassage").render(contentValue));
                        $.addAnimateCss($("#show"), "fadeInUp");
                        if($("#save:hidden")){
                            $("#save").show();
                        }
                    }

                }
            });
            $(".common, .special").live("mouseenter", function(){
                $(this).find(".remove").show();
            });
            $(".common, .special").live("mouseleave", function(){
                $(this).find(".remove").hide();
            });
            $(".remove").live("click", function(){
                    $(this).parent().remove();
            });
//            $("#writeCode").bind("click", function(){
//                var i = $.layer({
//                    type: 1,
//                    area : ['auto','auto'],
//                    border : [10 , 0.3 , '#000', true],
//                    title : ['添加代码', true],
//                    closeBtn : ['0', true],
//                    page: {
//                        dom : '#code'
//                    }
//                });
            $("#confirm").off("click").bind("click", function(){
                if($("#writeCodeValue").val()===""){
                    layer.alert("请输入要编写的代码");
                    return;
                }
                if($("#title").val() ===""){
                    layer.alert("请先输入题目");
                    ////layer.close(i);
                    return;
                }
                contentValue.content = $("#writeCodeValue").val() === ""?"":$("#writeCodeValue").val().replace(/\n/g, "<br/>") ;
                contentValue.code = 1;
                $("#show").append($("#valueMassage").render(contentValue));
                ////layer.close(i);
                if($("#save:hidden")){
                    $("#save").show();
                }
            });
//            $("#quit").bind("click", function(){
//                layer.close(i);
//                $("#writeCode").val("");
//            });
//            });
        },
        fun:{
            judge:function(){
                baseValue.title = $("#title").val() ===""?"":$("#title").val();
                baseValue.author = $(".userName").text();
                baseValue.currentTime = new Date();
                contentValue.content = $("#writeIn").val()===""?"":$("#writeIn").val().replace(/\n/g, "<br/>");
                contentValue.code = 0;
                if(baseValue.title===""){
                    layer.alert("请输入题目");
                    return 0;
                }
                if(contentValue.content ===""){
                    layer.alert("请输入内容");
                    return 0;
                }
                return 1;
            }

        }
    };
    $(function(){
        obj.init();
    });
});
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
});
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